/* eslint-disable camelcase */
import { clearInflightNominatim, getInflightNominatim, getMemoryNominatim, getPersistentNominatim, setInflightNominatim, setMemoryNominatim, setPersistentNominatim } from "./popup-cache.js";
import { getUserLanguage, t } from "./i18n.js";
import { iconToEmoji } from "./veggiemap-icons.js";
import opening_hours from "opening_hours";
import { showEditModal } from "./popup-edit-modal.js";

const libreviewCache = {};
const POPUP_SECTIONS = Object.freeze(["cuisine", "address", "opening_hours", "wheelchair", "contacts", "social", "vegan_description", "menu_url"]);

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

/** Wheelchair accessibility fill. */
function fillWheelchair(extratags, container) {
  fillSection(container, () => {
    const wheelchair = extratags.wheelchair;
    const wheelchairInfo = {
      yes: { emoji: "♿", text: t("wheelchair_yes"), className: "wheelchair-yes" },
      no: { emoji: "🚫", text: t("wheelchair_no"), className: "wheelchair-no" },
      limited: { emoji: "⚠️", text: t("wheelchair_limited"), className: "wheelchair-limited" },
      unknown: { emoji: "❓", text: t("wheelchair_unknown"), className: "wheelchair-unknown" }
    };
    const info = wheelchairInfo[wheelchair] || wheelchairInfo.unknown;
    const row = makeRow(info.emoji, [info.text]);
    row.classList.add(info.className);
    return row;
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
    // Address is handled separately — buildAddressNodeFromNominatim needs the full place object
    const addressContainer = querySection("address");
    if (addressContainer && !addressContainer.dataset.filled) {
      const addressNode = buildAddressNodeFromNominatim(nominatimPlace);
      addressContainer.replaceChildren(...(addressNode ? addressNode.childNodes : []));
      addressContainer.dataset.filled = "1";
    }
    const extratags = nominatimPlace.extratags || {};
    [
      ["opening_hours", (et, container) => fillOpeningHours({ extratags: et, address: nominatimPlace.address, container, locale })],
      ["cuisine", fillCuisine],
      ["wheelchair", fillWheelchair],
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
  const memoryCached = getMemoryNominatim(cacheKey);
  if (memoryCached) {
    applyData(memoryCached);
    return;
  }

  // 2. Persistent cache (stale-while-revalidate)
  const persisted = getPersistentNominatim(cacheKey);
  if (persisted) {
    applyData(persisted.data);
    setMemoryNominatim(cacheKey, persisted.data);
    if (persisted.fresh) { return; }
  }

  // 3. De-duplicate fetches
  const inflightRequest = getInflightNominatim(cacheKey);
  if (inflightRequest) {
    inflightRequest.then(place => place && applyData(place));
    return;
  }

  const osmType = type[0].toUpperCase();
  const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${osmType}${id}&extratags=1&addressdetails=1&format=json&accept-language=${locale}`;

  try {
    setInflightNominatim(
      cacheKey,
      fetch(url, { headers: { Accept: "application/json" } })
        .then(async (res) => {
          if (!res.ok) { throw new Error(`HTTP ${res.status}`); }
          const data = await res.json();
          if (!data?.[0]) { throw new Error("No result"); }
          const place = data[0];
          setMemoryNominatim(cacheKey, place);
          setPersistentNominatim(cacheKey, place);
          applyData(place);
          return place;
        })
        .catch((err) => {
          console.warn("Nominatim error:", err);
          return null;
        })
    );
    await getInflightNominatim(cacheKey);
  }
  finally { clearInflightNominatim(cacheKey); }
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

  // Title with action buttons
  const title = document.createElement("div");
  title.className = "map-popup-title";
  const emoji = iconToEmoji[feature.properties.icon] || "";
  const titleName = document.createElement("span");
  titleName.className = "map-popup-title-name";
  titleName.textContent = `${emoji} ${feature.properties.name}`;
  title.appendChild(titleName);

  const actions = document.createElement("div");
  actions.className = "popup-title-actions";

  const shareBtn = document.createElement("a");
  shareBtn.className = "popup-action-button";
  shareBtn.href = "#";
  shareBtn.textContent = "🔗";
  shareBtn.setAttribute("aria-label", t("words_share"));
  shareBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const url = location.href;
    try {
      if (navigator.share) { await navigator.share({ title: feature.properties.name, url }); }
      else {
        await navigator.clipboard.writeText(url);
        shareBtn.textContent = "✓";
        setTimeout(() => { shareBtn.textContent = "🔗"; }, 1500);
      }
    }
    catch { /* User cancelled or clipboard denied */ }
  });

  const editBtn = document.createElement("a");
  editBtn.className = "popup-action-button";
  editBtn.href = "#";
  editBtn.textContent = "✏️";
  editBtn.setAttribute("aria-label", t("words_edit"));
  editBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    showEditModal(feature.properties._type, feature.properties._id);
  });

  actions.append(shareBtn, editBtn);
  title.appendChild(actions);

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
      text.textContent = t("words_loading");
      div.append(icon, text);
    }
    root.appendChild(div);
  });

  // More info
  if (feature.properties.more_info) {
    const moreInfoDiv = document.createElement("div");
    moreInfoDiv.dataset.section = "more_info";
    root.appendChild(moreInfoDiv);
    addMoreInfo(element, moreInfoDiv);
  }

  // Libreviews container
  const libDiv = document.createElement("div");
  libDiv.dataset.section = "libreviews";
  root.appendChild(libDiv);
  addLibReview(element, libDiv);

  return root;
}

/** Add more info link for Halle-specific locations.
 * @param {L.Marker} element marker
 * @param {HTMLElement} container target div (data-section="more_info")
 */
export function addMoreInfo(element, container) {
  // Guard against geocoder markers (they don't have a feature)
  if (!element.feature) { return; }
  if (!element.feature.properties.more_info) { return; }

  const osmType = element.feature.properties._type;
  const osmId = element.feature.properties._id;
  const link = document.createElement("a");
  link.href = `${__LOCAL_SITE_URL__}#${osmType}${osmId}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = t("texts_more_info");
  const row = makeRow("ℹ️", [link]);
  container.replaceChildren(row);
}

/** Fetch & inject libreview link if available (cached by ID).
 * @param {L.Marker} element marker
 * @param {HTMLElement} container target div (data-section="libreviews")
 */
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
