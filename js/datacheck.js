/* eslint-disable camelcase */
/* global L */

// Define marker groups
const parentGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20
});
const issueCount1 = L.featureGroup.subGroup(parentGroup, {});
const issueCount2 = L.featureGroup.subGroup(parentGroup, {});
const issueCount3 = L.featureGroup.subGroup(parentGroup, {});
const issueCount4 = L.featureGroup.subGroup(parentGroup, {});
const issueCount5 = L.featureGroup.subGroup(parentGroup, {});
const issueCount6 = L.featureGroup.subGroup(parentGroup, {});
const issueCountMany = L.featureGroup.subGroup(parentGroup, {});
const subgroups = {
  issue_count_1: issueCount1,
  issue_count_2: issueCount2,
  issue_count_3: issueCount3,
  issue_count_4: issueCount4,
  issue_count_5: issueCount5,
  issue_count_6: issueCount6,
  issue_count_many: issueCountMany
};

let map;

function veggiemap() {
  // TileLayer
  const tileOSM = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
    maxZoom: 18
  });

  // Map
  map = L.map("map", {
    layers: [tileOSM],
    center: [51.42, 12.0],
    zoom: 11,
    worldCopyJump: true,
    zoomControl: false
  });

  // Add zoom control
  L.control.zoom({ position: "topright" }).addTo(map);

  // Populate map async then add overlays
  veggiemapPopulate(parentGroup).then(() => {
    const overlays = {
      "<div class='legend-row'><div class='second-cell'>1 issue</div><div class='third-cell' id='issue_count_1'></div></div>": issueCount1,
      "<div class='legend-row'><div class='second-cell'>2 issues</div><div class='third-cell' id='issue_count_2'></div></div>": issueCount2,
      "<div class='legend-row'><div class='second-cell'>3 issues</div><div class='third-cell' id='issue_count_3'></div></div>": issueCount3,
      "<div class='legend-row'><div class='second-cell'>4 issues</div><div class='third-cell' id='issue_count_4'></div></div>": issueCount4,
      "<div class='legend-row'><div class='second-cell'>5 issues</div><div class='third-cell' id='issue_count_5'></div></div>": issueCount5,
      "<div class='legend-row'><div class='second-cell'>6 issues</div><div class='third-cell' id='issue_count_6'></div></div>": issueCount6,
      "<div class='legend-row'><div class='second-cell'>more than 6</div><div class='third-cell' id='issue_count_many'></div></div>": issueCountMany
    };
    L.control.layers(null, overlays).addTo(map);
  });

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  // Basic hash (zoom/lat/lon) handling (replacement for leaflet-hash)
  function setHash() {
    const mapCenter = map.getCenter();
    const mapZoomValue = map.getZoom();
    const precision = Math.max(0, Math.ceil(Math.log(mapZoomValue) / Math.LN2));
    const hashStr = `#${mapZoomValue}/${mapCenter.lat.toFixed(precision)}/${mapCenter.lng.toFixed(precision)}`;
    if (location.hash !== hashStr) { history.replaceState(null, "", hashStr); }
  }
  function parseHash() {
    if (location.hash && location.hash.startsWith("#")) {
      const parts = location.hash.slice(1).split("/");
      if (parts.length === 3) {
        const parsedValue = parseInt(parts[0], 10);
        const lat = parseFloat(parts[1]);
        const lon = parseFloat(parts[2]);
        if (!Number.isNaN(parsedValue) && !Number.isNaN(lat) && !Number.isNaN(lon)) {
          map.setView([lat, lon], parsedValue);
        }
      }
    }
  }
  map.on("moveend", setHash);
  parseHash();

  // Add info button
  const infoButton = L.easyButton("<div class='info-button'></div>", () => {
    toggleInfo();
  }).addTo(map);
  infoButton.setPosition("topright");

  // Add button for search places
  L.Control.geocoder().addTo(map);

  // Add button to search own position
  L.control
    .locate({
      showCompass: true,
      locateOptions: { maxZoom: 16 },
      position: "topright"
    })
    .addTo(map);
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
    // Add the number to the category entry
    const el = document.getElementById(categoryName);
    if (el) { el.innerHTML = `(${markerNumber})`; }
  }
  // Add the date to the Layer Control
  const lastEntryRef = document.getElementById("issue_count_many");
  if (lastEntryRef && lastEntryRef.parentNode && lastEntryRef.parentNode.parentNode) {
    lastEntryRef.parentNode.parentNode.innerHTML += `<br /><div>(${date})</div>`;
  }
}

// Function to get the information from the places json file.
async function veggiemapPopulate(parentGroupVar) {
  const url = "../data/check_results.json";

  try {
    const response = await fetch(url);
    const geojson = await response.json();
    const markerGroupsAndDate = await geojsonToMarkerGroups(geojson);

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
    parentGroupVar.eachLayer((layer) => {
      layer.bindPopup(calculatePopup);
      layer.bindTooltip(calculateTooltip);
    });

    // Hide spinner
    hideSpinner();
  }
  catch (error) {
    console.log("Request failed", error);
  }
}

// Process the places GeoJSON into the groups of markers
function geojsonToMarkerGroups(geojson) {
  const date = geojson._timestamp.split(" ")[0];
  const groups = {};
  geojson.features.forEach((feature) => {
    let eCat = "issue_count_";
    if (feature.properties.issue_count > 6) {
      eCat += "many";
    }
    else {
      eCat += feature.properties.issue_count;
    }
    if (!groups[eCat]) { groups[eCat] = []; }
    groups[eCat].push(getMarker(feature));
  });
  return [groups, date];
}

// Function to get the marker.
function getMarker(feature) {
  const eLatLon = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
  const marker = L.marker(eLatLon);
  marker.feature = feature;
  return marker;
}

// Calculate tooltip content for a given marker layer
function calculateTooltip(layer) {
  const feature = layer.feature;
  const eNam = feature.properties.name;
  return eNam;
}

// Calculate popup content for a given marker layer
function calculatePopup(layer) {
  // Get the information
  const feature = layer.feature;
  const eId = feature.properties._id;
  const eNam = feature.properties.name;
  const eTyp = feature.properties._type;

  /** * Building the popup content ** */

  // Popup title
  let popupContent = `<div class='map-popup-title'>${eNam}</div><hr/>`;

  // Add undefined keys
  if (feature.properties.undefined !== undefined) {
    feature.properties.undefined.forEach(key => (popupContent += `<div class='popup-issue'>'${key}' is undefined</div>`));
  }

  // Add issues
  if (feature.properties.issues !== undefined) {
    feature.properties.issues.forEach(issue => (popupContent += `<div class='popup-issue'>${issue}</div>`));
  }

  // OSM link to edit
  const osmShowUrl = `https://openstreetmap.org/${eTyp}/${eId}`;
  const osmEditUrl = `https://www.openstreetmap.org/edit?${eTyp}=${eId}`;
  popupContent += `<hr/><div class='map-editor-link'><a href='${osmShowUrl}' target='_blank' rel='noopener noreferrer'>Show on OpenStreetMap</a><br>
  <a href='${osmEditUrl}' target='_blank' rel='noopener noreferrer'>Edit on OpenStreetMap</a></div>`;

  return popupContent;
}

// Main function
veggiemap();
