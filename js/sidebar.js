/** @module sidebar */

import { DIET_ORDER, PlaceList } from "./place-list.js";
import { DomEvent, DomUtil } from "leaflet";
import { addNominatimInformation, calculatePopup } from "./popup.js";
import { onLanguageChange, t } from "./i18n.js";
import { setMarkerHash } from "./map-hash.js";

const NARROW_QUERY = "(max-width: 600px)";
const SHEET_STATES = ["peek", "half", "full"];
const SHEET_STORAGE_KEY = "veggiekarte_sheet_state";
const SELECTED_CLASS = "marker-selected";

const ICONS = {
  filter: "<svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><path d='M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1'/><circle cx='15' cy='6' r='2'/><circle cx='9' cy='12' r='2'/><circle cx='17' cy='18' r='2'/></svg>",
  clock: "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><circle cx='12' cy='12' r='9'/><path d='M12 7v5l3 2'/></svg>",
  back: "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M19 12H5M11 6l-6 6 6 6'/></svg>",
  close: "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><path d='M6 6l12 12M18 6 6 18'/></svg>",
  chevron: "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='m6 15 6-6 6 6'/></svg>"
};

/** Read a value from localStorage; returns null when storage is unavailable. */
function loadSetting(key) {
  try { return localStorage.getItem(key); }
  catch { return null; }
}

/** Write a value to localStorage; ignored when storage is unavailable. */
function saveSetting(key, value) {
  try { localStorage.setItem(key, value); }
  catch { /* Ignore */ }
}

/**
 * Sidebar with the search card (search field, quick filters, filter dialog button) and a panel
 * that shows either the list of places in view or the details of a selected place.
 * On wide screens it is a column on the left; on narrow screens the search card sits at the top
 * and the panel is a bottom sheet with the states peek, half and full.
 */
export class Sidebar {
  /**
   * @param {object} options
   * @param {import('leaflet').Map} options.map - Leaflet map instance
   * @param {object} options.subgroups - Category SubGroups keyed by "mainCategory.subCategory"
   * @param {object} options.clusterGroup - MarkerClusterGroup holding the place markers
   * @param {object} options.geocoder - Geocoder control; its element moves into the search card
   * @param {object} options.categoryFilterControl - Category and diet filter control
   * @param {object} options.openingHoursControl - Open-now filter control
   * @param {Function} options.onClosePlace - Called after the place details are closed
   */
  constructor({ map, subgroups, clusterGroup, geocoder, categoryFilterControl, openingHoursControl, onClosePlace }) {
    this._map = map;
    this._clusterGroup = clusterGroup;
    this._categoryFilterControl = categoryFilterControl;
    this._openingHoursControl = openingHoursControl;
    this._onClosePlace = onClosePlace;
    this._selectedMarker = null;
    this._narrow = window.matchMedia(NARROW_QUERY);
    this._sheetState = SHEET_STATES.includes(loadSetting(SHEET_STORAGE_KEY)) ? loadSetting(SHEET_STORAGE_KEY) : "half";

    this._createElements(geocoder);
    this.list = new PlaceList({
      map,
      subgroups,
      container: this._listView,
      getBounds: () => this.getListBounds(),
      getOpenState: feature => this._getOpenState(feature),
      onSelect: marker => this.showPlace(marker, { fromList: true })
    });
    this._createLegend();
    this._bindEvents();
    this._updateLabels();
    this._setSheetState(this._sheetState, false);
    this.refresh();
  }

