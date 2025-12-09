import { Control, DomEvent, DomUtil } from "leaflet";

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
 * Close the Info box.
 */
function closeInfo() {
  const overlay = document.getElementById("info-overlay");
  if (overlay) { overlay.classList.remove("visible"); }
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
export { InfoButton, openInfo, closeInfo, showInfoOnStartup };
