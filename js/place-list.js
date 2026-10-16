/** @module place-list */

import { DomEvent, DomUtil } from "leaflet";
import { iconToEmoji } from "./veggiemap-icons.js";
import { t } from "./i18n.js";

// Above this number of places in view, only the count is shown
const MAX_ENTRIES = 300;

// Diet categories in the order of the legend (most vegan first)
export const DIET_ORDER = ["vegan_only", "vegetarian_only", "vegan_friendly", "vegan_limited", "vegetarian_friendly"];

const collator = new Intl.Collator(undefined, { sensitivity: "base" });

/**
 * Format an OSM cuisine value for display ("vietnamese;sushi" → "vietnamese, sushi").
 * @param {string} cuisine - Value of the cuisine tag
 * @returns {string} Display text
 */
export function formatCuisine(cuisine) {
  return cuisine.replaceAll(";", ", ").replaceAll("_", " ");
}

/**
 * List of the places shown in a map area, sorted by name.
 *
 * After an entry is selected, the list keeps the area it showed at that moment, so moving to the
 * selected place does not replace the list; it follows the map again after release().
 */
export class PlaceList {
  /**
   * @param {object} options
   * @param {Function} options.getPlaces - Returns the shown places (all filters applied) within the given bounds
   * @param {HTMLElement} options.container - Element the list is rendered into
   * @param {Function} options.getBounds - Returns the map bounds the list covers
   * @param {Function} options.getOpenState - Returns the open state of a feature (true, false or null)
   * @param {Function} options.onSelect - Called with the place of a selected entry
   * @param {Function} [options.onHighlight] - Called with the place of a hovered or focused entry, and with null afterwards
   */
  constructor({ getPlaces, container, getBounds, getOpenState, onSelect, onHighlight }) {
    this._getPlaces = getPlaces;
    this._getBounds = getBounds;
    this._getOpenState = getOpenState;
    this._onSelect = onSelect;
    this._onHighlight = onHighlight;
    this._frozenBounds = null;
    this._selectedPlace = null;
    // List entries by place, reused across refreshes so unchanged entries stay in place
    this._entries = new Map();

    // The visible heading is the sidebar's panel handle; this one names the list for screen readers
    this._title = DomUtil.create("h2", "place-list-title visually-hidden", container);
    this._title.id = "place-list-title";
    this._summary = DomUtil.create("div", "place-list-summary", container);
    this._status = DomUtil.create("p", "place-list-status", container);
    this._status.setAttribute("aria-live", "polite");
    this._list = DomUtil.create("ul", "place-list-entries", container);
    this._list.setAttribute("aria-labelledby", "place-list-title");
  }

  /** Let the list follow the map area again and clear the selected entry. */
  release() {
    this._frozenBounds = null;
    this._selectedPlace = null;
  }

  /**
   * Keep the current area and mark the given place as selected.
   * @param {object} place - Selected place
   */
  freeze(place) {
    this._frozenBounds ||= this._getBounds();
    this._selectedPlace = place;
  }

  /** @returns {string} Heading of the last rendered list ("199 places") */
  get titleText() {
    return this._title.textContent;
  }

  /** Drop the cached entries, e.g. after a language change. */
  clearEntries() {
    this._entries.clear();
    this._list.replaceChildren();
  }

  /** Update the list for the current (or frozen) map area and filters. */
  refresh() {
    const places = this._getPlaces(this._frozenBounds || this._getBounds());
    this._renderSummary(places);

    this._title.textContent = places.length > 0
      ? t("place_list_count").replace("{count}", places.length.toLocaleString())
      : t("place_list_title");

    if (places.length === 0 || places.length > MAX_ENTRIES) {
      this._status.textContent = places.length === 0
        ? t("place_list_empty")
        : t("place_list_zoom_in").replace("{count}", places.length.toLocaleString());
      this._status.hidden = false;
      this._list.replaceChildren();
      return;
    }

    this._status.hidden = true;
    const entries = places
      .sort((placeA, placeB) => collator.compare(placeA.feature.properties.name, placeB.feature.properties.name))
      .map(place => this._updateEntry(place));
    this._placeEntries(entries);
  }

