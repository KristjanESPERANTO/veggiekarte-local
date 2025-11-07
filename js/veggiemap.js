/* eslint-disable camelcase */

import * as L from "leaflet";
import { addLanguageResources, getUserLanguage, setUserLanguage } from "./i18n.js";
import { addNominatimInformation, calculatePopup } from "./popup.js";
import { langObject, languageSelector } from "../third-party/leaflet.languageselector/leaflet.languageselector.esm.js";
import { FullScreen } from "../third-party/leaflet.fullscreen/Control.FullScreen.esm.js";
import { Geocoder } from "../third-party/leaflet.control.geocoder/Control.Geocoder.modern.js";
import { InfoButton } from "./info-button-control.js";
import { LocateControl } from "../third-party/leaflet.locatecontrol/L.Control.Locate.esm.patched.js";
import { MarkerClusterGroup } from "@kristjan.esperanto/leaflet.markercluster";
import { SubGroup } from "./subgroup.js";
import { createHash } from "../third-party/leaflet.hash/leaflet-hash.mjs";
import getIcon from "./veggiemap-icons.js";

// Expose L globally for any remaining global dependencies
window.L = L;

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
const vegetarianFriendly = new SubGroup(parentGroup);
const subgroups = {
  vegan_only: veganOnly,
  vegetarian_only: vegetarianOnly,
  vegan_friendly: veganFriendly,
  vegan_limited: veganLimited,
  vegetarian_friendly: vegetarianFriendly
};

let map;
let layerControl;
let languageControl;

/**
                                                                                                                                                                     * Update the progress indicator during chunked marker loading
 * @param {number} processed - Number of processed markers
 * @param {number} total - Total number of markers being added
 */
function updateProgressBar(processed, total) {
  const progressElement = document.getElementById("progress");
  if (progressElement) {
    if (processed < total) {
      // Show progress
      const percent = Math.round((processed / total) * 100);
      progressElement.style.display = "block";
      progressElement.textContent = `${percent}% (${processed}/${total})`;
    }
    else {
      // Hide when complete
      setTimeout(() => {
        progressElement.style.display = "none";
      }, 500);
    }
  }
}

function veggiemap() {
  // Fix default icon path for Leaflet 2.0
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "node_modules/leaflet/dist/images/marker-icon-2x.png",
    iconUrl: "node_modules/leaflet/dist/images/marker-icon.png",
    shadowUrl: "node_modules/leaflet/dist/images/marker-shadow.png"
  });

  // Map
  map = new L.Map("map", {
    center: [20, 17],
    zoom: 3,
    worldCopyJump: true,
    zoomControl: false
  });

  // TileLayer
  new L.TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
  }).addTo(map);

  // Add zoom control
  new L.Control.Zoom({ position: "topright" }).addTo(map);

  // Define overlays (each marker group gets a layer) + add legend to the description
  const overlays = {
    "<div class='legend-row'><div class='first-cell vegan_only'></div><div class='second-cell'></div><div class='third-cell' id='n_vegan_only'></div></div>": veganOnly,
    "<div class='legend-row'><div class='first-cell vegetarian_only'></div><div class='second-cell'></div><div class='third-cell' id='n_vegetarian_only'></div></div>":
      vegetarianOnly,
    "<div class='legend-row'><div class='first-cell vegan_friendly'></div><div class='second-cell'></div><div class='third-cell' id='n_vegan_friendly'></div></div>": veganFriendly,
    "<div class='legend-row'><div class='first-cell vegan_limited'></div><div class='second-cell'></div><div class='third-cell' id='n_vegan_limited'></div></div>": veganLimited,
    "<div class='legend-row'><div class='first-cell vegetarian_friendly'></div><div class='second-cell'></div><div class='third-cell' id='n_vegetarian_friendly'></div></div>":
      vegetarianFriendly
  };

  // Add layer control (we will move it to be last in top-right after other controls are added)
  layerControl = new L.Control.Layers(null, overlays, { position: "topright" });
  layerControl.addTo(map);

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  // Load the places and put them on the map
  veggiemapPopulate(parentGroup);

  // Add hash to the url
  // eslint-disable-next-line no-unused-vars
  const hash = createHash(map);

  // Add fullscreen control button
  document.fullscreenControl = new FullScreen({
    position: "topright",
    fullscreenElement: map.getContainer().parentNode
  });
  document.fullscreenControl.addTo(map);

  // Add info button
  new InfoButton({
    position: "topright",
    onClick: () => toggleInfo(),
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
      langObject("ca", "ca - Català", "./third-party/leaflet.languageselector/images/ca.svg"),
      langObject("de", "de - Deutsch", "./third-party/leaflet.languageselector/images/de.svg"),
      langObject("en", "en - English", "./third-party/leaflet.languageselector/images/en.svg"),
      langObject("eo", "eo - Esperanto", "./third-party/leaflet.languageselector/images/eo.svg"),
      langObject("es", "es - Español", "./third-party/leaflet.languageselector/images/es.svg"),
      langObject("fi", "fi - suomi", "./third-party/leaflet.languageselector/images/fi.svg"),
      langObject("fr", "fr - Français", "./third-party/leaflet.languageselector/images/fr.svg"),
      langObject("it", "it - Italiano", "./third-party/leaflet.languageselector/images/it.svg"),
      langObject("ko", "ko - 한국어", "./third-party/leaflet.languageselector/images/ko.svg"),
      langObject("ru", "ru - Русский", "./third-party/leaflet.languageselector/images/ru.svg")
    ],
    callback: setUserLanguage,
    initialLanguage: getUserLanguage(),
    vertical: false,
    button: true
  });
  languageControl.addTo(map);

  // Ensure Layers control is last in the top-right stack
  const topRightCorner = map._controlCorners && map._controlCorners.topright;
  if (topRightCorner && layerControl && layerControl._container) {
    topRightCorner.appendChild(layerControl._container);
  }

  // Add scale control
  new L.Control.Scale().addTo(map);

  // Inject Nominatim data into the popup once it opens
  map.on("popupopen", (evt) => {
    const popupElement = evt.popup.getElement();
    if (!popupElement) { return; }
    const marker = evt.popup._source; // Marker that owns the popup
    if (marker) { addNominatimInformation(marker, popupElement); }
  });
}
// Function to toggle the visibility of the Info box.
function toggleInfo() {
  const element = document.getElementById("information"); // Get the element of the information window
  const computedStyle = window.getComputedStyle(element); // Get the actual style information
  if (computedStyle.display === "block") {
    element.style.display = "none";
  }
  else {
    element.style.display = "block";
  }
}
document.toggleInfo = toggleInfo;

