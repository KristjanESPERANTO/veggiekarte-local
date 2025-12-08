/* eslint-disable camelcase */
import { CATEGORY_HIERARCHY, getCategoryForIcon } from "./category-mapping.js";
import { Control, Icon, Map, Marker, TileLayer } from "leaflet";
import { InfoButton, openInfo, showInfoOnStartup } from "./info-button-control.js";
import { addLanguageResources, getUserLanguage, setUserLanguage } from "./i18n.js";
import { addNominatimInformation, calculatePopup } from "./popup.js";
import { getIcon, iconToEmoji } from "./veggiemap-icons.js";
import { langObject, languageSelector } from "@kristjan.esperanto/leaflet-language-selector";
import { CategoryFilterControl } from "./category-filter-control.js";
import { FullScreen } from "leaflet.fullscreen";
import { Geocoder } from "leaflet-control-geocoder";
import { LocateControl } from "../third-party/leaflet.locatecontrol/L.Control.Locate.esm.patched.js";
import { MarkerClusterGroup } from "@kristjan.esperanto/leaflet.markercluster";
import { SubGroup } from "./subgroup.js";
import { createMapHash } from "./map-hash.js";

// Define marker groups (using imported MarkerClusterGroup and our SubGroup)
const parentGroup = new MarkerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20,
  // Smooth UI when adding thousands of markers
  chunkedLoading: true,
  chunkProgress: updateProgressBar
});
const veganOnly = new SubGroup(parentGroup);
const vegetarianOnly = new SubGroup(parentGroup);
const veganFriendly = new SubGroup(parentGroup);
const veganLimited = new SubGroup(parentGroup);
const subgroups = {
  vegan_only: veganOnly,
  vegetarian_only: vegetarianOnly,
  vegan_friendly: veganFriendly,
  vegan_limited: veganLimited
};

let map;
let languageControl;
let categoryFilterControl;
const categorySubgroups = {}; // Storage for category-based subgroups
const allMarkersByCategory = {}; // Store all markers by category key for filtering

/**
 * Update the progress indicator during chunked marker loading
 * @param {number} processed - Number of processed markers
 * @param {number} total - Total number of markers being added
 */
let lastProgressPercent = 0;
let progressTimeout;
let progressStarted = false;

function updateProgressBar(processed, total) {
  const el = document.getElementById("progress");
  const bar = document.getElementById("progress-bar");
  if (!el || !bar) { return; }

  // Clear any pending hide
  if (progressTimeout) {
    clearTimeout(progressTimeout);
    progressTimeout = null;
  }

  if (processed < total) {
    // Show immediately on first call
    if (!progressStarted) {
      progressStarted = true;
      lastProgressPercent = 0;
      bar.style.width = "0%";
    }
    el.style.display = "flex";
    const percent = Math.round((processed / total) * 100);
    // Only increase, never decrease
    if (percent > lastProgressPercent) {
      lastProgressPercent = percent;
      bar.style.width = `${percent}%`;
    }
  }
  else {
    progressTimeout = setTimeout(() => {
      el.style.display = "none";
      lastProgressPercent = 0;
      progressStarted = false;
    }, 500);
    updateVisibleCounts();
    updateFilterCounts(subgroups); // Update counts when markers are fully loaded
  }
}

// Function to apply all filters (diet + category)
function applyAllFilters() {
  if (!categoryFilterControl) { return; }

  const enabledDietTypes = categoryFilterControl.getEnabledDietTypes();

  // For each category subgroup, add/remove markers based on filters
  Object.entries(allMarkersByCategory).forEach(([key, markers]) => {
    const [mainId, subId] = key.split(".");
    const isCategoryEnabled = categoryFilterControl.isSubCategoryEnabled(mainId, subId);
    const subgroup = categorySubgroups[key];
    if (!subgroup) { return; }

    // Ensure subgroup is on the map
    if (!map.hasLayer(subgroup)) { map.addLayer(subgroup); }

    // Filter markers: visible if category enabled AND diet type enabled
    const markersToShow = [];
    const markersToHide = [];

    markers.forEach((marker) => {
      const shouldShow = isCategoryEnabled && enabledDietTypes.includes(marker.dietType);
      const isShown = subgroup.hasLayer(marker);
      if (shouldShow && !isShown) { markersToShow.push(marker); }
      else if (!shouldShow && isShown) { markersToHide.push(marker); }
    });

    if (markersToShow.length > 0) { subgroup.addLayers(markersToShow); }
    if (markersToHide.length > 0) { subgroup.removeLayers(markersToHide); }
  });

  updateFilterCounts();
  updateVisibleCounts();
}

