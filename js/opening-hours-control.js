import { Control, DomEvent, DomUtil } from "leaflet";
import { t } from "./i18n.js";

/**
 * OpeningHoursControl - Toggle button to filter places by opening hours
 * Shows only places that are currently open (works from zoom level 10+)
 */
const OpeningHoursControl = Control.extend({
  options: {
    position: "topright"
  },

  initialize(options) {
    Control.prototype.initialize.call(this, options);
    this._enabled = this._loadState();
    this._callback = null;
    this._openingHoursData = null; // Cached opening hours data
    this._loadingPromise = null; // Loading promise to avoid duplicate loads
  },

  onAdd(map) {
    this._map = map;

    // Create button container
    const container = DomUtil.create("div", "leaflet-bar leaflet-control");
    this._button = DomUtil.create("a", "opening-hours-control-btn", container);
    this._button.href = "#";
    this._button.setAttribute("role", "button");

    // Clock icon only
    this._button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`;

    this._updateButton();

    // Toggle on click
    DomEvent.on(this._button, "click", (evt) => {
      DomEvent.stop(evt);
      this._toggle();
    });

    // Update button state when zoom changes
    this._map.on("zoomend", () => {
      this._updateButton();
      // Trigger callback to re-apply filters when zoom changes
      if (this._callback && this._enabled) {
        this._callback();
      }
    });

    return container;
  },

  _toggle() {
    const currentZoom = this._map ? this._map.getZoom() : 0;
    const MIN_ZOOM = 10;

    // Don't allow toggle if zoom is too low
    if (currentZoom < MIN_ZOOM) {
      return;
    }

    this._enabled = !this._enabled;
    this._saveState();
    this._updateButton();

    if (this._callback) {
      this._callback();
    }
  },

  _updateButton() {
    if (!this._button || !this._map) { return; }

    const currentZoom = this._map.getZoom();
    const MIN_ZOOM = 10;
    const isZoomSufficient = currentZoom >= MIN_ZOOM;

    // Update button state
    if (isZoomSufficient) {
      if (this._enabled) {
        this._button.classList.add("active");
        this._button.classList.remove("disabled");
        this._button.title = t("opening_hours_control_active");
        this._button.setAttribute("aria-label", t("opening_hours_control_active"));
      }
      else {
        this._button.classList.remove("active", "disabled");
        this._button.title = t("opening_hours_control_inactive");
        this._button.setAttribute("aria-label", t("opening_hours_control_inactive"));
      }
    }
    else {
      this._button.classList.remove("active");
      this._button.classList.add("disabled");
      const hintText = t("opening_hours_control_zoom_hint").replace("{zoom}", MIN_ZOOM);
      this._button.title = hintText;
      this._button.setAttribute("aria-label", hintText);
    }
  },

  _loadState() {
    try {
      const saved = localStorage.getItem("openingHoursControlEnabled");
      if (saved !== null) { return JSON.parse(saved); }
    }
    catch { /* Ignore */ }
    return false; // Default: disabled
  },

  _saveState() {
    try {
      localStorage.setItem("openingHoursControlEnabled", JSON.stringify(this._enabled));
    }
    catch { /* Ignore */ }
  },

  // Public API
  onChange(callback) {
    this._callback = callback;
  },

  isEnabled() {
    const currentZoom = this._map ? this._map.getZoom() : 0;
    const MIN_ZOOM = 10;
    return this._enabled && currentZoom >= MIN_ZOOM;
  },

  updateTranslations() {
    this._updateButton();
  },

  /**
   * Load opening hours data from JSON file
   * Returns a promise that resolves with the data object
   * Data is cached after first load
   */
  loadOpeningHoursData() {
    // Return cached data if already loaded
    if (this._openingHoursData) {
      return Promise.resolve(this._openingHoursData);
    }

    // If already loading, return existing promise
    if (this._loadingPromise) {
      return this._loadingPromise;
    }

    // Start loading
    this._loadingPromise = (async () => {
      try {
        const response = await fetch("./data/opening_hours.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this._openingHoursData = await response.json();
        return this._openingHoursData;
      }
      catch (error) {
        console.error("Failed to load opening hours data:", error);
        return {}; // Return empty object on error
      }
      finally {
        this._loadingPromise = null;
      }
    })();

    return this._loadingPromise;
  }
});

export { OpeningHoursControl };