// Function to hide the spinner.
function hideSpinner() {
  const element = document.getElementById("spinner");
  element.style.display = "none";
}

/**
 * Function to detect the number of markers for each category and
 * add them to the Layer Control.
 *
 * @param {object} markerGroups The marker groups.
 * @param {string} date The date when the data was queried.
 */
function statPopulate(markerGroups, date) {
  // Get all categories
  const markerGroupCategories = Object.keys(markerGroups);
  // Go through the list of categories
  for (let i = 0; i < markerGroupCategories.length; i += 1) {
    // Get the name
    const categoryName = markerGroupCategories[i];
    // Get the number of the markers
    const markerNumber = markerGroups[categoryName].length;
    // Add the number to the category entry in the Layer Control
    const el = document.getElementById(`n_${categoryName}`);
    if (el) { el.innerHTML = `(${markerNumber})`; }
  }
  // Add the date to the Layer Control
  const lastEntryEl = document.getElementById("n_vegetarian_friendly");
  if (lastEntryEl && lastEntryEl.parentNode && lastEntryEl.parentNode.parentNode) {
    lastEntryEl.parentNode.parentNode.innerHTML += `<br><div>(${date})</div>`;
  }
}

// Function to get the information from the places json file.
async function veggiemapPopulate(parentGroupVar) {
  // Initiate translations (To have a text in the info box at the first start.)
  addLanguageResources(getUserLanguage());

  const url = new URL("data/places.min.json", window.location.href);
  const response = await fetch(url);

  if (response.status === 404) {
    console.error(`Couldn't load data from ${url.href}.`);
    return;
  }

  const geojson = await response.json();
  const markerGroupsAndDate = geojsonToMarkerGroups(geojson);
  const markerGroups = markerGroupsAndDate[0];
  const date = markerGroupsAndDate[1];

  Object.entries(subgroups).forEach(([key, subgroup]) => {
    // Add subgroup to map first, so batch-adding uses parentGroup.addLayers
    map.addLayer(subgroup);
    // Directly add all markers (no wrapper LayerGroup needed)
    subgroup.addLayers(markerGroups[key]);
  });

  // Reveal all the markers and clusters on the map in one go
  map.addLayer(parentGroupVar);

  // Call the function to put the numbers into the legend
  statPopulate(markerGroups, date);

  // Hide spinner
  hideSpinner();

  // Second call of the translation
  // The legend would not be translated without the second call.
  // TODO: Figure out how to get by without the second call.
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

  const marker = new L.Marker(eLatLon, { icon: getIcon(eIco, eCat) });
  marker.feature = feature;
  // Bind lazily-evaluated popup/tooltip at creation time so it also works with chunkedLoading
  marker.bindPopup(calculatePopup, {
    // Widen popup a bit compared to Leaflet default (300px)
    minWidth: 300,
    maxWidth: 520,
    autoPanPadding: [16, 16]
  });
  marker.bindTooltip(calculateTooltip);
  return marker;
}

// Calculate tooltip content for a given marker layer
function calculateTooltip(layer) {
  const feature = layer.feature;
  const eSym = feature.properties.symbol;
  const eNam = feature.properties.name;
  return `${eSym} ${eNam}`;
}

// Main function
veggiemap();
