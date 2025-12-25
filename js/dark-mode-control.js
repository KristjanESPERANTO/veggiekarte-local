import { Control, DomEvent, DomUtil } from "leaflet";
import { t } from "./i18n.js";

/**
 * DarkModeButton - Leaflet control for toggling dark mode
 *
 * Creates a button that:
 * - Detects system dark mode preference
 * - Loads saved theme from localStorage
 * - Toggles between light and dark themes
 * - Updates the map tile layer accordingly
 */
const DarkModeButton = Control.extend({
  options: {
    position: "topright",
    lightLayer: null,
    darkLayer: null
  },

  initialize(options) {
    Control.prototype.initialize.call(this, options);

    this.root = document.documentElement;
    this.prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.savedTheme = localStorage.getItem("theme");

    // Set initial theme
    if (this.savedTheme) {
      this.root.setAttribute("data-theme", this.savedTheme);
    }
    else if (this.prefersDark) {
      this.root.setAttribute("data-theme", "dark");
    }
  },

  onAdd(map) {
    this.map = map;

    const container = DomUtil.create("div", "leaflet-bar");
    const link = DomUtil.create("a", "", container);

    link.href = "#";
    link.setAttribute("role", "button");
    link.setAttribute("aria-label", t("leaflet_L_control_darkMode_title"));
    link.title = t("leaflet_L_control_darkMode_title");
    link.innerHTML = "🌓";

    // Store link reference for i18n updates
    this.link = link;

    DomEvent.on(link, "click", (event) => {
      DomEvent.stop(event);
      this.toggleDarkMode();
    });

    return container;
  },

  getCurrentTheme() {
    const dataTheme = this.root.getAttribute("data-theme");
    if (dataTheme) { return dataTheme; }
    return this.prefersDark ? "dark" : "light";
  },

  toggleDarkMode() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    this.root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    this.updateMapLayer();
  },

  updateMapLayer() {
    if (!this.map || !this.options.lightLayer || !this.options.darkLayer) {
      return;
    }

    if (this.getCurrentTheme() === "dark") {
      this.map.removeLayer(this.options.lightLayer);
      this.options.darkLayer.addTo(this.map);
    }
    else {
      this.map.removeLayer(this.options.darkLayer);
      this.options.lightLayer.addTo(this.map);
    }
  }
});

export { DarkModeButton };
