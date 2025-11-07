/* eslint-disable camelcase */
/* global opening_hours */

import "../third-party/opening_hours/opening_hours+deps.min.js";
import { getUserLanguage } from "./i18n.js";
import { t } from "i18next";

// Simple in-memory cache for Nominatim lookups
const nominatimCache = {};
// Simple in-memory cache for libreviews lookups
const libreviewCache = {};
// Popup section names (order matters for rendering)
const POPUP_SECTIONS = Object.freeze([
  "cuisine",
  "address",
  "opening_hours",
  "contacts",
  "social",
  "vegan_description",
  "menu_url"
]);

// In-flight fetch promises to de-duplicate concurrent requests
const inflight = {};

// Persistent cache (localStorage) configuration
const PERSIST_KEY = "vk_nominatim_v1"; // Bump to invalidate
const MAX_ENTRIES = 300;
const TTL_MS = 24 * 60 * 60 * 1000; // 24h
let persistentLoaded = false;
let persistentStore = { entries: {}, order: [] };

/** Load persistence state from localStorage once (lazy). */
function loadPersistentStore() {
  if (persistentLoaded) { return; }
  persistentLoaded = true;
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.entries && parsed.order) { persistentStore = parsed; }
    }
  }
  catch { /* Ignore parse / access errors */ }
}

/** Persist current in‑memory store to localStorage (best effort). */
function savePersistentStore() {
  try {
    window.localStorage.setItem(PERSIST_KEY, JSON.stringify(persistentStore));
  }
  catch { /* Ignore quota / access errors */ }
}

/** Update recency order; evict oldest when size limit exceeded.
 * @param {string} key cache key
 */
function touchOrder(key) {
  const idx = persistentStore.order.indexOf(key);
  if (idx >= 0) { persistentStore.order.splice(idx, 1); }
  persistentStore.order.push(key);
  if (persistentStore.order.length > MAX_ENTRIES) {
    const remove = persistentStore.order.shift();
    if (remove) { delete persistentStore.entries[remove]; }
  }
}

/** Retrieve an entry from persistent cache.
 * @param {string} key
 * @returns {{data:object,ts:number,fresh:boolean,stale:boolean}|null}
 */
function getPersistent(key) {
  loadPersistentStore();
  const entry = persistentStore.entries[key];
  if (!entry) { return null; }
  const age = Date.now() - entry.ts;
  return {
    data: entry.data,
    ts: entry.ts,
    fresh: age < TTL_MS,
    stale: age >= TTL_MS
  };
}

/** Store (or update) an entry in persistent cache.
 * @param {string} key
 * @param {object} data raw nominatim place
 */
function setPersistent(key, data) {
  loadPersistentStore();
  persistentStore.entries[key] = { ts: Date.now(), data };
  touchOrder(key);
  savePersistentStore();
}

// --- DOM helper utilities (replace inline HTML string concatenation) ---
/** Build a two‑column row (emoji + content).
 * @param {string} emoji
 * @param {Array<Node|string>|Node|string} contentNodes
 * @returns {HTMLDivElement}
 */
function makeRow(emoji, contentNodes) {
  const wrap = document.createElement("div");
  wrap.className = "popupflex-container";
  const icon = document.createElement("div");
  icon.textContent = emoji || "";
  const body = document.createElement("div");
  if (Array.isArray(contentNodes)) {
    contentNodes.forEach((nodeItem, idx) => {
      if (idx > 0 && typeof nodeItem === "string" && nodeItem === "\n") { body.appendChild(document.createElement("br")); }
      else if (nodeItem instanceof Node) { body.appendChild(nodeItem); }
      else if (typeof nodeItem === "string") { body.appendChild(document.createTextNode(nodeItem)); }
    });
  }
  else if (contentNodes instanceof Node) { body.appendChild(contentNodes); }
  else if (contentNodes) { body.textContent = contentNodes; }
  wrap.append(icon, body);
  return wrap;
}

/** Create a safe external link.
 * @param {string} url
 * @param {string} label
 * @returns {HTMLAnchorElement}
 */
function makeLink(url, label) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = label;
  return anchor;
}

/** Construct address node (multi‑line) from Nominatim place.
 * @param {object} nominatimPlace
 * @returns {HTMLDivElement|null}
 */