/**
 * Count markers in the current viewport
 */
function countMarkersInViewport() {
  if (!map) { return 0; }
  const bounds = map.getBounds();
  let count = 0;

  Object.entries(categorySubgroups).forEach(([, subgroup]) => {
    if (!map.hasLayer(subgroup)) { return; }
    subgroup.eachLayer((layer) => {
      if (typeof layer.getLatLng !== "function") { return; }
      const latlng = layer.getLatLng();
      if (latlng && bounds.contains(latlng)) {
        count += 1;
      }
    });
  });

  return count;
}

function updateFilterCounts() {
  if (!categoryFilterControl) { return; }
  const enabledDietTypes = categoryFilterControl.getEnabledDietTypes();
  const enabledCategories = categoryFilterControl.getCategoryStates();
  const categoryCounts = {};
  const dietCounts = {};
  Object.keys(subgroups).forEach((key) => { dietCounts[key] = 0; });
  let totalVisible = 0;
  let totalMarkers = 0;

  Object.entries(allMarkersByCategory).forEach(([key, markers]) => {
    const [mainId, subId] = key.split(".");
    const isCategoryEnabled = enabledCategories[`${mainId}.${subId}`] !== false;

    markers.forEach((marker) => {
      totalMarkers += 1;

      // Category counts: count only if diet type is enabled
      if (enabledDietTypes.includes(marker.dietType)) {
        categoryCounts[mainId] = (categoryCounts[mainId] || 0) + 1;
        categoryCounts[key] = (categoryCounts[key] || 0) + 1;
      }

      // Diet counts: count if category is enabled (regardless of diet filter state)
      // This shows how many would be visible if that diet type was enabled
      if (isCategoryEnabled && marker.dietType) {
        dietCounts[marker.dietType] = (dietCounts[marker.dietType] || 0) + 1;
      }

      // Count visible markers for counter (both filters active)
      const isVisible = isCategoryEnabled && enabledDietTypes.includes(marker.dietType);
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
  const viewportCount = countMarkersInViewport();
  categoryFilterControl.updateMarkerCounter(totalVisible, totalMarkers, viewportCount);
}

function veggiemap() {
  // Replace Leaflet's default marker assets with inline SVG data URIs
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    iconUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    shadowUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2712%27%3E%3Cellipse%20cx%3D%2714%27%20cy%3D%276%27%20rx%3D%2710%27%20ry%3D%275%27%20fill%3D%27rgba%280%2C0%2C0%2C0.25%29%27/%3E%3C/svg%3E"
  });

  // Map
  map = new Map("map", {
    center: [51.42, 12.0], // Halle (Saale)
    zoom: 11,
    worldCopyJump: true,
    zoomControl: false
  });

  // TileLayer
  new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
  }).addTo(map);

  // Add zoom control
  new Control.Zoom({ position: "topright" }).addTo(map);

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  // Load the places and put them on the map
  veggiemapPopulate(parentGroup);

  // Add hash to the url
  createMapHash(map);

  // Add fullscreen control button
  document.fullscreenControl = new FullScreen({
    position: "topright",
    fullscreenElement: map.getContainer().parentNode
  });
  document.fullscreenControl.addTo(map);

  // Add info button
  new InfoButton({
    position: "topright",
    onClick: () => openInfo(),
    contentHtml: "<div class='info-button'></div>"
  }).addTo(map);

  // Add button for search places
  new Geocoder().addTo(map);

  // Add button to search own position
  document.locateControl = new LocateControl({
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  });
  document.locateControl.addTo(map);

  // Add language selector
  languageControl = languageSelector({
    languages: [
      langObject("ca", "ca - Català"),
      langObject("de", "de - Deutsch"),
      langObject("en", "en - English"),
      langObject("eo", "eo - Esperanto"),
      langObject("es", "es - Español"),
      langObject("fi", "fi - suomi"),
      langObject("fr", "fr - Français"),
      langObject("it", "it - Italiano"),
      langObject("ko", "ko - 한국어"),
      langObject("ru", "ru - Русский")
    ],
    callback: setUserLanguage,
    initialLanguage: getUserLanguage(),
    vertical: false,
    button: true
  });
  languageControl.addTo(map);

  // Add category filter control
  categoryFilterControl = new CategoryFilterControl({
    position: "topright",
    collapsed: true
  });
  categoryFilterControl.addTo(map);
  categoryFilterControl.onChange(() => {
    applyAllFilters();
  });

  // Add scale control
  new Control.Scale().addTo(map);

  map.on("moveend", () => {
    updateVisibleCounts();
    updateFilterCounts();
  });
  map.on("overlayadd", updateVisibleCounts);
  map.on("overlayremove", updateVisibleCounts);

  // Inject Nominatim data into the popup once it opens
  map.on("popupopen", (evt) => {
    const popupElement = evt.popup.getElement();
    if (!popupElement) { return; }
    const marker = evt.popup._source; // Marker that owns the popup
    if (marker) { addNominatimInformation(marker, popupElement); }
  });
}

