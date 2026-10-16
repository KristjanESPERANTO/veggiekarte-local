import { Control, Icon, Map, TileLayer } from "leaflet";
import { DEFAULT_THEMES, ThemeControl } from "leaflet-theme-control";
import { PlaceClusterLayer, clusterRadiusForZoom } from "./place-cluster-layer.js";
import { addLanguageResources, getUserLanguage, t } from "./i18n.js";
import { closeInfo, initInfoTutorials, showInfoOnStartup } from "./info-button-control.js";
import { createMapHash, parseMarkerHash, setMarkerHash } from "./map-hash.js";
import { createPlaceMarker, geojsonToPlaceGroups, setPlaceClickHandler, statPopulate } from "./veggiemap-data.js";
import { CATEGORY_HIERARCHY } from "./category-mapping.js";
import { CategoryFilterControl } from "./category-filter-control.js";
import { FullScreen } from "leaflet.fullscreen";
import { LocateControl } from "leaflet.locatecontrol";
import { MenuControl } from "./menu-control.js";
import { OpeningHoursControl } from "./opening-hours-control.js";
import { Sidebar } from "./sidebar.js";
import { addGeocoder } from "./geocoder-control.js";
import { addNominatimInformation } from "./popup.js";
import { createProgressController } from "./progress.js";
import { initDialog } from "./dialog.js";
import { initUpdateCheck } from "./update-check.js";

/**
 * Progress bar for loading the map: data fetch (0-50%), then clustering and showing the places (50-100%).
 */
const progress = createProgressController();

const DIET_TYPES = ["vegan_only", "vegetarian_only", "vegan_friendly", "vegan_limited", "vegetarian_friendly"];

let map;
let clusterLayer;
let categoryFilterControl;
let openingHoursControl;
let themeControl;
let sidebar;
const allPlacesByCategory = {}; // All places by category key ("mainCategory.subCategory")

let filterPending = false;

/**
 * Apply the filters once after the next repaint, however often this is called until then.
 * The repaint shows the changed button or checkbox before the (possibly long) update starts.
 */
function scheduleFilters() {
  if (filterPending) { return; }
  filterPending = true;
  document.body.classList.add("is-updating");
  requestAnimationFrame(() => setTimeout(async () => {
    filterPending = false;
    await applyAllFilters();
    document.body.classList.remove("is-updating");
  }, 0));
}

/**
 * Apply the category, diet type and open-now filters: the cluster layer shows the places that pass all of them.
 * Called during the initial load and whenever filters change.
 */
async function applyAllFilters() {
  if (!categoryFilterControl) { return; }

  const enabledDietTypes = categoryFilterControl.getEnabledDietTypes();
  const openNowFilter = openingHoursControl ? openingHoursControl.isEnabled() : false;
  if (openNowFilter) { await openingHoursControl.loadOpeningHoursData(); }
  // Opening hours are checked near the visible area only; places further away stay hidden until the map moves there
  const openNowBounds = openNowFilter ? map.getBounds().pad(0.5) : null;

  const shownPlaces = [];
  Object.entries(allPlacesByCategory).forEach(([key, places]) => {
    const [mainId, subId] = key.split(".");
    if (!categoryFilterControl.isSubCategoryEnabled(mainId, subId)) { return; }
    places.forEach((place) => {
      if (!enabledDietTypes.includes(place.dietType)) { return; }
      // Open-now filter: only places that are open (closed or without opening hours are hidden)
      if (openNowFilter && !(openNowBounds.contains(place.getLatLng()) && openingHoursControl.isOpen(place.feature) === true)) { return; }
      shownPlaces.push(place);
    });
  });
  // Without the open-now filter, the shown places depend only on the filter settings, so their index can be reused
  const cacheKey = openNowFilter ? undefined : `${enabledDietTypes.join()}|${JSON.stringify(categoryFilterControl.getCategoryStates())}`;
  clusterLayer.setPlaces(shownPlaces, cacheKey);

  updateFilterCounts();
  sidebar?.refresh();
}

