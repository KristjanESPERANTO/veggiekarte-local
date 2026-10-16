import { Control, DomEvent, DomUtil } from "leaflet";
import { t } from "./i18n.js";

/**
 * InfoButton - minimal Leaflet 2-style control for a single info button.
 *
 * Usage:
 *   new InfoButton({ position: 'topright', onClick: () => { ... } }).addTo(map);
 *
 * Notes:
 * - Renders a standard Leaflet control bar with a single anchor element.
 * - Inner element gets the CSS class `info-button` (existing styles apply).
 * - Title/ARIA can be set by i18n.js after creation (keeps current behavior).
 */
const InfoButton = Control.extend({
  options: {
    position: "topright",
    onClick: null, // Function (evt)
    ariaLabel: "Info",
    contentHtml: null // Optional inner HTML (defaults to <div class="info-button"></div>)
  },

  onAdd(map) {
    const container = DomUtil.create("div", "leaflet-bar");

    const link = DomUtil.create("a", "", container);
    link.href = "#";
    link.setAttribute("role", "button");
    link.setAttribute("aria-label", this.options.ariaLabel || "Info");

    // Inner visual element (keeps existing .info-button CSS)
    if (this.options.contentHtml) {
      link.innerHTML = this.options.contentHtml;
    }
    else {
      DomUtil.create("div", "info-button", link);
    }

    // Prevent map interactions on click and call handler
    DomEvent.on(link, "click", (event) => {
      DomEvent.stop(event);
      if (typeof this.options.onClick === "function") {
        this.options.onClick(event, map);
      }
    });

    return container;
  }
});

/**
 * Open the Info box.
 */
function openInfo() {
  const overlay = document.getElementById("info-overlay");
  if (overlay) { overlay.classList.add("visible"); }
}

/**
 * Show the main info text instead of a tutorial.
 * @param {HTMLElement} [returnFocus] - Element to focus afterwards
 */
function showInfoContent(returnFocus) {
  const tutorial = document.getElementById("info-tutorial");
  if (!tutorial || tutorial.hidden) { return; }
  tutorial.hidden = true;
  tutorial.querySelector(".info-tutorial-content").replaceChildren();
  document.getElementById("content").hidden = false;
  const dialog = document.getElementById("information");
  dialog.setAttribute("aria-labelledby", "content-welcome-heading");
  dialog.scrollTop = 0;
  returnFocus?.focus();
}

/**
 * Close the Info box.
 */
function closeInfo() {
  const overlay = document.getElementById("info-overlay");
  if (overlay) { overlay.classList.remove("visible"); }
  showInfoContent();
}

/**
 * Load a tutorial page (how-to/*.html) and show its main part inside the info box.
 * @param {HTMLAnchorElement} link - Link to the tutorial page
 */
async function showTutorial(link) {
  const url = new URL(link.getAttribute("href"), location.href);
  const response = await fetch(url);
  if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
  const page = new DOMParser().parseFromString(await response.text(), "text/html");
  const main = page.getElementById("main");
  if (!main) { throw new Error("Tutorial page has no #main element"); }

  // Links and images are relative to the tutorial page; links open in a new tab
  main.querySelectorAll("a[href]").forEach((anchor) => {
    anchor.href = new URL(anchor.getAttribute("href"), url).href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  });
  main.querySelectorAll("img[src]").forEach((img) => { img.src = new URL(img.getAttribute("src"), url).href; });

  const tutorial = document.getElementById("info-tutorial");
  const content = tutorial.querySelector(".info-tutorial-content");
  content.replaceChildren(...main.childNodes);
  content.lang = page.documentElement.lang;
  const heading = content.querySelector("h1");
  if (heading) {
    heading.id = "info-tutorial-heading";
    document.getElementById("information").setAttribute("aria-labelledby", heading.id);
  }

  const back = tutorial.querySelector(".info-back");
  back.textContent = t("info_back");
  back.onclick = () => showInfoContent(link);
  document.getElementById("content").hidden = true;
  tutorial.hidden = false;
  document.getElementById("information").scrollTop = 0;
  back.focus();
}

/**
 * Open tutorial links (how-to/*.html) of the info text inside the info box with a back button.
 * Clicks with a modifier key keep the browser's default behaviour.
 */
function initInfoTutorials() {
  document.getElementById("content")?.addEventListener("click", (evt) => {
    const link = evt.target.closest("a[href*='how-to/']");
    if (!link || evt.button !== 0 || evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey) { return; }
    evt.preventDefault();
    showTutorial(link).catch((error) => {
      console.error("Failed to load tutorial:", error);
      window.open(link.href, "_blank", "noopener");
    });
  });
}

/**
 * Show info modal on startup and set up backdrop click handler.
 */
function showInfoOnStartup() {
  const overlay = document.getElementById("info-overlay");
  if (overlay) {
    openInfo();
    // Close on backdrop click
    overlay.addEventListener("click", (evt) => {
      if (evt.target === overlay) { closeInfo(); }
    });
  }
}

// Register global functions for onclick handlers in HTML
window.openInfo = openInfo;
window.closeInfo = closeInfo;

// Export as ES module
export { InfoButton, openInfo, closeInfo, showInfoOnStartup, initInfoTutorials };
