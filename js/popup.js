/* eslint-disable camelcase */
import { getUserLanguage, t } from "./i18n.js";
import { iconToEmoji } from "./veggiemap-icons.js";
import opening_hours from "opening_hours";

const nominatimCache = {};
const libreviewCache = {};
const POPUP_SECTIONS = Object.freeze(["cuisine", "address", "opening_hours", "contacts", "social", "vegan_description", "menu_url"]);
const inflight = {};
const PERSIST_KEY = "vk_nominatim_v1";
const MAX_ENTRIES = 300;
const TTL_MS = 24 * 60 * 60 * 1000;
let persistentLoaded = false;
let persistentStore = { entries: {}, order: [] };

function loadPersistentStore() {
  if (persistentLoaded) { return; }
  persistentLoaded = true;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PERSIST_KEY) || "{}");
    if (parsed.entries && parsed.order) { persistentStore = parsed; }
  }
  catch { /* Ignore */ }
}

function savePersistentStore() {
  try { window.localStorage.setItem(PERSIST_KEY, JSON.stringify(persistentStore)); }
  catch { /* Ignore */ }
}

function touchOrder(key) {
  const idx = persistentStore.order.indexOf(key);
  if (idx >= 0) { persistentStore.order.splice(idx, 1); }
  persistentStore.order.push(key);
  if (persistentStore.order.length > MAX_ENTRIES) {
    delete persistentStore.entries[persistentStore.order.shift()];
  }
}

/** Retrieve entry from cache. */
function getPersistent(key) {
  loadPersistentStore();
  const entry = persistentStore.entries[key];
  if (!entry) { return null; }
  const age = Date.now() - entry.ts;
  return { data: entry.data, ts: entry.ts, fresh: age < TTL_MS, stale: age >= TTL_MS };
}

/** Store entry in cache. */
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
  const addr = nominatimPlace?.address;
  if (!addr) { return null; }

  const street = addr.road ? `${addr.road}${addr.house_number ? ` ${addr.house_number}` : ""}` : "";
  const place = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || addr.neighbourhood || "";
  const locality = `${addr.postcode || ""} ${place}`.trim();
  const parts = [street, locality, addr.country].filter(Boolean);

  if (!parts.length) { return null; }

  const wrapper = document.createElement("div");
  const icon = document.createElement("div");
  icon.textContent = "📍";
  const text = document.createElement("div");
  parts.forEach((part, idx) => {
    if (idx > 0) { text.appendChild(document.createElement("br")); }
    text.appendChild(document.createTextNode(part));
  });
  wrapper.append(icon, text);
  return wrapper;
}

/** Determine if opening_hours state will change within offset.
 * @param {object} ohInstance opening_hours instance
 * @param {number} minutes offset minutes
 * @returns {boolean}
 */
function willChangeWithin(ohInstance, minutes) {
  try {
    const currentState = ohInstance.getState();
    const probe = new Date();
    probe.setUTCMinutes(probe.getUTCMinutes() + minutes);
    const futureState = ohInstance.getState(probe);
    return currentState !== futureState;
  }
  catch { return false; }
}

/** Get current open state with color class and text
 * @param {object} oh opening_hours instance
 * @returns {{emoji: string, text: string}}
 */
function getOpenState(oh) {
  const isOpen = oh.getState();
  const willChangeSoon = willChangeWithin(oh, 60);

  if (isOpen && !willChangeSoon) { return { emoji: "open", text: t("words_open") }; }
  if (isOpen) { return { emoji: "closes-soon", text: t("words_open") + t("texts_will_close_soon") }; }
  if (willChangeSoon) { return { emoji: "opens-soon", text: t("words_closed") + t("texts_will_open_soon") }; }
  return { emoji: "closed", text: t("words_closed") };
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
    const prettified = oh.prettifyValue({
      conf: { locale, rule_sep_string: "<br>", print_semicolon: false, sep_one_day_between: ", " }
    })
      .replaceAll(",", ", ")
      .replaceAll("PH", t("words_public_holiday"))
      .replaceAll("SH", t("words_school_holidays"));

    const state = getOpenState(oh);
    const nodes = [createOpenStateSpan(state.emoji, state.text), "\n"];
    prettified.split(/<br>/u).forEach((part, idx) => {
      if (idx > 0) { nodes.push("\n"); }
      nodes.push(part);
    });

    container.replaceChildren(...makeRow("🕖", nodes).childNodes);
  }
  catch (error) {
    container.replaceChildren(...makeRow("🕖", [`Error: ${error}`]).childNodes);
  }
  container.classList.add("popupflex-container");
  container.dataset.filled = "1";
}

/** Small helper to render colored state bullet + text. */
function createOpenStateSpan(stateEmojiClass, text) {
  const span = document.createElement("span");
  const circle = document.createElement("span");
  circle.className = `open-state-circle ${stateEmojiClass}`;
  span.append(circle, text);
  return span;
}