  /** Put the entries into the list in the given order, moving only those not yet in place. */
  _placeEntries(entries) {
    const wanted = new Set(entries);
    [...this._list.children].forEach((child) => {
      if (!wanted.has(child)) { child.remove(); }
    });
    entries.forEach((entry, index) => {
      const current = this._list.children[index];
      if (current !== entry) { this._list.insertBefore(entry, current || null); }
    });
    // Keep the cache from growing without bound while panning through many areas
    if (this._entries.size > 4 * MAX_ENTRIES) {
      this._entries.forEach((entry, place) => {
        if (!entry.isConnected) { this._entries.delete(place); }
      });
    }
  }

  _renderSummary(places) {
    const counts = {};
    places.forEach((place) => {
      const { category } = place.feature.properties;
      counts[category] = (counts[category] || 0) + 1;
    });
    this._summary.replaceChildren();
    DIET_ORDER.forEach((diet) => {
      if (!counts[diet]) { return; }
      const item = DomUtil.create("span", "place-list-summary-item", this._summary);
      item.title = t(`texts_i18n_${diet}`);
      const swatch = DomUtil.create("span", `diet-swatch ${diet}`, item);
      swatch.setAttribute("aria-hidden", "true");
      item.append(counts[diet].toLocaleString());
      item.setAttribute("aria-label", `${item.title}: ${counts[diet]}`);
    });
  }

  /** Get the entry of a place (created on first use) with its selected and open state updated. */
  _updateEntry(place) {
    let entry = this._entries.get(place);
    if (!entry) {
      entry = this._createEntry(place);
      this._entries.set(place, entry);
    }
    entry.classList.toggle("selected", place === this._selectedPlace);

    // Open state, once the opening hours data has been loaded
    const open = this._getOpenState(place.feature);
    let state = entry.querySelector(".place-list-state");
    if (open === null) {
      state?.remove();
    }
    else {
      state ||= DomUtil.create("span", "place-list-state", entry.firstChild);
      state.className = `place-list-state ${open ? "is-open" : "is-closed"}`;
      state.textContent = open ? t("words_open") : t("words_closed");
    }
    return entry;
  }

  _createEntry(place) {
    const { name, icon, category, cuisine } = place.feature.properties;
    const entry = DomUtil.create("li", "place-list-entry");
    const button = DomUtil.create("button", "", entry);
    button.type = "button";

    const iconElement = DomUtil.create("span", `place-list-icon ${category}`, button);
    iconElement.textContent = iconToEmoji[icon] || "⭐";
    // The icon colors show the diet category; its label is the tooltip and the accessible name
    iconElement.title = t(`texts_i18n_${category}`);
    iconElement.setAttribute("role", "img");
    iconElement.setAttribute("aria-label", iconElement.title);

    const text = DomUtil.create("span", "place-list-text", button);
    DomUtil.create("span", "place-list-name", text).textContent = name;
    if (cuisine) {
      DomUtil.create("span", "place-list-cuisine", text).textContent = formatCuisine(cuisine);
    }

    // Mouse hover and keyboard focus point the entry out on the map (touch taps open the place instead)
    DomEvent.on(button, "pointerenter", (evt) => {
      if (evt.pointerType === "mouse") { this._onHighlight?.(place); }
    });
    DomEvent.on(button, "focus", () => this._onHighlight?.(place));
    DomEvent.on(button, "pointerleave blur", () => this._onHighlight?.(null));

    DomEvent.on(button, "click", () => {
      this.freeze(place);
      this._list.querySelector(".place-list-entry.selected")?.classList.remove("selected");
      entry.classList.add("selected");
      this._onSelect(place);
    });
    return entry;
  }
}
