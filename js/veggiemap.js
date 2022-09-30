/* global i18next, L, opening_hours */

import { getIcon } from "./veggiemap-icons.js";
import {
  setUserLanguage,
  getUserLanguage,
  addLanguageRecources
} from "./i18n.js";

// Define marker groups
const parentGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20
});
const veganOnly = L.featureGroup.subGroup(parentGroup, {});
const vegetarianOnly = L.featureGroup.subGroup(parentGroup, {});
const veganFriendly = L.featureGroup.subGroup(parentGroup, {});
const veganLimited = L.featureGroup.subGroup(parentGroup, {});
const subgroups = {
  vegan_only: veganOnly,
  vegetarian_only: vegetarianOnly,
  vegan_friendly: veganFriendly,
  vegan_limited: veganLimited
};

let map;
let layerControl;
let languageControl;

function veggiemap() {
  // Map
  map = L.map("map", {
    center: [51.42, 12.0],
    zoom: 11,
    worldCopyJump: true,
    zoomControl: false
  });

  // TileLayer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
  }).addTo(map);

  // Add zoom control
  L.control.zoom({ position: "topright" }).addTo(map);

  // Define overlays (each marker group gets a layer) + add legend to the description
  const overlays = {
    "<div class='legendRow'><div class='firstCell vegan_only'></div><div class='secondCell'></div><div class='thirdCell' id='n_vegan_only'></div></div>":
      veganOnly,
    "<div class='legendRow'><div class='firstCell vegetarian_only'></div><div class='secondCell'></div><div class='thirdCell' id='n_vegetarian_only'></div></div>":
      vegetarianOnly,
    "<div class='legendRow'><div class='firstCell vegan_friendly'></div><div class='secondCell'></div><div class='thirdCell' id='n_vegan_friendly'></div></div>":
      veganFriendly,
    "<div class='legendRow'><div class='firstCell vegan_limited'></div><div class='secondCell'></div><div class='thirdCell' id='n_vegan_limited'></div></div>":
      veganLimited
  };

  // Enable the on-demand popup and tooltip calculation
  parentGroup.bindPopup(calculatePopup);
  parentGroup.bindTooltip(calculateTooltip);

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  veggiemapPopulate(parentGroup);

  // Add hash to the url
  // eslint-disable-next-line no-unused-vars
  const hash = new L.Hash(map);

  // Add fullscreen control button
  // eslint-disable-next-line new-cap
  document.fullscreenControl = new L.control.fullscreen({
    position: "topright",
    fullscreenElement: map._container.parentNode
  });
  document.fullscreenControl.addTo(map);

  // Add info button
  const infoButton = L.easyButton('<div class="info-button"></div>', () => {
    toggleInfo();
  }).addTo(map);
  infoButton.setPosition("topright");

  // Add button for search places
  L.Control.geocoder().addTo(map);

  // Add button to search own position
  document.locateControl = L.control.locate({
    icon: "locate_icon",
    iconLoading: "loading_icon",
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  });
  document.locateControl.addTo(map);

  // Add language control button
  languageControl = L.languageSelector({
    languages: [
      L.langObject(
        "de",
        "de - Deutsch",
        "./third-party/leaflet.languageselector/images/de.svg"
      ),
      L.langObject(
        "en",
        "en - English",
        "./third-party/leaflet.languageselector/images/en.svg"
      ),
      L.langObject(
        "eo",
        "eo - Esperanto",
        "./third-party/leaflet.languageselector/images/eo.svg"
      ),
      L.langObject(
        "fi",
        "fi - suomi",
        "./third-party/leaflet.languageselector/images/fi.svg"
      ),
      L.langObject(
        "fr",
        "fr - Français",
        "./third-party/leaflet.languageselector/images/fr.svg"
      )
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

// Function to toogle the visibility of the Info box.
function toggleInfo() {
  const element = document.getElementById("information"); // get the element of the information window
  const computedStyle = window.getComputedStyle(element); // get the actual style information
  if (computedStyle.display !== "block") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
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
    document.getElementById(
      `n_${categoryName}`
    ).innerHTML = `(${markerNumber})`;
  }
  // Add the date to the Layer Control
  const lastEntry =
    document.getElementById("n_vegan_limited").parentNode.parentNode;
  lastEntry.innerHTML += `<br /><div>(${date})</div>`;
}

// Function to get the information from the places json file.
function veggiemapPopulate(parentGroupVar) {
  const url = "data/places.min.json";
  fetch(url)
    .then((response) => response.json())
    .then((geojson) => geojsonToMarkerGroups(geojson))
    .then((markerGroupsAndDate) => {
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

      // Check if the data entries are complete
      checkData(parentGroupVar);

      // Hide spinner
      hideSpinner();

      // Initiate translations
      addLanguageRecources(getUserLanguage());
    })
    .catch((error) => {
      console.error("Request failed", error);
    });
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
  const eLatLon = [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0]
  ];
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
function addLibReview(feature) {
  const url = `https://lib.reviews/api/thing?url=https://www.openstreetmap.org/${feature.properties._type}/${feature.properties._id}`;
  fetch(url)
    .then((response) => response.json())
    .then(
      // eslint-disable-next-line no-return-assign
      (data) =>
        (document.getElementById(
          "libreviews"
        ).innerHTML = `<div class="popupflex-container"><div>📓</div><div><a href="https://lib.reviews/${
          data.thing.urlID
        }" target="_blank" rel="noopener noreferrer">${i18next.t(
          "words.review"
        )}</a></div>`)
    )
    .catch(() => {
      console.info(
        "There is no review of this place or lib.reviews isn't available."
      );
    });
}

// Calculate popup content for a given marker layer
function calculatePopup(layer) {
  // Get the information
  const feature = layer.feature;
  const eId = feature.properties._id;
  const eNam = feature.properties.name;
  const eTyp = feature.properties._type;
  const eCit = feature.properties.addr_city;
  const ePos = feature.properties.addr_postcode;
  const eStr = feature.properties.addr_street;
  const eEma = feature.properties.contact_email;
  let ePho = feature.properties.contact_phone;
  const eWeb = feature.properties.contact_website;
  const eFac = feature.properties.contact_facebook;
  const eIns = feature.properties.contact_instagram;
  const eCui = feature.properties.cuisine;
  const eInf = feature.properties.more_info;
  const eOpe = feature.properties.opening_hours;
  const eSym = feature.properties.symbol;

  /* Building the popup content */
  let popupContent = `<div class='mapPopupTitle'>${eSym} ${eNam}`; // Symbol and name

  // OSM link for popup
  const osmUrl = `https://openstreetmap.org/${eTyp}/${eId}`;
  popupContent += `<a href='${osmUrl}' target='_blank' rel='noopener noreferrer'> *</a></div><hr/>`; // OSM link

  // Adding cuisine information to popup
  if (eCui !== undefined) {
    popupContent += `<div class='popupflex-container'><div>👩‍🍳</div><div>${eCui
      .replaceAll(";", ", ")
      .replaceAll("_", " ")}</div></div>`;
  }

  // Address
  let eAddr = "";
  // Collecting address information
  if (eStr !== undefined) {
    eAddr += `${eStr}<br/>`;
  } // Street
  if (ePos !== undefined) {
    eAddr += `${ePos} `;
  } // Postcode
  if (eCit !== undefined) {
    eAddr += `${eCit} `;
  } // City
  // if (eCou !== undefined) { eAddr += "<br/>" + eCou } // Country

  // Adding address information to popup
  if (eAddr !== "") {
    popupContent += `<div class='popupflex-container'><div>📍</div><div>${eAddr}</div></div>`;
  }

  // Adding opening hours to popup
  if (eOpe !== undefined) {
    // Country: Germany
    const countryCode = "de";
    // State: Sachsen-Anhalt
    const state = "Sachsen-Anhalt";
    // Get browser language for the warnings and the prettifier
    const locale = getUserLanguage();

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
    prettifiedValue = prettifiedValue
      .replaceAll(",", ", ")
      .replaceAll("PH", i18next.t("words.public_holiday"))
      .replaceAll("SH", i18next.t("words.school_holidays"));
    // Find out the open state
    let openState = "";
    let openStateEmoji = "";
    if (oh.getState()) {
      openState = i18next.t("words.open");
      openStateEmoji = "open";
      if (!oh.getFutureState()) {
        openState += i18next.t("texts.will close soon");
        openStateEmoji = "closes_soon";
      }
    } else {
      openState = i18next.t("words.closed");
      openStateEmoji = "closed";
      if (oh.getFutureState()) {
        openState += i18next.t("texts.will open soon");
        openStateEmoji = "opens_soon";
      }
    }
    // Append opening hours to the popup
    popupContent += `<div class='popupflex-container'><div>🕖</div><div><span class='open_state_circle ${openStateEmoji}'></span>${openState}<br />${prettifiedValue}</div></div>`;
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
    popupContent += `<div class='popupflex-container'><div>🇫</div><div><a href='${eFac}' target='_blank' rel='noopener noreferrer'>${decodeURI(
      eFac
    ).replace("https://", "")}</a></div></div>`;
  }
  if (eIns !== undefined) {
    popupContent += `<div class='popupflex-container'><div>📸</div><div><a href='${eIns}' target='_blank' rel='noopener noreferrer'>${eIns.replace(
      "https://",
      ""
    )}</a></div></div>`;
  }
  if (eInf !== undefined) {
    popupContent += `<hr/><div class='popupflex-container'><div>ℹ️</div><div><a href="https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/#${eTyp}${eId}" target="_top">${i18next.t(
      "texts.more_info"
    )}</a></div>`;
  }

  // Add review entry from lib.reviews if exists
  popupContent += "<div id='libreviews'></div>";
  addLibReview(feature);

  return popupContent;
}

// Adding function for opening_hours objects to check if place will be open after n minutes (60 minutes as default)
// eslint-disable-next-line camelcase
if (!opening_hours.prototype.getFutureState) {
  // eslint-disable-next-line camelcase
  opening_hours.prototype.getFutureState = function (minutes = 60) {
    const nowPlusHours = new Date();
    nowPlusHours.setUTCMinutes(nowPlusHours.getUTCMinutes() + minutes);
    return this.getState(nowPlusHours);
  };
}

// Check if the data entries are complete
function checkData(parentGroupVar) {
  parentGroupVar.eachLayer((layer) => {
    // Collect properties
    const eNam = layer.feature.properties.name;
    const eId = layer.feature.properties._id;
    const eTyp = layer.feature.properties._type;
    const osmUrl = `https://openstreetmap.org/${eTyp}/${eId}`;
    const eOpe = layer.feature.properties.opening_hours;
    const eCit = layer.feature.properties.addr_city;
    const ePos = layer.feature.properties.addr_postcode;
    const eStr = layer.feature.properties.addr_street;
    const ePho = layer.feature.properties.contact_phone;

    // Check address data
    if (eCit === undefined || ePos === undefined || eStr === undefined) {
      console.info(`-W- ${eNam}: Address information incomplete. - ${osmUrl}`);
    }

    // Check opening hours
    if (eOpe === undefined) {
      console.info(`-W- ${eNam}: Without opening hours. - ${osmUrl}`);
    }

    // Check phone number
    if (ePho !== undefined) {
      if (ePho.startsWith("+49") !== true) {
        console.info(
          `-W- ${eNam}: Phone number does not start with +49. - ${osmUrl}`
        );
      }
      if (ePho.split(" ").length < 3) {
        console.info(
          `-W- ${eNam}: Phone number has not in the right format. Like +49 345 12345. - ${osmUrl}`
        );
      }
      if (
        ePho.includes(".") ||
        ePho.includes("/") ||
        ePho.includes("(") ||
        ePho.includes(")")
      ) {
        console.info(
          `-W- ${eNam}: Phone number should not have caracters like '.', '/', '(' or ')'. - ${osmUrl}`
        );
      }
    }

    // TODO: Check if cuisine if filled
  });
}

// Main function
veggiemap();