function updateFilterCounts() {
  if (!categoryFilterControl) { return; }
  const enabledDietTypes = categoryFilterControl.getEnabledDietTypes();
  const enabledCategories = categoryFilterControl.getCategoryStates();
  const categoryCounts = {};
  const dietCounts = {};
  DIET_TYPES.forEach((key) => { dietCounts[key] = 0; });
  let totalVisible = 0;
  let totalMarkers = 0;

  Object.entries(allPlacesByCategory).forEach(([key, places]) => {
    const [mainId, subId] = key.split(".");
    const isCategoryEnabled = enabledCategories[`${mainId}_${subId}`] !== false;

    places.forEach((place) => {
      totalMarkers += 1;

      // Category counts: count only if diet type is enabled
      if (enabledDietTypes.includes(place.dietType)) {
        categoryCounts[mainId] = (categoryCounts[mainId] || 0) + 1;
        categoryCounts[`${mainId}_${subId}`] = (categoryCounts[`${mainId}_${subId}`] || 0) + 1;
      }

      // Diet counts: count if category is enabled (regardless of diet filter state)
      // This shows how many would be visible if that diet type was enabled
      if (isCategoryEnabled && place.dietType) {
        dietCounts[place.dietType] = (dietCounts[place.dietType] || 0) + 1;
      }

      // Count visible markers for counter (both filters active)
      const isVisible = isCategoryEnabled && enabledDietTypes.includes(place.dietType);
      if (isVisible) {
        totalVisible += 1;
      }
    });
  });

  categoryFilterControl.setCategoryCounts(categoryCounts);
  Object.entries(dietCounts).forEach(([dietKey, count]) => {
    categoryFilterControl.updateDietCount(dietKey, count);
  });

  // Update marker counter
  const viewportCount = map ? clusterLayer.getPlacesInBounds(map.getBounds()).length : 0;
  categoryFilterControl.updateMarkerCounter(totalVisible, totalMarkers, viewportCount);
}