function buildAddressNodeFromNominatim(nominatimPlace) {
  const address = nominatimPlace?.address;
  if (!address) { return null; }
  const parts = [];
  const street = address.road ? `${address.road}${address.house_number ? ` ${address.house_number}` : ""}` : "";
  if (street) { parts.push(street); }
  const place = address.city || address.town || address.village || address.hamlet || address.suburb || address.neighbourhood || "";
  const locality = `${address.postcode ? `${address.postcode} ` : ""}${place || ""}`.trim();
  if (locality) { parts.push(locality); }
  if (address.country) { parts.push(address.country); }
  if (parts.length === 0) { return null; }
  const wrapper = document.createElement("div");
  const icon = document.createElement("div");
  icon.textContent = "📍";
  const textContainer = document.createElement("div");
  parts.forEach((part, index) => {
    if (index > 0) { textContainer.appendChild(document.createElement("br")); }
    textContainer.appendChild(document.createTextNode(part));
  });
  wrapper.append(icon, textContainer);
  return wrapper;
}

/** Determine if opening_hours state will be (still) open at future offset.
 * @param {object} ohInstance opening_hours instance
 * @param {number} minutes offset minutes
 * @returns {boolean}
 */
function willChangeWithin(ohInstance, minutes) {
  try {
    const probe = new Date();
    probe.setUTCMinutes(probe.getUTCMinutes() + minutes);
    return ohInstance.getState(probe);
  }
  catch { return false; }
}

/** Opening hours section fill. */
function fillOpeningHours({ extratags, address, container, locale }) {
  if (!extratags.opening_hours || container.dataset.filled) { return; }
  try {
    // eslint-disable-next-line new-cap
    const oh = new opening_hours(
      extratags.opening_hours,
      { address: { country_code: address?.country_code, state: address?.state } },
      { locale }
    );
    let prettifiedValue = oh.prettifyValue({
      conf: { locale, rule_sep_string: "<br>", print_semicolon: false, sep_one_day_between: ", " }
    });
    prettifiedValue = prettifiedValue
      .replaceAll(",", ", ")
      .replaceAll("PH", t("words.public_holiday"))
      .replaceAll("SH", t("words.school_holidays"));
    let openState;
    let openStateEmoji;
    const isOpenNow = oh.getState();
    const willBeOpenSoon = willChangeWithin(oh, 60);
    if (isOpenNow) {
      openState = t("words.open");
      openStateEmoji = "open";
      if (!willBeOpenSoon) {
        openState += t("texts.will close soon");
        openStateEmoji = "closes-soon";
      }
    }
    else {
      openState = t("words.closed");
      openStateEmoji = "closed";
      if (willBeOpenSoon) {
        openState += t("texts.will open soon");
        openStateEmoji = "opens-soon";
      }
    }
    // Build DOM nodes for pretty value (split on <br>)
    const parts = prettifiedValue.split(/<br>/u);
    const fragmentNodes = [];
    fragmentNodes.push(createOpenStateSpan(openStateEmoji, openState));
    fragmentNodes.push("\n");
    parts.forEach((partValue, partIdx) => {
      if (partIdx > 0) { fragmentNodes.push("\n"); }
      fragmentNodes.push(partValue);
    });
    const row = makeRow("🕖", fragmentNodes);
    container.replaceChildren(...row.childNodes);
  }
  catch (err) {
    const row = makeRow("🕖", [`Error: ${err}`]);
    container.replaceChildren(...row.childNodes);
  }
  container.classList.add("popupflex-container");
  container.dataset.filled = "1";
}

/** Small helper to render colored state bullet + text.
 * @param {string} stateEmojiClass
 * @param {string} text
 * @returns {HTMLSpanElement}
 */
function createOpenStateSpan(stateEmojiClass, text) {
  const spanWrap = document.createElement("span");
  const circle = document.createElement("span");
  circle.className = `open-state-circle ${stateEmojiClass}`;
  spanWrap.appendChild(circle);
  spanWrap.appendChild(document.createTextNode(text));
  return spanWrap;
}

/** Cuisine tags fill. */
function fillCuisine(extratags, container) {
  if (!extratags.cuisine || container.dataset.filled) { return; }
  const text = extratags.cuisine.replaceAll(";", ", ").replaceAll("_", " ");
  const row = makeRow("👩‍🍳", [text]);
  container.replaceChildren(...row.childNodes);
  container.classList.add("popupflex-container");
  container.dataset.filled = "1";
}