  _createElements(geocoder) {
    // Placed before the map so keyboard users reach search and list before the map's markers
    this._root = DomUtil.create("aside", "sidebar");
    this._root.id = "sidebar";
    const mapElement = this._map.getContainer();
    mapElement.parentNode.insertBefore(this._root, mapElement);

    // Search card
    this._searchCard = DomUtil.create("div", "search-card", this._root);
    const searchRow = DomUtil.create("div", "search-row", this._searchCard);
    const searchSlot = DomUtil.create("div", "search-slot", searchRow);
    this._geocoderElement = geocoder.getContainer();
    searchSlot.appendChild(this._geocoderElement);
    this._filterButton = DomUtil.create("button", "filter-button", searchRow);
    this._filterButton.type = "button";
    this._filterButton.innerHTML = ICONS.filter;
    this._filterBadge = DomUtil.create("span", "filter-badge", this._filterButton);
    this._filterBadge.hidden = true;

    this._chipRow = DomUtil.create("div", "chip-row", this._searchCard);
    this._chipRow.setAttribute("role", "group");
    this._chips = {
      vegan: this._createChip("vegan", ""),
      openNow: this._createChip("open-now", ICONS.clock),
      food: this._createChip("food", ""),
      shopping: this._createChip("shopping", "")
    };

    // Panel with list and details
    this._panel = DomUtil.create("section", "sidebar-panel", this._root);
    this._handle = DomUtil.create("button", "sheet-handle", this._panel);
    this._handle.type = "button";
    this._handle.setAttribute("aria-controls", "sidebar-panel-body");
    this._handle.innerHTML = `<span class="sheet-grip" aria-hidden="true"></span><span class="sheet-label"></span><span class="sheet-chevron">${ICONS.chevron}</span>`;
    this._handleLabel = this._handle.querySelector(".sheet-label");
    this._body = DomUtil.create("div", "sidebar-panel-body", this._panel);
    this._body.id = "sidebar-panel-body";

    this._listView = DomUtil.create("div", "list-view", this._body);
    this._detailView = DomUtil.create("div", "detail-view", this._body);
    this._detailView.hidden = true;
    const detailNav = DomUtil.create("div", "detail-nav", this._detailView);
    this._backButton = DomUtil.create("button", "detail-back", detailNav);
    this._backButton.type = "button";
    this._closeButton = DomUtil.create("button", "detail-close", detailNav);
    this._closeButton.type = "button";
    this._closeButton.innerHTML = ICONS.close;
    this._detailContent = DomUtil.create("div", "detail-content", this._detailView);
  }

  /**
   * Open state of a place for the list. The first call starts loading the opening hours data
   * (once per visit) and refreshes the list when it has arrived.
   * @param {object} feature - GeoJSON feature of the place
   * @returns {boolean|null} Open, closed, or null while unknown
   */
  _getOpenState(feature) {
    if (!this._openingHoursControl.getLoadedData() && !this._openingHoursRequested) {
      this._openingHoursRequested = true;
      this._openingHoursControl.loadOpeningHoursData().then(() => {
        if (this._detailView.hidden) { this._refreshList(); }
      });
    }
    return this._openingHoursControl.isOpen(feature);
  }

  _createChip(name, icon) {
    const chip = DomUtil.create("button", `chip chip-${name}`, this._chipRow);
    chip.type = "button";
    chip.setAttribute("aria-pressed", "false");
    chip.innerHTML = icon;
    chip.labelElement = DomUtil.create("span", "", chip);
    return chip;
  }

  _createLegend() {
    this._legend = DomUtil.create("div", "map-legend", document.body);
    this._legend.setAttribute("aria-hidden", "true");
    this._legendItems = DIET_ORDER.map((diet) => {
      const item = DomUtil.create("span", "map-legend-item", this._legend);
      DomUtil.create("span", `diet-swatch ${diet}`, item);
      const label = DomUtil.create("span", "", item);
      return { diet, label };
    });
  }