async function veggiemap() {
  // Load language resources first so translations are available for controls
  await addLanguageResources(getUserLanguage());
  initUpdateCheck(t);

  // Replace Leaflet's default marker assets with inline SVG data URIs
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    iconUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    shadowUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2712%27%3E%3Cellipse%20cx%3D%2714%27%20cy%3D%276%27%20rx%3D%2710%27%20ry%3D%275%27%20fill%3D%27rgba%280%2C0%2C0%2C0.25%29%27/%3E%3C/svg%3E"
  });

  // Tile Layer (CSS filter handles dark mode styling)
  const osmLayer = new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: __MAP_MAX_ZOOM__,
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
  });

  // Map
  map = new Map("map", {
    center: __MAP_CENTER__,
    zoom: __MAP_ZOOM__,
    worldCopyJump: true,
    zoomControl: false,
    layers: [osmLayer]
  });

  // Add zoom control
  new Control.Zoom({ position: "topright" }).addTo(map);

  // Clustered place markers
  clusterLayer = new PlaceClusterLayer(map, {
    maxZoom: __MAP_MAX_ZOOM__,
    radiusForZoom: clusterRadiusForZoom,
    createMarker: createPlaceMarker,
    clusterLabel: count => t("cluster_label").replace("{count}", count.toLocaleString())
  });

  // Capture marker permalink before map movements overwrite it
  const pendingMarkerHash = parseMarkerHash();

  // Show the info box during initial loading so progress stays visible
  // Skip if a marker permalink is active — the popup will open instead
  initDialog(document.getElementById("info-overlay"), document.getElementById("information"), {
    close: closeInfo,
    getLabelElement: () => document.getElementById("content-welcome-heading")
  });
  initInfoTutorials();
  if (!pendingMarkerHash) { showInfoOnStartup(); }

  // Load the places and put them on the map
  veggiemapPopulate(pendingMarkerHash);

  // Add hash to the url
  const { syncHash } = createMapHash(map);

  // Fullscreen control (its button is hidden; the menu toggles it)
  document.fullscreenControl = new FullScreen({
    position: "topright",
    fullscreenElement: map.getContainer().parentNode
  });
  document.fullscreenControl.addTo(map);
  document.fullscreenControl.getContainer().hidden = true;

  // Place search (moved into the sidebar's search card)
  const geocoder = addGeocoder(map, () => sidebar?.getViewOffset() ?? [0, 0]);

  // Add button to search own position
  document.locateControl = new LocateControl({
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  });
  document.locateControl.addTo(map);

  // Add opening hours control (filter for open places)
  openingHoursControl = new OpeningHoursControl({
    position: "topright"
  });
  openingHoursControl.addTo(map);
  openingHoursControl.onChange(scheduleFilters);

  // Add theme control
  const customThemes = {
    ...DEFAULT_THEMES,
    dark: {
      ...DEFAULT_THEMES.dark,
      filter: "invert(1) hue-rotate(200deg) saturate(0.9) brightness(0.9)"
    }
  };

  themeControl = new ThemeControl({
    position: "topright",
    themes: customThemes,
    defaultTheme: "light",
    detectSystemTheme: true,
    storageKey: "veggiekarte-theme",
    enableEditor: true,
    getLabel: themeKey => t(`themes.${themeKey}`),
    getEditorLabels: (key) => {
      // Map close to generic words_close
      if (key === "close") {
        return t("words_close");
      }
      return t(`themeEditor.${key}`);
    }
  }).addTo(map);

  // Make themeControl globally accessible for language updates
  window.themeControl = themeControl;

  // Menu with language, information, fullscreen and statistics
  new MenuControl({ position: "topright", fullscreenControl: document.fullscreenControl }).addTo(map);

  // Add category filter control
  categoryFilterControl = new CategoryFilterControl({
    position: "topright",
    collapsed: true
  });
  categoryFilterControl.addTo(map);
  categoryFilterControl.onChange(scheduleFilters);

  initDialog(document.getElementById("category-filter-overlay"), document.getElementById("category-filter-modal"), {
    close: () => document.toggleCategoryFilter(),
    getLabelElement: () => document.querySelector(".category-filter-title")
  });

  // The viewport count in the filter dialog is only updated while the dialog is open
  const toggleCategoryFilter = document.toggleCategoryFilter;
  document.toggleCategoryFilter = () => {
    toggleCategoryFilter();
    if (categoryFilterControl.isPanelVisible()) { updateFilterCounts(); }
  };

  // The quick filters in the sidebar replace the buttons of these controls; their dialogs stay
  openingHoursControl.getContainer().hidden = true;
  categoryFilterControl.getContainer().hidden = true;

  sidebar = new Sidebar({
    map,
    clusterLayer,
    geocoder,
    categoryFilterControl,
    openingHoursControl,
    onClosePlace: syncHash
  });
  setPlaceClickHandler(place => sidebar.showPlace(place));

  // Add scale control
  new Control.Scale().addTo(map);

  // The open-now filter covers the area around the view, so it follows the map
  // (crossing its minimum zoom level is handled by the control's own zoomend callback)
  map.on("moveend", () => {
    if (openingHoursControl.isEnabled()) { scheduleFilters(); }
    if (categoryFilterControl.isPanelVisible()) { updateFilterCounts(); }
  });

  // Inject Nominatim data into the popup once it opens
  map.on("popupopen", (evt) => {
    const popupElement = evt.popup.getElement();
    if (!popupElement) { return; }
    // Set aria-label on popup close button
    const closeButton = popupElement.querySelector(".leaflet-popup-close-button");
    if (closeButton) {
      closeButton.setAttribute("aria-label", t("words_close"));
    }
    const marker = evt.popup._source; // Marker that owns the popup
    if (marker?.feature) {
      const { _type: type, _id: id } = marker.feature.properties;
      setMarkerHash(type, id);
      addNominatimInformation(marker, popupElement);
    }
  });

  // Restore map position hash when popup closes
  map.on("popupclose", () => { syncHash(); });
}