// Function to hide the spinner.
function hideSpinner() {
  const element = document.getElementById("spinner");
  element.style.display = "none";
}

function statPopulate(markerGroups, date) {
  const markerGroupCategories = Object.keys(markerGroups);
  for (let i = 0; i < markerGroupCategories.length; i += 1) {
    const categoryName = markerGroupCategories[i];
    const markerNumber = markerGroups[categoryName].length;
    const totalElement = document.getElementById(`n_${categoryName}`);
    if (totalElement) { totalElement.textContent = `${markerNumber}`; }
    const visibleElement = document.getElementById(`v_${categoryName}`);
    if (visibleElement) { visibleElement.textContent = "0"; }
  }
  const legendList = document.querySelector(".leaflet-control-layers-overlays");
  if (legendList) {
    let metaEl = legendList.querySelector(".legend-meta");
    if (!metaEl) {
      metaEl = document.createElement("div");
      metaEl.className = "legend-meta";
      legendList.appendChild(metaEl);
    }
    metaEl.textContent = date ? `${date}` : "";
  }
}

function updateVisibleCounts() {
  if (!map) { return; }
  const bounds = map.getBounds();
  Object.entries(categorySubgroups).forEach(([key, subgroup]) => {
    const visibleElement = document.getElementById(`v_${key}`);
    const isActive = map.hasLayer(subgroup);
    let visibleCount = 0;
    if (isActive) {
      subgroup.eachLayer((layer) => {
        if (typeof layer.getLatLng !== "function") { return; }
        const latlng = layer.getLatLng();
        if (latlng && bounds.contains(latlng)) { visibleCount += 1; }
      });
    }
    if (visibleElement) { visibleElement.textContent = isActive ? `${visibleCount}` : "0"; }
  });
}

