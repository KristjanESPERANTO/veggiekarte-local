/* eslint-disable camelcase */

import { Control, Icon, Map, Marker, TileLayer } from "leaflet";
import { Geocoder } from "leaflet-control-geocoder";
import { InfoButton } from "./info-button-control.js";
import { LocateControl } from "../third-party/leaflet.locatecontrol/L.Control.Locate.esm.patched.js";
import { MarkerClusterGroup } from "@kristjan.esperanto/leaflet.markercluster";
import { SubGroup } from "./subgroup.js";
import { createMapHash } from "./map-hash.js";

// Ensure InfoButton is registered globally (used later as L.Control.InfoButton)
if (InfoButton) { /* Side-effect import */ }

// Define marker groups
const parentGroup = new MarkerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20,
  // Smooth UI when adding many markers
  chunkedLoading: true
});
const issueCount1 = new SubGroup(parentGroup);
const issueCount2 = new SubGroup(parentGroup);
const issueCount3 = new SubGroup(parentGroup);
const issueCount4 = new SubGroup(parentGroup);
const issueCount5 = new SubGroup(parentGroup);
const issueCount6 = new SubGroup(parentGroup);
const issueCountMany = new SubGroup(parentGroup);
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
  // Provide inline SVG defaults to decouple from external marker assets
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    iconUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2741%27%20viewBox%3D%270%200%2028%2041%27%3E%3Cpath%20fill%3D%27%232c7a7b%27%20d%3D%27M14%200c-7.18%200-13%206.1-13%2013.6%200%2011.6%2013%2027.4%2013%2027.4s13-15.8%2013-27.4C27%206.1%2021.18%200%2014%200z%27/%3E%3Ccircle%20fill%3D%27%23ffffff%27%20cx%3D%2714%27%20cy%3D%2713%27%20r%3D%276%27/%3E%3C/svg%3E",
    shadowUrl: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2728%27%20height%3D%2712%27%3E%3Cellipse%20cx%3D%2714%27%20cy%3D%276%27%20rx%3D%2710%27%20ry%3D%275%27%20fill%3D%27rgba%280%2C0%2C0%2C0.25%29%27/%3E%3C/svg%3E"
  });

  // TileLayer
  const tileOSM = new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
    maxZoom: 18
  });

  // Map
  map = new Map("map", {
    layers: [tileOSM],
    center: [20, 17],
    zoom: 3,
    worldCopyJump: true,
    zoomControl: false
  });

  // Add zoom control
  new Control.Zoom({ position: "topright" }).addTo(map);

  // Populate map async then add overlays
  veggiemapPopulate(parentGroup).then(() => {
    const overlays = {
      "<div class='legend-row' data-layer='issue_count_1'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>1 issue</div><div class='third-cell' id='issue_count_1'></div></div>": issueCount1,
      "<div class='legend-row' data-layer='issue_count_2'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>2 issues</div><div class='third-cell' id='issue_count_2'></div></div>": issueCount2,
      "<div class='legend-row' data-layer='issue_count_3'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>3 issues</div><div class='third-cell' id='issue_count_3'></div></div>": issueCount3,
      "<div class='legend-row' data-layer='issue_count_4'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>4 issues</div><div class='third-cell' id='issue_count_4'></div></div>": issueCount4,
      "<div class='legend-row' data-layer='issue_count_5'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>5 issues</div><div class='third-cell' id='issue_count_5'></div></div>": issueCount5,
      "<div class='legend-row' data-layer='issue_count_6'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>6 issues</div><div class='third-cell' id='issue_count_6'></div></div>": issueCount6,
      "<div class='legend-row' data-layer='issue_count_many'><div class='row-toggle' aria-hidden='true'></div><div class='second-cell'>more than 6</div><div class='third-cell' id='issue_count_many'></div></div>": issueCountMany
    };
    const layerControl = new Control.Layers(null, overlays);
    layerControl.addTo(map);

    // Update active state styling when layers are toggled
    function updateActiveStates() {
      Object.entries(subgroups).forEach(([categoryName, subgroup]) => {
        const rowElement = document.querySelector(`.legend-row[data-layer='${categoryName}']`);
        if (rowElement) {
          rowElement.classList.toggle("is-active", map.hasLayer(subgroup));
        }
      });
    }
    map.on("overlayadd", updateActiveStates);
    map.on("overlayremove", updateActiveStates);
    updateActiveStates();
  });

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  // Sync map position with URL hash
  createMapHash(map);

  // Add info button
  new InfoButton({ position: "topright", onClick: toggleInfo }).addTo(map);

  // Add button for search places
  new Geocoder().addTo(map);

  // Add button to search own position
  new LocateControl({
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  }).addTo(map);
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
window.toggleInfo = toggleInfo;

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
      // Add subgroup to map first, then batch-insert markers
      map.addLayer(subgroup);
      subgroup.addLayers(markerGroups[key]);
    });

    // Reveal all the markers and clusters on the map in one go
    map.addLayer(parentGroupVar);

    // Call the function to put the numbers into the legend
    statPopulate(markerGroups, date);

    // Popups/tooltips are already bound at marker creation

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
  const marker = new Marker(eLatLon);
  marker.feature = feature;
  // Bind popups/tooltips at creation time (works with chunkedLoading)
  marker.bindPopup(calculatePopup, {
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