/** Contacts (phone/email/web) fill. */
function fillContacts(extratags, container) {
  if (container.dataset.filled) { return; }
  const phones = [extratags.phone, extratags["contact:phone"], extratags["contact:mobile"], extratags.mobile].filter(Boolean);
  const email = extratags.email || extratags["contact:email"];
  const website = extratags.website || extratags["contact:website"];
  if (!(phones.length || email || website)) { return; }
  const rows = [];
  if (phones.length) {
    rows.push(makeRow("☎️", [makeLink(`tel:${phones[0]}`, phones[0])]));
    if (phones[1]) { rows.push(makeRow("", [makeLink(`tel:${phones[1]}`, phones[1])])); }
  }
  if (email) { rows.push(makeRow("📧", [makeLink(`mailto:${email}`, email)])); }
  if (website) {
    const shortWeb = website.replace(/^https?:\/\//u, "");
    rows.push(makeRow("🌐", [makeLink(website, shortWeb)]));
  }
  container.replaceChildren(...rows);
  container.dataset.filled = "1";
}

/** Social links fill. */
function fillSocial(extratags, container) {
  if (container.dataset.filled) { return; }
  const facebook = extratags.facebook || extratags["contact:facebook"];
  const instagram = extratags.instagram || extratags["contact:instagram"];
  if (!(facebook || instagram)) { return; }
  const rows = [];
  if (facebook) {
    const fbUrl = facebook.startsWith("http") ? facebook : `https://www.facebook.com/${facebook}`;
    rows.push(makeRow("🇫", [makeLink(fbUrl, decodeURI(fbUrl).replace("https://", ""))]));
  }
  if (instagram) {
    const igUrl = instagram.startsWith("http") ? instagram : `https://www.instagram.com/${instagram}`;
    rows.push(makeRow("📸", [makeLink(igUrl, igUrl.replace("https://", ""))]));
  }
  container.replaceChildren(...rows);
  container.dataset.filled = "1";
}

/** Vegan / description fill. */
function fillVeganDescription(extratags, container) {
  if (container.dataset.filled) { return; }
  const desc = extratags["diet:vegan:description"];
  if (!desc) { return; }
  const row = makeRow("🗒️", [desc]);
  container.replaceChildren(...row.childNodes);
  container.classList.add("popupflex-container");
  container.dataset.filled = "1";
}

/** Menu link fill. */
function fillMenu(extratags, container) {
  if (container.dataset.filled) { return; }
  const menu = extratags["website:menu"] || extratags["contact:website:menu"];
  if (!menu) { return; }
  const shortMenu = menu.replace(/^https?:\/\//u, "");
  const row = makeRow("📋", [makeLink(menu, shortMenu)]);
  container.replaceChildren(...row.childNodes);
  container.classList.add("popupflex-container");
  container.dataset.filled = "1";
}

/** Enrich popup with Nominatim details (cached, SWR strategy).
 * @param {L.Marker} element marker with feature
 * @param {HTMLElement} popupEl popup root element
 */
export async function addNominatimInformation(element, popupEl) {
  // Guard against geocoder markers (they don't have a feature)
  if (!element.feature) { return; }
  const type = element.feature.properties._type;
  const id = element.feature.properties._id;
  const cacheKey = `${type}/${id}`;
  const locale = getUserLanguage();

  /** Apply fetched (or cached) data into existing DOM placeholders.
   * @param {object} nominatimPlace
   */
  function applyData(nominatimPlace) {
    if (!popupEl || !nominatimPlace || !popupEl.isConnected) { return; }
    const querySection = name => popupEl.querySelector(`[data-section="${name}"]`);
    const addressContainer = querySection("address");
    if (addressContainer) {
      const addressNode = buildAddressNodeFromNominatim(nominatimPlace);
      if (addressNode) { addressContainer.replaceChildren(...addressNode.childNodes); }
    }
    const extratags = nominatimPlace.extratags || {};
    // Opening hours
    const ohContainer = querySection("opening_hours");
    if (ohContainer) { fillOpeningHours({ extratags, address: nominatimPlace.address, container: ohContainer, locale }); }
    // Cuisine
    const cuisineContainer = querySection("cuisine");
    if (cuisineContainer) { fillCuisine(extratags, cuisineContainer); }
    // Contacts
    const contactsContainer = querySection("contacts");
    if (contactsContainer) { fillContacts(extratags, contactsContainer); }
    // Social
    const socialContainer = querySection("social");
    if (socialContainer) { fillSocial(extratags, socialContainer); }
    // Vegan description
    const veganContainer = querySection("vegan_description");
    if (veganContainer) { fillVeganDescription(extratags, veganContainer); }
    // Menu
    const menuContainer = querySection("menu_url");
    if (menuContainer) { fillMenu(extratags, menuContainer); }
  }

  // 1. In-memory cache
  if (nominatimCache[cacheKey]) {
    applyData(nominatimCache[cacheKey]);
    return;
  }

  // 2. Persistent cache (stale-while-revalidate)
  const persisted = getPersistent(cacheKey);
  let needsFetch = true;
  if (persisted) {
    applyData(persisted.data); // Show immediately (fresh or stale)
    nominatimCache[cacheKey] = persisted.data; // Hydrate memory
    if (persisted.fresh) { needsFetch = false; }
  }
  if (!needsFetch) { return; }

  // 3. De-duplicate active fetches
  if (inflight[cacheKey]) {
    inflight[cacheKey].then((place) => {
      if (place) { applyData(place); }
    });
    return;
  }

  const osmType = type[0].toUpperCase();
  const osmId = `${osmType}${id}`;
  const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${osmId}&extratags=1&addressdetails=1&format=json&accept-language=${locale}`;
  try {
    inflight[cacheKey] = fetch(url, { headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) { throw new Error(`HTTP ${response.status}`); }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) { throw new Error("No result from Nominatim"); }
        const nominatimPlace = data[0];
        nominatimCache[cacheKey] = nominatimPlace; // Memory
        setPersistent(cacheKey, nominatimPlace); // Persistent
        applyData(nominatimPlace); // Update (replaces stale if shown)
        return nominatimPlace;
      })
      .catch((error) => {
        console.warn("Can't get information from Nominatim API:", error);
        return null;
      });
    await inflight[cacheKey];
  }
  finally {
    delete inflight[cacheKey];
  }
}

/** Build initial popup DOM (placeholders only, sync). */
export function calculatePopup(element) {
  const feature = element.feature;
  // Guard against geocoder markers (they don't have a feature)
  if (!feature) { return ""; }
  const root = document.createElement("div");

  // Category badge
  const catDiv = document.createElement("div");
  catDiv.className = `popup-category ${feature.properties.category}`;
  // Allow potential simple markup in translation (if any) – if not desired, use textContent
  catDiv.textContent = t(`texts.i18n_${feature.properties.category}`);
  root.appendChild(catDiv);

  // Title line with OSM link
  const title = document.createElement("div");
  title.className = "map-popup-title";
  title.appendChild(document.createTextNode(`${feature.properties.symbol} ${feature.properties.name}`));
  const osmLink = document.createElement("a");
  osmLink.href = `https://openstreetmap.org/${feature.properties._type}/${feature.properties._id}`;
  osmLink.target = "_blank";
  osmLink.rel = "noopener noreferrer";
  osmLink.appendChild(document.createTextNode(" *"));
  title.appendChild(osmLink);
  root.appendChild(title);
  root.appendChild(document.createElement("hr"));

  // Placeholder sections (data-section attributes used to avoid duplicate global IDs)
  POPUP_SECTIONS.forEach((name) => {
    const div = document.createElement("div");
    div.dataset.section = name;
    if (name === "address") {
      div.className = "popupflex-container";
      const icon = document.createElement("div");
      icon.textContent = "⏳";
      const text = document.createElement("div");
      text.textContent = t("words.loading") || "Loading...";
      div.append(icon, text);
    }
    root.appendChild(div);
  });

  // Libreviews container
  const libReviewsDiv = document.createElement("div");
  libReviewsDiv.dataset.section = "libreviews";
  root.appendChild(libReviewsDiv);

  // Trigger async review lookup (scoped to this popup root)
  addLibReview(element, libReviewsDiv);

  return root; // Leaflet accepts an HTMLElement here
}

/** Fetch & inject libreview link if available (cached by ID).
 * @param {L.Marker} element marker
 * @param {HTMLElement} container target div (data-section="libreviews")
 */
export async function addLibReview(element, container) {
  // Guard against geocoder markers (they don't have a feature)
  if (!element.feature) { return; }
  const url = `https://lib.reviews/api/thing?url=https://www.openstreetmap.org/${element.feature.properties._type}/${element.feature.properties._id}`;
  const cacheKey = `${element.feature.properties._type}/${element.feature.properties._id}`;
  try {
    // Allow running before the popup root is attached; DOM nodes will carry over.
    if (!container) { return; }
    if (libreviewCache[cacheKey]) {
      const link = document.createElement("a");
      link.href = `https://lib.reviews/${libreviewCache[cacheKey]}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = t("words.review");
      container.replaceChildren(makeRow("📓", [link]));
      return;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (!container || !container.isConnected) { return; }
    if (!data || !data.thing || !data.thing.urlID) { return; }
    const link = document.createElement("a");
    link.href = `https://lib.reviews/${data.thing.urlID}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t("words.review");
    const row = makeRow("📓", [link]);
    container.replaceChildren(row);
    // Store ID (idempotent) – safest to overwrite each time in case of stale value
    Object.assign(libreviewCache, { [cacheKey]: data.thing.urlID });
  }
  catch {
    // Ignore - no review or service unavailable (leave placeholder empty)
  }
}
