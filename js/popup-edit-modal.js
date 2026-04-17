import { t } from "./i18n.js";

/** Show edit modal with links to OSM and MapComplete.
 * @param {string} type OSM element type (node/way/relation)
 * @param {string|number} id OSM element ID
 */
export function showEditModal(type, id) {
  let overlay = document.querySelector(".edit-modal-overlay");
  if (!overlay) { overlay = createEditModal(); }

  updateEditModalContent(overlay, type, id);
  overlay.classList.add("visible");
}

/** Create the edit modal structure (once).
 * @returns {HTMLElement} overlay element
 */
function createEditModal() {
  const overlay = document.createElement("div");
  overlay.className = "edit-modal-overlay";

  const modal = document.createElement("div");
  modal.className = "edit-modal";

  const closeBtn = document.createElement("div");
  closeBtn.className = "edit-modal-close close-button";

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

/** Update modal content with current language and URLs.
 * @param {HTMLElement} overlay modal overlay element
 * @param {string} type OSM element type
 * @param {string|number} id OSM element ID
 */
function updateEditModalContent(overlay, type, id) {
  // Update translations
  overlay.querySelector("[data-i18n='title']").textContent = t("edit_modal_title");
  overlay.querySelector("[data-i18n='intro']").textContent = t("edit_modal_intro");

  // Update links
  const linksContainer = overlay.querySelector("[data-links]");
  linksContainer.replaceChildren(
    createEditLink("MapComplete", `https://mapcomplete.org/food.html?z=19#${type}/${id}`),
    createEditLink("OpenStreetMap", `https://openstreetmap.org/${type}/${id}`)
  );
}

/** Create an external edit link.
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