/** Find a place by OSM type + id, center the map and show its details. */
function openPlaceByTypeId(type, id) {
  const strId = String(id);
  for (const places of Object.values(allPlacesByCategory)) {
    for (const place of places) {
      const props = place.feature.properties;
      if (props._type === type && String(props._id) === strId) {
        map.setView(place.getLatLng(), 16);
        sidebar.showPlace(place);
        return;
      }
    }
  }
}

/**
 * Populate the map with vegetarian/vegan places from GeoJSON data.
 *
 * The progress bar shows the data loading (0-50%) and finishes once the places are clustered and shown.
 *
 * @param {{type: string, id: string}|null} pendingMarkerHash - Parsed permalink hash to open on load, or null
 */
async function veggiemapPopulate(pendingMarkerHash = null) {
  progress.start();

  const url = new URL("data/places.min.json", window.location.href);
  const response = await fetch(url);
  if (response.status === 404) {
    progress.finish();
    return;
  }

  const geojson = await response.json();
  progress.setPercent(50);

  const [placeGroups, date] = geojsonToPlaceGroups(geojson);
  distributePlacesByCategory(Object.values(placeGroups).flat());

  // Add diet filters in order from least to most vegan
  const dietOrder = __INCLUDE_VEGETARIAN__
    ? ["vegetarian_friendly", "vegan_limited", "vegan_friendly", "vegetarian_only", "vegan_only"]
    : ["vegan_limited", "vegan_friendly", "vegetarian_only", "vegan_only"];

  dietOrder.forEach((dietKey) => {
    const places = placeGroups[dietKey] || [];
    const labelHtml = `<div class='first-cell ${dietKey}'></div>`;
    categoryFilterControl.addDietFilter({
      dietKey,
      labelHtml,
      count: places.length,
      onToggle: scheduleFilters
    });
  });

  /* eslint-disable-next-line require-atomic-updates */
  window.categoryFilterControl = categoryFilterControl;
  statPopulate(placeGroups, date);

  // Store data timestamp for language switching
  if (date) {
    // eslint-disable-next-line require-atomic-updates
    window._veggiekarteDataDate = date;
  }
  // Display data timestamp in info box
  const dataDateElement = document.getElementById("content-data-date");
  if (dataDateElement && date) {
    dataDateElement.textContent = `${t("texts_data_date")}: ${date}`;
  }

  // Let the progress bar paint before the places are clustered
  setTimeout(async () => {
    await applyAllFilters();
    progress.finish();

    // Open place from permalink hash if present
    if (pendingMarkerHash) { openPlaceByTypeId(pendingMarkerHash.type, pendingMarkerHash.id); }
  }, 0);
}

function distributePlacesByCategory(places) {
  const categoryCounts = {};
  const dietCounts = {};

  places.forEach((place) => {
    if (!place.categoryInfo) { return; }
    const { mainCategory, subCategory } = place.categoryInfo;
    if (!CATEGORY_HIERARCHY[mainCategory]?.subcategories[subCategory]) { return; }
    const key = `${mainCategory}.${subCategory}`;
    if (!allPlacesByCategory[key]) { allPlacesByCategory[key] = []; }
    allPlacesByCategory[key].push(place);
    categoryCounts[mainCategory] = (categoryCounts[mainCategory] || 0) + 1;
    categoryCounts[`${mainCategory}_${subCategory}`] = (categoryCounts[`${mainCategory}_${subCategory}`] || 0) + 1;
    if (place.dietType) { dietCounts[place.dietType] = (dietCounts[place.dietType] || 0) + 1; }
  });
  if (categoryFilterControl) { categoryFilterControl.setCategoryCounts(categoryCounts); }
  Object.entries(dietCounts).forEach(([dietKey, count]) => {
    if (categoryFilterControl) { categoryFilterControl.updateDietCount(dietKey, count); }
  });
}

veggiemap();
