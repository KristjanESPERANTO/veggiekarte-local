/* eslint-disable camelcase */
/* global i18next, L, opening_hours */

import "../third-party/opening_hours/opening_hours+deps.min.js";
import "../third-party/leaflet/leaflet.js";
import "../third-party/leaflet.control.geocoder/Control.Geocoder.js";
import "../third-party/leaflet.locatecontrol/L.Control.Locate.min.js";
import "../third-party/leaflet.easybutton/easy-button.js";
import "../third-party/leaflet.featuregroup.subgroup/leaflet.featuregroup.subgroup.js";
import "../third-party/leaflet.fullscreen/Control.FullScreen.js";
import "../third-party/leaflet.languageselector/leaflet.languageselector.js";

import { addLanguageResources, getUserLanguage, setUserLanguage } from "./i18n.js";
import { MarkerClusterGroup } from "../third-party/leaflet.markercluster/leaflet.markercluster-esm.js";
import { createHash } from "../third-party/leaflet.hash/leaflet-hash.mjs";
import getIcon from "./veggiemap-icons.js";

// Define marker groups
const parentGroup = new MarkerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20
});
const veganOnly = L.featureGroup.subGroup(parentGroup, {});
const vegetarianOnly = L.featureGroup.subGroup(parentGroup, {});
const veganFriendly = L.featureGroup.subGroup(parentGroup, {});
const veganLimited = L.featureGroup.subGroup(parentGroup, {});
const vegetarianFriendly = L.featureGroup.subGroup(parentGroup, {});
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
    fullscreenElement: map._container.parentNode
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
      L.langObject("de", "de - Deutsch", "./third-party/leaflet.languageselector/images/de.svg"),
      L.langObject("en", "en - English", "./third-party/leaflet.languageselector/images/en.svg"),
      L.langObject("eo", "eo - Esperanto", "./third-party/leaflet.languageselector/images/eo.svg"),
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
  lastEntry.innerHTML += `<br /><div>(${date})</div>`;
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
    if (!groups[eCat]) groups[eCat] = [];
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

/**
 * Check if there is an entry for a place (feature) on https://lib.reviews/.
 * @param  {Object} feature
 */
async function addLibReview(element) {
  const url = `https://lib.reviews/api/thing?url=https://www.openstreetmap.org/${element.feature.properties._type}/${element.feature.properties._id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("libreviews").innerHTML = `<div class="popupflex-container"><div>📓</div><div><a href="https://lib.reviews/${
      data.thing.urlID
    }" target="_blank" rel="noopener noreferrer">${i18next.t("words.review")}</a></div>`;
  }
  catch {
    console.info("There is no review of this place or lib.reviews isn't available.");
  }
}

// Get information like the address from Nominatim API
async function addNominatimInformation(element) {
  const type = element.feature.properties._type;
  const id = element.feature.properties._id;
  const osmId = type[0] + id;
  const locale = getUserLanguage();
  const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${osmId}&extratags=1&format=json&accept-language=${locale}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data[0].address;

    // Address
    let addressString = "";
    // Collecting address information
    if (address.road !== undefined) {
      addressString += `${address.road} `; // Street
      if (address.house_number !== undefined) {
        addressString += `${address.house_number}`; // House number
      }
      addressString += "<br/>";
    }
    if (address.city !== undefined || address.town !== undefined) {
      if (address.postcode !== undefined) {
        addressString += `${address.postcode} `; // Postcode
      }
      if (address.town === undefined) {
        addressString += `${address.city} `; // City
      }
      else {
        addressString += `${address.town} `; // Town
      }
    }
    if (address.country !== undefined) {
      addressString += `<br/>${address.country}`;
    }

    addressString = `<div class="popupflex-container"><div>📍</div>${addressString}</div>`;

    setTimeout(() => {
      if (addressString !== "") {
        document.getElementById("address").innerHTML = addressString;
      }
    }, 150);
  }
  catch (error) {
    console.info("Can't get information from Nominatim API:", error);
  }
}