  _bindEvents() {
    const map = this._map;

    DomEvent.on(this._filterButton, "click", () => document.toggleCategoryFilter?.());
    // Each chip shows its new state right away; the map and list follow when the filters are applied
    const flip = chip => chip.setAttribute("aria-pressed", String(chip.getAttribute("aria-pressed") !== "true"));
    DomEvent.on(this._chips.food, "click", () => {
      flip(this._chips.food);
      this._toggleMainCategory("food");
    });
    DomEvent.on(this._chips.shopping, "click", () => {
      flip(this._chips.shopping);
      this._toggleMainCategory("shopping");
    });
    DomEvent.on(this._chips.openNow, "click", () => {
      flip(this._chips.openNow);
      this._openingHoursControl.toggle();
    });
    DomEvent.on(this._chips.vegan, "click", () => {
      flip(this._chips.vegan);
      const veganOnly = !this._categoryFilterControl.isDietEnabled("vegetarian_friendly");
      this._categoryFilterControl.setDietEnabled("vegetarian_friendly", veganOnly);
    });

    DomEvent.on(this._backButton, "click", () => this.closePlace());
    DomEvent.on(this._closeButton, "click", () => this.closePlace());
    DomEvent.on(this._detailView, "keydown", (evt) => {
      if (evt.key === "Escape") { this.closePlace(); }
    });

    this._bindSheetHandle();

    map.on("moveend", () => {
      if (this._detailView.hidden) { this._refreshList(); }
    });
    // A user interaction with the map lets the list follow the map area again and keeps the map view on "back"
    DomEvent.on(map.getContainer(), "pointerdown wheel keydown", () => {
      this.list.release();
      this._viewBeforePlace = null;
    });

    onLanguageChange(() => {
      this.list.clearEntries();
      this._updateLabels();
      this.refresh();
      if (this._selectedMarker) { this._renderPlace(this._selectedMarker); }
    });

    const updateLayout = () => {
      this._setSheetState(this._sheetState, false);
      this._updateMapOffsets();
    };
    this._narrow.addEventListener("change", updateLayout);
    window.addEventListener("resize", () => this._updateMapOffsets());
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(() => this._updateMapOffsets()).observe(this._root);
    }
  }

  _bindSheetHandle() {
    let startY = null;
    let moved = false;
    DomEvent.on(this._handle, "pointerdown", (evt) => {
      startY = evt.clientY;
      moved = false;
      this._handle.setPointerCapture?.(evt.pointerId);
    });
    DomEvent.on(this._handle, "pointermove", (evt) => {
      if (startY !== null && Math.abs(evt.clientY - startY) > 8) { moved = true; }
    });
    DomEvent.on(this._handle, "pointerup", (evt) => {
      if (startY === null) { return; }
      const delta = evt.clientY - startY;
      startY = null;
      const index = SHEET_STATES.indexOf(this._sheetState);
      if (moved && delta < -40) { this._setSheetState(SHEET_STATES[Math.min(index + 1, SHEET_STATES.length - 1)]); }
      else if (moved && delta > 40) { this._setSheetState(SHEET_STATES[Math.max(index - 1, 0)]); }
    });
    // Click (also keyboard): toggle between the collapsed and the open panel
    DomEvent.on(this._handle, "click", () => {
      if (moved) { return; }
      this._setSheetState(this._sheetState === "peek" ? "half" : "peek");
    });
  }

  /** Restore the default filter settings except those shown as quick filters. */
  _resetHiddenFilters() {
    const filters = this._categoryFilterControl;
    const vegetarianFriendly = filters.isDietEnabled("vegetarian_friendly");
    const [food, shopping] = [filters.isMainCategoryEnabled("food"), filters.isMainCategoryEnabled("shopping")];
    filters.resetToDefaults();
    filters.setDietEnabled("vegetarian_friendly", vegetarianFriendly);
    filters.setMainCategoryEnabled("food", food);
    filters.setMainCategoryEnabled("shopping", shopping);
  }

  _toggleMainCategory(mainId) {
    const enabled = this._categoryFilterControl.isMainCategoryEnabled(mainId);
    this._categoryFilterControl.setMainCategoryEnabled(mainId, !enabled);
  }

  /**
   * Set the panel state. Wide screens use "peek" as collapsed and the other states as open.
   * @param {string} state - "peek", "half" or "full"
   * @param {boolean} [save] - Remember the state
   */
  _setSheetState(state, save = true) {
    this._sheetState = state;
    this._root.dataset.sheet = state;
    const expanded = state !== "peek";
    this._handle.setAttribute("aria-expanded", String(expanded));
    this._handle.setAttribute("aria-label", expanded ? t("sidebar_collapse") : t("sidebar_expand"));
    if (save) { saveSetting(SHEET_STORAGE_KEY, state); }
    this._updateMapOffsets();
    if (this._detailView.hidden) { this._refreshList(); }
  }

  /** Expose the space the sidebar covers to CSS, so map controls and attribution stay visible. */
  _updateMapOffsets() {
    const rootStyle = document.documentElement.style;
    if (this._narrow.matches) {
      const searchRect = this._searchCard.getBoundingClientRect();
      const panelRect = this._panel.getBoundingClientRect();
      rootStyle.setProperty("--sidebar-left", "0px");
      rootStyle.setProperty("--sidebar-top", `${Math.round(searchRect.bottom)}px`);
      rootStyle.setProperty("--sidebar-bottom", `${Math.round(window.innerHeight - panelRect.top)}px`);
    }
    else {
      // A collapsed panel leaves the map uncovered apart from the small search card
      const left = this._sheetState === "peek" ? 0 : this._root.getBoundingClientRect().right;
      rootStyle.setProperty("--sidebar-left", `${Math.round(left)}px`);
      rootStyle.setProperty("--sidebar-top", "0px");
      rootStyle.setProperty("--sidebar-bottom", "0px");
    }
  }

  /**
   * Map area the place list covers: the whole map viewport, so every place visible in the browser
   * is in the list, and opening, collapsing or resizing the panel does not change it.
   * @returns {import('leaflet').LatLngBounds} List bounds
   */
  getListBounds() {
    return this._map.getBounds();
  }

  /**
   * @returns {Array<number>} Pixel offset [x, y] of the uncovered map area's center from the map center
   */
  getViewOffset() {
    const size = this._map.getSize();
    const { left, top, right, bottom } = this._visibleRect();
    return [(left + right - size.x) / 2, (top + bottom - size.y) / 2];
  }

  /** @returns {{left: number, top: number, right: number, bottom: number}} Uncovered map area in container pixels */
  _visibleRect() {
    const size = this._map.getSize();
    const mapRect = this._map.getContainer().getBoundingClientRect();
    let left = 0;
    let top = 0;
    let bottom = size.y;
    if (this._narrow.matches) {
      top = this._searchCard.getBoundingClientRect().bottom - mapRect.top;
      bottom = this._panel.getBoundingClientRect().top - mapRect.top;
    }
    else if (this._sheetState !== "peek") {
      left = this._root.getBoundingClientRect().right - mapRect.left;
    }
    const clamp = (value, max) => Math.min(max, Math.max(0, value));
    return { left: clamp(left, size.x), top: clamp(top, size.y), right: size.x, bottom: clamp(bottom, size.y) };
  }

  _updateLabels() {
    // The search field is created after the first translation pass, so its texts are set here
    const searchInput = this._geocoderElement.querySelector("input");
    searchInput.placeholder = t("leaflet_L_control_geocoder_placeholder");
    searchInput.setAttribute("aria-label", t("leaflet_L_control_geocoder_title"));
    this._geocoderElement.querySelector(".leaflet-control-geocoder-icon")?.setAttribute("aria-label", t("leaflet_L_control_geocoder_title"));
    const errorMessage = this._geocoderElement.querySelector(".leaflet-control-geocoder-form-no-error, .leaflet-control-geocoder-error");
    if (errorMessage) { errorMessage.textContent = t("leaflet_L_control_geocoder_error_message"); }

    this._filterButton.setAttribute("aria-label", t("category_selection_title"));
    this._filterButton.title = t("category_selection_title");
    this._chipRow.setAttribute("aria-label", t("sidebar_quick_filters"));
    this._chips.food.labelElement.textContent = t("sidebar_food");
    this._chips.food.title = t("category_food");
    this._chips.shopping.labelElement.textContent = t("sidebar_shopping");
    this._chips.shopping.title = t("category_shopping");
    this._chips.openNow.labelElement.textContent = t("sidebar_open_now");
    this._chips.vegan.labelElement.textContent = t("sidebar_vegan_options");
    this._chips.vegan.title = t("sidebar_vegan_options_hint");
    this._backButton.innerHTML = ICONS.back;
    DomUtil.create("span", "", this._backButton).textContent = t("place_list_back");
    this._closeButton.setAttribute("aria-label", t("words_close"));
    this._legendItems.forEach(({ diet, label }) => { label.textContent = t(`texts_i18n_${diet}`); });
    this._setSheetState(this._sheetState, false);
  }

  /** Update quick filters, filter badge and list after filter or map changes. */
  refresh() {
    const filters = this._categoryFilterControl;
    const setPressed = (chip, pressed) => chip.setAttribute("aria-pressed", String(pressed));
    setPressed(this._chips.food, filters.isMainCategoryEnabled("food"));
    setPressed(this._chips.shopping, filters.isMainCategoryEnabled("shopping"));
    setPressed(this._chips.vegan, !filters.isDietEnabled("vegetarian_friendly"));

    const openingHours = this._openingHoursControl;
    const available = openingHours.isAvailable();
    setPressed(this._chips.openNow, openingHours.isEnabled());
    this._chips.openNow.disabled = !available;
    this._chips.openNow.title = available ? t("opening_hours_control_inactive") : t("opening_hours_control_zoom_hint").replace("{zoom}", "10");

    // The badge counts only settings the quick filters do not show
    const changed = filters.countChangedFilters({ ignoreDiets: ["vegetarian_friendly"], ignoreCategories: ["food", "shopping"] });
    this._filterBadge.hidden = changed === 0;
    this._filterBadge.textContent = String(changed);
    filters.setChangeCount(changed, () => this._resetHiddenFilters());

    if (this._detailView.hidden) { this._refreshList(); }
  }

  _refreshList() {
    this.list.refresh();
    this._handleLabel.textContent = this.list.titleText;
  }

  /**
   * Show the details of a place in the panel, highlight its marker and keep it in view.
   * @param {import('leaflet').Marker} marker - Place marker
   * @param {object} [options]
   * @param {boolean} [options.fromList] - Selected in the list (the list keeps its area)
   */
  showPlace(marker, { fromList = false } = {}) {
    if (!fromList) { this.list.release(); }
    if (this._detailView.hidden) { this._returnFocus = document.activeElement; }
    // A place selected in the list restores the map view of the list when going back
    if (!fromList) { this._viewBeforePlace = null; }
    else if (this._detailView.hidden) { this._viewBeforePlace = { center: this._map.getCenter(), zoom: this._map.getZoom() }; }
    this._setSelectedMarker(marker);
    this._renderPlace(marker);

    const { _type: type, _id: id } = marker.feature.properties;
    setMarkerHash(type, id);

    this._listView.hidden = true;
    this._detailView.hidden = false;
    if (this._sheetState === "peek") { this._setSheetState("half", false); }
    this._detailView.scrollTop = 0;
    this._closeButton.focus({ preventScroll: true });

    this._revealMarker(marker);
  }

  /**
   * Zoom to the marker (opening its cluster) and pan it into the uncovered map area.
   * While the cluster group is still loading, the marker's cluster and its bounds are not ready yet;
   * it is retried then.
   */
  _revealMarker(marker, attempts = 50) {
    if (marker !== this._selectedMarker) { return; }
    if (!marker.__parent?._bounds?.isValid()) {
      if (attempts > 0) { setTimeout(() => this._revealMarker(marker, attempts - 1), 200); }
      return;
    }
    this._clusterGroup.zoomToShowLayer(marker, () => this._panIntoView(marker));
  }

  _renderPlace(marker) {
    const content = calculatePopup(marker);
    this._detailContent.replaceChildren(content);
    addNominatimInformation(marker, content);
  }

  /** Close the place details and show the list again. */
  closePlace() {
    if (this._detailView.hidden) { return; }
    const marker = this._selectedMarker;
    this._setSelectedMarker(null);
    this._detailView.hidden = true;
    this._listView.hidden = false;
    this._detailContent.replaceChildren();
    this._refreshList();
    if (typeof this._onClosePlace === "function") { this._onClosePlace(); }
    if (this._viewBeforePlace) {
      this._map.setView(this._viewBeforePlace.center, this._viewBeforePlace.zoom);
      this._viewBeforePlace = null;
    }

    // Focus goes back to where the details were opened from (list entry or marker)
    const target = this._returnFocus?.isConnected && this._returnFocus !== document.body ? this._returnFocus : marker?.getElement();
    target?.focus({ preventScroll: true });
    this._returnFocus = null;
  }

  _setSelectedMarker(marker) {
    if (this._selectedMarker) {
      this._selectedMarker.getElement()?.classList.remove(SELECTED_CLASS);
      this._selectedMarker.off("add", this._markSelected, this);
    }
    this._selectedMarker = marker;
    if (marker) {
      marker.on("add", this._markSelected, this);
      this._markSelected();
    }
  }

  // The cluster group re-adds markers on zoom; the highlight is restored each time
  _markSelected() {
    this._selectedMarker?.getElement()?.classList.add(SELECTED_CLASS);
  }

  /** Pan the map so the marker lies in the part of the map that the sidebar does not cover. */
  _panIntoView(marker) {
    const map = this._map;
    const { left, top, right, bottom } = this._visibleRect();
    const point = map.latLngToContainerPoint(marker.getLatLng());
    const margin = 48;
    const inside = point.x > left + margin && point.x < right - margin && point.y > top + margin && point.y < bottom - margin;
    if (inside) { return; }
    map.panBy([point.x - (left + right) / 2, point.y - (top + bottom) / 2]);
  }
}