async function veggiemapPopulate(parentGroupVar) {
  addLanguageResources(getUserLanguage());

  // Show progress bar immediately at 0%
  const progressEl = document.getElementById("progress");
  const progressBar = document.getElementById("progress-bar");
  if (progressEl && progressBar) {
    progressBar.style.width = "0%";
    progressEl.style.display = "flex";
    progressStarted = true;
    lastProgressPercent = 0;
  }

  const url = new URL("data/places.min.json", window.location.href);
  const response = await fetch(url);
  if (response.status === 404) { return; }

  const geojson = await response.json();
  const markerGroupsAndDate = geojsonToMarkerGroups(geojson);
  const markerGroups = markerGroupsAndDate[0];
  const date = markerGroupsAndDate[1];

  initCategorySubgroups();

  // Clear old subgroups
  Object.values(subgroups).forEach((sg) => {
    sg.clearLayers();
    if (map.hasLayer(sg)) { map.removeLayer(sg); }
  });

  // Collect all markers for category distribution
  const allMarkers = [];

  // Collect all markers and organize by diet type
  Object.entries(subgroups).forEach(([key]) => {
    if (markerGroups[key]) {
      markerGroups[key].forEach((marker) => {
        marker.dietType = key;
        allMarkers.push(marker);
      });
    }
  });

  distributeMarkersByCategory(allMarkers);

  // Add diet filters in order from least to most vegan (without vegetarian_friendly for Halle)
  const dietOrder = ["vegan_limited", "vegan_friendly", "vegetarian_only", "vegan_only"];
  dietOrder.forEach((dietKey) => {
    const markers = markerGroups[dietKey] || [];
    const labelHtml = `<div class='first-cell ${dietKey}'></div>`;
    categoryFilterControl.addDietFilter({
      dietKey,
      labelHtml,
      count: markers.length,
      onToggle: () => { applyAllFilters(); }
    });
  });

  /* eslint-disable-next-line require-atomic-updates */
  window.categoryFilterControl = categoryFilterControl;
  map.addLayer(parentGroupVar);
  statPopulate(markerGroups, date);
  updateVisibleCounts();

  // Update counts AFTER diet filters are added to DOM
  // Use setTimeout to ensure DOM is ready
  setTimeout(() => {
    applyAllFilters();
  }, 0);
  hideSpinner();
  showInfoOnStartup();
  addLanguageResources(getUserLanguage());
}

// Process the places GeoJSON into the groups of markers
function geojsonToMarkerGroups(geojson) {
  const date = geojson._timestamp.split(" ")[0];
  const groups = {};
  geojson.features.forEach((feature) => {
    const eCat = feature.properties.category;
    if (!groups[eCat]) { groups[eCat] = []; }
    groups[eCat].push(getMarker(feature));
  });
  return [groups, date];
}

// Function to get the marker.
function getMarker(feature) {
  const eLatLon = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
  const eIco = feature.properties.icon;
  const eCat = feature.properties.category;
  const marker = new Marker(eLatLon, { icon: getIcon(eIco, eCat) });
  marker.feature = feature;
  marker.categoryInfo = getCategoryForIcon(eIco);
  marker.bindPopup(calculatePopup, { minWidth: 300, maxWidth: 520, autoPanPadding: [16, 16] });
  marker.bindTooltip(calculateTooltip);
  return marker;
}

function initCategorySubgroups() {
  Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
    Object.entries(mainCat.subcategories).forEach(([subId]) => {
      const key = `${mainId}.${subId}`;
      categorySubgroups[key] = new SubGroup(parentGroup);
    });
  });
}

function distributeMarkersByCategory(markers) {
  const categoryCounts = {};
  const dietCounts = {};

  markers.forEach((marker) => {
    if (!marker.categoryInfo) { return; }
    const { mainCategory, subCategory } = marker.categoryInfo;
    const key = `${mainCategory}.${subCategory}`;
    const dietType = marker.dietType;

    if (categorySubgroups[key]) {
      if (!allMarkersByCategory[key]) { allMarkersByCategory[key] = []; }
      allMarkersByCategory[key].push(marker);
      categoryCounts[mainCategory] = (categoryCounts[mainCategory] || 0) + 1;
      categoryCounts[key] = (categoryCounts[key] || 0) + 1;
      if (dietType) { dietCounts[dietType] = (dietCounts[dietType] || 0) + 1; }
    }
  });
  if (categoryFilterControl) { categoryFilterControl.setCategoryCounts(categoryCounts); }
  Object.entries(dietCounts).forEach(([dietKey, count]) => {
    if (categoryFilterControl) { categoryFilterControl.updateDietCount(dietKey, count); }
  });
}

function calculateTooltip(layer) {
  const feature = layer.feature;
  const eIco = feature.properties.icon;
  return `${iconToEmoji[eIco] || ""} ${feature.properties.name}`;
}

veggiemap();