// Calculate popup content for a given marker layer
function calculatePopup(element) {
  // Get the information
  const feature = element.feature;
  const eId = feature.properties._id;
  const eNam = feature.properties.name;
  const eTyp = feature.properties._type;
  const eEma = feature.properties.contact_email;
  let ePho = feature.properties.contact_phone;
  const eWeb = feature.properties.contact_website;
  let eFac = feature.properties.contact_facebook;
  let eIns = feature.properties.contact_instagram;
  const eCui = feature.properties.cuisine;
  const eOpe = feature.properties.opening_hours;
  const eSym = feature.properties.symbol;
  const veganDescription = feature.properties.vegan_description;

  let popupContent = `
      <div class='popup-category ${feature.properties.category}'>
        ${i18next.t(`texts.i18n_${feature.properties.category}`)}
      </div>`;

  /** * Building the popup content ** */
  popupContent += `<div class='map-popup-title'>${eSym} ${eNam}`; // Symbol and name

  // OSM link for popup
  const osmUrl = `https://openstreetmap.org/${eTyp}/${eId}`;
  popupContent += `<a href='${osmUrl}' target='_blank' rel='noopener noreferrer'> *</a></div><hr/>`; // OSM link

  // Adding cuisine information to popup
  if (eCui !== undefined) {
    popupContent += `<div class='popupflex-container'><div>👩‍🍳</div><div>${eCui.replaceAll(";", ", ").replaceAll("_", " ")}</div></div>`;
  }

  popupContent += "<div class='popupflex-container' id='address'>&nbsp;</br>&nbsp;</br>&nbsp;</br></div>";

  // Adding opening hours to popup
  if (eOpe !== undefined) {
    // Country: Germany
    const countryCode = "de";
    // State: Sachsen-Anhalt
    const state = "Sachsen-Anhalt";
    // Get browser language for the warnings and the prettifier
    const locale = getUserLanguage();

    // Catch cases where the opening hour string isn't okay
    try {
      // Create opening_hours object
      // eslint-disable-next-line new-cap
      const oh = new opening_hours(
        eOpe,
        {
          address: { country_code: countryCode, state }
        },
        { locale }
      );
      let prettifiedValue = oh.prettifyValue({
        conf: {
          locale,
          rule_sep_string: "<br />",
          print_semicolon: false,
          sep_one_day_between: ", "
        }
      });
      prettifiedValue = prettifiedValue.replaceAll(",", ", ").replaceAll("PH", i18next.t("words.public_holiday")).replaceAll("SH", i18next.t("words.school_holidays"));
      // Find out the open state
      let openState;
      let openStateEmoji;
      if (oh.getState()) {
        openState = i18next.t("words.open");
        openStateEmoji = "open";
        if (!oh.getFutureState()) {
          openState += i18next.t("texts.will close soon");
          openStateEmoji = "closes-soon";
        }
      }
      else {
        openState = i18next.t("words.closed");
        openStateEmoji = "closed";
        if (oh.getFutureState()) {
          openState += i18next.t("texts.will open soon");
          openStateEmoji = "opens-soon";
        }
      }
      // Append opening hours to the popup
      popupContent += `<div class='popupflex-container'><div>🕖</div><div><span class='open-state-circle ${openStateEmoji}'></span>${openState}<br />${prettifiedValue}</div></div>`;
    }
    catch (error) {
      popupContent += `<div class='popupflex-container'><div>🕖</div><div>Error: ${error}</div></div>`;
    }
  }

  // Adding addidtional information to popup
  if (ePho !== undefined) {
    // Split the value for the case that there are more then one phone number
    ePho = ePho.split(";");
    popupContent += `<div class='popupflex-container'><div>☎️</div><div><a href='tel:${ePho[0]}' target='_blank' rel='noopener noreferrer'>${ePho[0]}</a></div></div>`;
    if (ePho[1] !== undefined) {
      popupContent += `<div class='popupflex-container'><div></div><div><a href='tel:${ePho[1]}' target='_blank' rel='noopener noreferrer'>${ePho[1]}</a></div></div>`;
    }
  }
  if (eEma !== undefined) {
    popupContent += `<div class='popupflex-container'><div>📧</div><div><a href='mailto:${eEma}' target='_blank' rel='noopener noreferrer'>${eEma}</a></div></div>`;
  }
  if (eWeb !== undefined) {
    popupContent += `<div class='popupflex-container'><div>🌐</div><div><a href='${eWeb}' target='_blank' rel='noopener noreferrer'>${eWeb.replace(
      "https://",
      ""
    )}</a></div></div>`;
  }
  if (eFac !== undefined) {
    if (!eFac.startsWith("http")) {
      eFac = `https://www.facebook.com/${eFac}`;
    }
    popupContent += `<div class='popupflex-container'><div>🇫</div><div><a href='${eFac}' target='_blank' rel='noopener noreferrer'>${decodeURI(eFac).replace(
      "https://",
      ""
    )}</a></div></div>`;
  }
  if (eIns !== undefined) {
    if (!eIns.startsWith("http")) {
      eIns = `https://www.instagram.com/${eIns}`;
    }
    popupContent += `<div class='popupflex-container'><div>📸</div><div><a href='${eIns}' target='_blank' rel='noopener noreferrer'>${eIns.replace(
      "https://",
      ""
    )}</a></div></div>`;
  }
  if (veganDescription !== undefined) {
    popupContent += `<div class='popupflex-container'><div>🗒️</div>
      <div>${veganDescription}</div></div>`;
  }

  // Add review entry from lib.reviews if exists
  popupContent += "<div id='libreviews'></div>";
  addLibReview(element);

  // Add address information from Nominatim API
  addNominatimInformation(element);

  return popupContent;
}

// Adding function for opening_hours objects to check if place will be open after n minutes (60 minutes as default)
if (!opening_hours.prototype.getFutureState) {
  // eslint-disable-next-line func-names
  opening_hours.prototype.getFutureState = function (minutes = 60) {
    const nowPlusHours = new Date();
    nowPlusHours.setUTCMinutes(nowPlusHours.getUTCMinutes() + minutes);
    return this.getState(nowPlusHours);
  };
}

// Main function
veggiemap();