/** Generic helper to fill a section if not already filled
 * @param {HTMLElement} container target container
 * @param {Function} buildContent callback returning content nodes or null
 */
function fillSection(container, buildContent) {
  if (container.dataset.filled) { return; }
  const content = buildContent();
  if (!content) { return; }
  container.replaceChildren(...(Array.isArray(content) ? content : [content]));
  if (!Array.isArray(content)) { container.classList.add("popupflex-container"); }
  container.dataset.filled = "1";
}

/** Cuisine tags fill. */
function fillCuisine(extratags, container) {
  fillSection(container, () => {
    if (!extratags.cuisine) { return null; }
    const text = extratags.cuisine.replaceAll(";", ", ").replaceAll("_", " ");
    return makeRow("👩‍🍳", [text]);
  });
}

/** Contacts (phone/email/web) fill. */
function fillContacts(extratags, container) {
  fillSection(container, () => {
    const phones = [extratags.phone, extratags["contact:phone"], extratags["contact:mobile"], extratags.mobile].filter(Boolean);
    const email = extratags.email || extratags["contact:email"];
    const website = extratags.website || extratags["contact:website"];
    if (!(phones.length || email || website)) { return null; }
    const rows = [];
    if (phones[0]) { rows.push(makeRow("☎️", [makeLink(`tel:${phones[0]}`, phones[0])])); }
    if (phones[1]) { rows.push(makeRow("", [makeLink(`tel:${phones[1]}`, phones[1])])); }
    if (email) { rows.push(makeRow("📧", [makeLink(`mailto:${email}`, email)])); }
    if (website) {
      rows.push(makeRow("🌐", [makeLink(website, website.replace(/^https?:\/\//u, ""))]));
    }
    return rows;
  });
}

/** Social links fill. */
function fillSocial(extratags, container) {
  fillSection(container, () => {
    const facebook = extratags.facebook || extratags["contact:facebook"];
    const instagram = extratags.instagram || extratags["contact:instagram"];
    if (!(facebook || instagram)) { return null; }
    const rows = [];
    if (facebook) {
      const fbUrl = facebook.startsWith("http") ? facebook : `https://www.facebook.com/${facebook}`;
      rows.push(makeRow("🇫", [makeLink(fbUrl, decodeURI(fbUrl).replace("https://", ""))]));
    }
    if (instagram) {
      const igUrl = instagram.startsWith("http") ? instagram : `https://www.instagram.com/${instagram}`;
      rows.push(makeRow("📸", [makeLink(igUrl, igUrl.replace("https://", ""))]));
    }
    return rows;
  });
}

/** Vegan description fill. */
function fillVeganDescription(extratags, container) {
  fillSection(container, () => {
    const desc = extratags["diet:vegan:description"];
    return desc ? makeRow("🗒️", [desc]) : null;
  });
}

/** Menu link fill. */
function fillMenu(extratags, container) {
  fillSection(container, () => {
    const menu = extratags["website:menu"] || extratags["contact:website:menu"];
    return menu ? makeRow("📋", [makeLink(menu, menu.replace(/^https?:\/\//u, ""))]) : null;
  });
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
    [
      ["cuisine", fillCuisine],
      ["contacts", fillContacts],
      ["social", fillSocial],
      ["vegan_description", fillVeganDescription],
      ["menu_url", fillMenu]
    ].forEach(([section, fillFn]) => {
      const container = querySection(section);
      if (container) { fillFn(extratags, container); }
    });
  }

  // 1. Memory cache
  if (nominatimCache[cacheKey]) {
    applyData(nominatimCache[cacheKey]);
    return;
  }

  // 2. Persistent cache (stale-while-revalidate)
  const persisted = getPersistent(cacheKey);
  if (persisted) {
    applyData(persisted.data);
    nominatimCache[cacheKey] = persisted.data;
    if (persisted.fresh) { return; }
  }

  // 3. De-duplicate fetches
  if (inflight[cacheKey]) {
    inflight[cacheKey].then(place => place && applyData(place));
    return;
  }

  const osmType = type[0].toUpperCase();
  const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${osmType}${id}&extratags=1&addressdetails=1&format=json&accept-language=${locale}`;

  try {
    inflight[cacheKey] = fetch(url, { headers: { Accept: "application/json" } })
      .then(async (res) => {
        if (!res.ok) { throw new Error(`HTTP ${res.status}`); }
        const data = await res.json();
        if (!data?.[0]) { throw new Error("No result"); }
        const place = data[0];
        nominatimCache[cacheKey] = place;
        setPersistent(cacheKey, place);
        applyData(place);
        return place;
      })
      .catch((err) => {
        console.warn("Nominatim error:", err);
        return null;
      });
    await inflight[cacheKey];
  }
  finally { delete inflight[cacheKey]; }
}

/** Build initial popup DOM (placeholders only, sync). */
export function calculatePopup(element) {
  if (!element.feature) { return ""; }
  const { feature } = element;
  const root = document.createElement("div");

  // Category badge
  const catDiv = document.createElement("div");
  catDiv.className = `popup-category ${feature.properties.category}`;
  catDiv.textContent = t(`texts_i18n_${feature.properties.category}`);
  root.appendChild(catDiv);

  // Title with edit button
  const title = document.createElement("div");
  title.className = "map-popup-title";
  const emoji = iconToEmoji[feature.properties.icon] || "";
  title.textContent = `${emoji} ${feature.properties.name}`;

  const editBtn = document.createElement("a");
  editBtn.className = "popup-edit-button";
  editBtn.href = "#";
  editBtn.textContent = "✏️";
  editBtn.setAttribute("aria-label", "Edit");
  editBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    showEditModal(feature.properties._type, feature.properties._id);
  });
  title.appendChild(editBtn);

  root.append(title, document.createElement("hr"));

  // Placeholder sections
  POPUP_SECTIONS.forEach((name) => {
    const div = document.createElement("div");
    div.dataset.section = name;
    if (name === "address") {
      div.className = "popupflex-container";
      const icon = document.createElement("div");
      icon.textContent = "⏳";
      const text = document.createElement("div");
      text.textContent = t("words_loading") || "Loading...";
      div.append(icon, text);
    }
    root.appendChild(div);
  });

  // Libreviews
  const libDiv = document.createElement("div");
  libDiv.dataset.section = "libreviews";
  root.appendChild(libDiv);
  addLibReview(element, libDiv);

  return root;
}

/** Fetch & inject libreview link if available (cached by ID). */
export async function addLibReview(element, container) {
  if (!element.feature || !container) { return; }

  const { _type: type, _id: id } = element.feature.properties;
  const cacheKey = `${type}/${id}`;

  // Check cache first
  if (libreviewCache[cacheKey]) {
    container.replaceChildren(makeRow("📓", [makeLink(`https://lib.reviews/${libreviewCache[cacheKey]}`, t("words_review"))]));
    return;
  }

  try {
    const response = await fetch(`https://lib.reviews/api/thing?url=https://www.openstreetmap.org/${type}/${id}`);
    const data = await response.json();
    if (!container.isConnected || !data?.thing?.urlID) { return; }
    // Re-check cache after await (another call may have populated it)
    if (!libreviewCache[cacheKey]) { libreviewCache[cacheKey] = data.thing.urlID; }
    container.replaceChildren(makeRow("📓", [makeLink(`https://lib.reviews/${data.thing.urlID}`, t("words_review"))]));
  }
  catch { /* Ignore - no review or service unavailable */ }
}

/** Show edit modal with links to OSM and MapComplete
 * @param {string} type OSM element type (node/way/relation)
 * @param {string} id OSM element ID
 */
function showEditModal(type, id) {
  let overlay = document.querySelector(".edit-modal-overlay");
  if (!overlay) { overlay = createEditModal(); }

  updateEditModalContent(overlay, type, id);
  overlay.classList.add("visible");
}

/** Create the edit modal structure (once)
 * @returns {HTMLElement} overlay element
 */
function createEditModal() {
  const overlay = document.createElement("div");
  overlay.className = "edit-modal-overlay";

  const modal = document.createElement("div");
  modal.className = "edit-modal";

  const closeBtn = document.createElement("div");
  closeBtn.className = "edit-modal-close";
  closeBtn.textContent = "×";

  const title = document.createElement("h2");
  title.dataset.i18n = "title";

  const intro = document.createElement("p");
  intro.dataset.i18n = "intro";

  const linksContainer = document.createElement("div");
  linksContainer.className = "edit-modal-links";
  linksContainer.dataset.links = "";

  modal.append(closeBtn, title, intro, linksContainer);
  overlay.appendChild(modal);

  // Event delegation for close actions
  overlay.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-modal-close") || event.target === overlay) {
      overlay.classList.remove("visible");
    }
  });

  document.body.appendChild(overlay);
  return overlay;
}

/** Update modal content with current language and URLs
 * @param {HTMLElement} overlay modal overlay element
 * @param {string} type OSM element type
 * @param {string} id OSM element ID
 */
function updateEditModalContent(overlay, type, id) {
  // Update translations
  overlay.querySelector("[data-i18n='title']").textContent = t("edit_modal_title");
  overlay.querySelector("[data-i18n='intro']").textContent = t("edit_modal_intro");

  // Update links
  const linksContainer = overlay.querySelector("[data-links]");
  linksContainer.replaceChildren(
    createEditLink("MapComplete", `https://mapcomplete.org/food.html?#${type}/${id}`),
    createEditLink("OpenStreetMap", `https://openstreetmap.org/${type}/${id}`)
  );
}

/** Create an external edit link
 * @param {string} text link text
 * @param {string} url link URL
 * @returns {HTMLAnchorElement}
 */
function createEditLink(text, url) {
  const link = document.createElement("a");
  link.className = "edit-modal-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = text;
  return link;
}
