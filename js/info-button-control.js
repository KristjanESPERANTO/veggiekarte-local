/* global L */

/**
 * L.Control.InfoButton - minimal Leaflet 2-style control for a single info button.
 *
 * Usage:
 *   new InfoButton({ position: 'topright', onClick: () => { ... } }).addTo(map);
 *
 * Notes:
 * - Renders a standard Leaflet control bar with a single anchor element.
 * - Inner element gets the CSS class `info-button` (existing styles apply).
 * - Title/ARIA can be set by i18n.js after creation (keeps current behavior).
 */
const InfoButton = L.Control.extend({
  options: {
    position: "topright",
    onClick: null, // Function (evt)
    ariaLabel: "Info",
    contentHtml: null // Optional inner HTML (defaults to <div class="info-button"></div>)
  },

  onAdd(map) {
    const container = L.DomUtil.create("div", "leaflet-bar");

    const link = L.DomUtil.create("a", "", container);
    link.href = "#";
    link.setAttribute("role", "button");
    link.setAttribute("aria-label", this.options.ariaLabel || "Info");

    // Inner visual element (keeps existing .info-button CSS)
    if (this.options.contentHtml) {
      link.innerHTML = this.options.contentHtml;
    }
    else {
      L.DomUtil.create("div", "info-button", link);
    }

    // Prevent map interactions on click and call handler
    L.DomEvent.on(link, "click", (event) => {
      L.DomEvent.stop(event);
      if (typeof this.options.onClick === "function") {
        this.options.onClick(event, map);
      }
    });

    return container;
  }
});

// Export as ES module
export { InfoButton };
