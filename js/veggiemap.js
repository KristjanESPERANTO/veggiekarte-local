/* eslint-disable camelcase */
/* global L */

// Leaflet 2.0, polyfill, and main plugins are loaded globally via index.html
// Only additional plugins and app modules are loaded here
import "../third-party/leaflet.control.geocoder/Control.Geocoder.js";
import "../third-party/leaflet.locatecontrol/L.Control.Locate.min.js";
import "../third-party/leaflet.easybutton/easy-button.js";
import "../third-party/leaflet.fullscreen/Control.FullScreen.js";
import "../third-party/leaflet.languageselector/leaflet.languageselector.js";

import { addLanguageResources, getUserLanguage, setUserLanguage } from "./i18n.js";
import { addNominatimInformation, calculatePopup } from "./popup.js";
import { createHash } from "../third-party/leaflet.hash/leaflet-hash.mjs";
import getIcon from "./veggiemap-icons.js";

// Define marker groups (using global L.markerClusterGroup and L.featureGroup.subGroup)
const parentGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20
});
const veganOnly = L.featureGroup.subGroup(parentGroup);
const vegetarianOnly = L.featureGroup.subGroup(parentGroup);
const veganFriendly = L.featureGroup.subGroup(parentGroup);
const veganLimited = L.featureGroup.subGroup(parentGroup);
const vegetarianFriendly = L.featureGroup.subGroup(parentGroup);
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

function veggiemap() {
  // Map
  map = L.map("map", {
    center: [20, 17],
    zoom: 3,
    worldCopyJump: true,
    zoomControl: false
  });

  // TileLayer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
  }).addTo(map);

  // Add zoom control
  L.control.zoom({ position: "topright" }).addTo(map);

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
  // eslint-disable-next-line new-cap
  document.fullscreenControl = new L.control.fullscreen({
    position: "topright",
    fullscreenElement: map.getContainer().parentNode
  });
  document.fullscreenControl.addTo(map);

  // Add info button
  const infoButton = L.easyButton("<div class='info-button'></div>", () => {
    toggleInfo();
  }).addTo(map);
  infoButton.setPosition("topright");

  // Add button for search places
  L.Control.geocoder().addTo(map);

  // Add button to search own position
  document.locateControl = L.control.locate({
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  });
  document.locateControl.addTo(map);

  // Add language control button
  languageControl = L.languageSelector({
    languages: [
      L.langObject("ca", "ca - Català", "./third-party/leaflet.languageselector/images/ca.svg"),
      L.langObject("de", "de - Deutsch", "./third-party/leaflet.languageselector/images/de.svg"),
      L.langObject("en", "en - English", "./third-party/leaflet.languageselector/images/en.svg"),
      L.langObject("eo", "eo - Esperanto", "./third-party/leaflet.languageselector/images/eo.svg"),
      L.langObject("es", "es - Español", "./third-party/leaflet.languageselector/images/es.svg"),
      L.langObject("fi", "fi - suomi", "./third-party/leaflet.languageselector/images/fi.svg"),
      L.langObject("fr", "fr - Français", "./third-party/leaflet.languageselector/images/fr.svg"),
      L.langObject("it", "it - Italiano", "./third-party/leaflet.languageselector/images/it.svg"),
      L.langObject("ko", "ko - 한국어", "./third-party/leaflet.languageselector/images/ko.svg"),
      L.langObject("ru", "ru - Русский", "./third-party/leaflet.languageselector/images/ru.svg")
    ],
    callback: setUserLanguage,
    initialLanguage: getUserLanguage(),
    vertical: false,
    button: true
  });
  languageControl.addTo(map);

  // Add layer control button
  layerControl = L.control.layers(null, overlays);
  layerControl.addTo(map);

  // Add scale control
  L.control.scale().addTo(map);

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
    document.getElementById(`n_${categoryName}`).innerHTML = `(${markerNumber})`;
  }
  // Add the date to the Layer Control
  const lastEntry = document.getElementById("n_vegetarian_friendly").parentNode.parentNode;
  lastEntry.innerHTML += `<br><div>(${date})</div>`;
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
    // Bulk add all the markers from a markerGroup to a subgroup in one go
    // Source: https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/issues/5
    subgroup.addLayer(L.layerGroup(markerGroups[key]));
    map.addLayer(subgroup);
  });

  // Reveal all the markers and clusters on the map in one go
  map.addLayer(parentGroupVar);

  // Call the function to put the numbers into the legend
  statPopulate(markerGroups, date);

  // Enable the on-demand popup and tooltip calculation
  parentGroup.eachLayer((layer) => {
    layer.bindPopup(calculatePopup);
    layer.bindTooltip(calculateTooltip);
  });

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

  const marker = L.marker(eLatLon, { icon: getIcon(eIco, eCat) });
  marker.feature = feature;
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
