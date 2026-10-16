/** @module place-list-control */

import { Control, DomEvent, DomUtil, LatLngBounds } from "leaflet";
import { onLanguageChange, t } from "./i18n.js";
import { iconToEmoji } from "./veggiemap-icons.js";

// Above this number of places in view, only the count is shown
const MAX_ENTRIES = 300;

const collator = new Intl.Collator(undefined, { sensitivity: "base" });

/**
 * Collect the markers currently shown on the map (all filters applied) within the given bounds.
 * @param {object} subgroups - Category SubGroups keyed by "mainCategory.subCategory"
 * @param {import('leaflet').Map} map - Leaflet map instance
 * @param {import('leaflet').LatLngBounds} bounds - Area to search
 * @returns {Array} Markers within the bounds
 */
export function getShownMarkersInBounds(subgroups, map, bounds) {
  const markers = [];
  Object.values(subgroups).forEach((subgroup) => {
    if (!map.hasLayer(subgroup)) { return; }
    subgroup.eachLayer((layer) => {
      if (typeof layer.getLatLng === "function" && bounds.contains(layer.getLatLng())) { markers.push(layer); }
    });
  });
  return markers;
}

/**
 * PlaceListControl - map button that opens a sidebar listing the places in the visible map area.
 * The list follows map movements and filter changes while the sidebar is open.
 *
 * Options:
 * - subgroups: category SubGroups keyed by "mainCategory.subCategory"
 * - onSelect(marker): called when a list entry is clicked
 */
export const PlaceListControl = Control.extend({
  options: {
    position: "topright",
    subgroups: {},
    onSelect: null
  },

  onAdd(map) {
    this._map = map;
    this._open = false;

    const container = DomUtil.create("div", "leaflet-bar leaflet-control");
    this._button = DomUtil.create("a", "place-list-btn", container);
    this._button.href = "#";
    this._button.setAttribute("role", "button");
    this._button.setAttribute("aria-expanded", "false");
    this._button.setAttribute("aria-controls", "place-list");
    this._button.innerHTML = "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' aria-hidden='true'><line x1='9' y1='6' x2='21' y2='6'/><line x1='9' y1='12' x2='21' y2='12'/><line x1='9' y1='18' x2='21' y2='18'/><circle cx='4' cy='6' r='1'/><circle cx='4' cy='12' r='1'/><circle cx='4' cy='18' r='1'/></svg>";
    DomEvent.on(this._button, "click", (evt) => {
      DomEvent.stop(evt);
      this.toggle();
    });

    this._createPanel();
    this._updateLabels();

    map.on("moveend", this.refresh, this);
    onLanguageChange(() => {
      this._updateLabels();
      this.refresh();
    });

    return container;
  },

  _createPanel() {
    this._panel = DomUtil.create("aside", "place-list", document.body);
    this._panel.id = "place-list";
    this._panel.setAttribute("aria-labelledby", "place-list-title");

    const header = DomUtil.create("div", "place-list-header", this._panel);
    this._title = DomUtil.create("h2", "place-list-title", header);
    this._title.id = "place-list-title";
    this._closeButton = DomUtil.create("button", "place-list-close", header);
    this._closeButton.type = "button";
    this._closeButton.textContent = "×";
    DomEvent.on(this._closeButton, "click", () => this.toggle(false));

    this._status = DomUtil.create("div", "place-list-status", this._panel);
    this._status.setAttribute("aria-live", "polite");
    this._list = DomUtil.create("ul", "place-list-entries", this._panel);

    DomEvent.on(this._panel, "keydown", (evt) => {
      if (evt.key === "Escape") {
        this.toggle(false);
        this._button.focus();
      }
    });
  },

  _updateLabels() {
    const label = t("place_list_button");
    this._button.title = label;
    this._button.setAttribute("aria-label", label);
    this._title.textContent = t("place_list_title");
    this._closeButton.setAttribute("aria-label", t("words_close"));
  },

  /**
   * Open or close the sidebar.
   * @param {boolean} [open] - Target state; toggles when omitted
   */
  toggle(open = !this._open) {
    this._open = open;
    this._panel.classList.toggle("visible", open);
    this._button.setAttribute("aria-expanded", String(open));
    if (open) { this.refresh(); }
  },

  /**
   * Map area that is not covered by the sidebar: on wide screens the sidebar
   * covers the left side of the map, on narrow screens the bottom part.
   * @returns {LatLngBounds} Visible map bounds
   */
  _visibleBounds() {
    const map = this._map;
    const size = map.getSize();
    const mapRect = map.getContainer().getBoundingClientRect();
    const panelRect = this._panel.getBoundingClientRect();
    let left = 0;
    let bottom = size.y;
    if (panelRect.height >= mapRect.height * 0.8) {
      left = Math.min(size.x, Math.max(0, panelRect.right - mapRect.left));
    }
    else {
      bottom = Math.min(size.y, Math.max(0, panelRect.top - mapRect.top));
    }
    return new LatLngBounds(map.containerPointToLatLng([left, bottom]), map.containerPointToLatLng([size.x, 0]));
  },

  /**
   * Rebuild the list for the current map area and filters (only while the sidebar is open).
   */
  refresh() {
    if (!this._open || !this._map) { return; }

    const markers = getShownMarkersInBounds(this.options.subgroups, this._map, this._visibleBounds());
    this._list.replaceChildren();

    if (markers.length === 0) {
      this._status.textContent = t("place_list_empty");
      return;
    }
    if (markers.length > MAX_ENTRIES) {
      this._status.textContent = t("place_list_zoom_in").replace("{count}", markers.length.toLocaleString());
      return;
    }

    this._status.textContent = t("place_list_count").replace("{count}", markers.length.toLocaleString());
    markers
      .sort((markerA, markerB) => collator.compare(markerA.feature.properties.name, markerB.feature.properties.name))
      .forEach(marker => this._addEntry(marker));
  },

  _addEntry(marker) {
    const { name, icon, category } = marker.feature.properties;
    const entry = DomUtil.create("li", "place-list-entry", this._list);
    const button = DomUtil.create("button", "", entry);
    button.type = "button";

    const iconElement = DomUtil.create("span", `place-list-icon ${category}`, button);
    iconElement.textContent = iconToEmoji[icon] || "⭐";
    iconElement.setAttribute("aria-hidden", "true");

    const text = DomUtil.create("span", "place-list-text", button);
    DomUtil.create("span", "place-list-name", text).textContent = name;
    DomUtil.create("span", "place-list-diet", text).textContent = t(`texts_i18n_${category}`);

    DomEvent.on(button, "click", () => {
      if (typeof this.options.onSelect === "function") { this.options.onSelect(marker); }
    });
  }
});
