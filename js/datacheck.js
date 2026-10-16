/* eslint-disable camelcase */

import { Control, Icon, LatLng, LayerGroup, Map, Marker, TileLayer } from "leaflet";
import { InfoButton, openInfo, showInfoOnStartup } from "./info-button-control.js";
import { PlaceClusterLayer, clusterRadiusForZoom } from "./place-cluster-layer.js";
import { Geocoder } from "leaflet-control-geocoder";
import { LocateControl } from "leaflet.locatecontrol";
import { createMapHash } from "./map-hash.js";
import { createProgressController } from "./progress.js";
import { initCloseButtons } from "./i18n.js";

const MAX_ZOOM = 18;

// One (empty) layer per issue count; switching them in the layer control filters the clustered places
const issueCount1 = new LayerGroup();
const issueCount2 = new LayerGroup();
const issueCount3 = new LayerGroup();
const issueCount4 = new LayerGroup();
const issueCount5 = new LayerGroup();
const issueCount6 = new LayerGroup();
const issueCountMany = new LayerGroup();
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
let clusterLayer;
let placeGroups = {};
const progress = createProgressController();

/** Show the places of the issue counts that are switched on in the layer control. */
function applyIssueFilter() {
  const shownKeys = Object.keys(subgroups).filter(key => map.hasLayer(subgroups[key]));
  clusterLayer.setPlaces(shownKeys.flatMap(key => placeGroups[key] || []), shownKeys.join());
}

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
    maxZoom: MAX_ZOOM
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

  // Clustered places with issues
  clusterLayer = new PlaceClusterLayer(map, {
    maxZoom: MAX_ZOOM,
    radiusForZoom: clusterRadiusForZoom,
    createMarker: getMarker,
    clusterLabel: count => `${count} places`
  });
  Object.values(subgroups).forEach(group => map.addLayer(group));

  // Populate map async then add overlays
  veggiemapPopulate().then((date) => {
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

    // Put the numbers and the data date into the legend (its rows exist once the control is added)
    if (date) { statPopulate(placeGroups, date); }

    // Update active state styling when layers are toggled
    function updateActiveStates() {
      Object.entries(subgroups).forEach(([categoryName, subgroup]) => {
        const rowElement = document.querySelector(`.legend-row[data-layer='${categoryName}']`);
        if (rowElement) {
          rowElement.classList.toggle("is-active", map.hasLayer(subgroup));
        }
      });
    }
    map.on("overlayadd overlayremove", () => {
      updateActiveStates();
      applyIssueFilter();
    });
    updateActiveStates();
  });

  // Sync map position with URL hash
  createMapHash(map);

  // Add info button
  new InfoButton({ position: "topright", onClick: openInfo }).addTo(map);

  // Add button for search places
  new Geocoder().addTo(map);

  // Add button to search own position
  new LocateControl({
    showCompass: true,
    locateOptions: { maxZoom: 16 },
    position: "topright"
  }).addTo(map);
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
async function veggiemapPopulate() {
  const url = "../data/check_results.json";

  progress.start();

  try {
    const response = await fetch(url);
    const geojson = await response.json();
    const [groups, date] = geojsonToPlaceGroups(geojson);
    placeGroups = groups;
    applyIssueFilter();

    // Hide progress bar
    progress.finish(300);
    return date;
  }
  catch (error) {
    console.log("Request failed", error);
    progress.finish(300);
    return null;
  }
}

// Process the places GeoJSON into groups of places by issue count
function geojsonToPlaceGroups(geojson) {
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
    groups[eCat].push(createPlace(feature));
  });
  return [groups, date];
}

// A place for the cluster layer: the feature with its position (the marker is created when it is first shown)
function createPlace(feature) {
  const [lng, lat] = feature.geometry.coordinates;
  const latlng = new LatLng(lat, lng);
  return { feature, geometry: feature.geometry, getLatLng: () => latlng };
}

// Function to get the marker of a place.
function getMarker(place) {
  const { feature } = place;
  const eName = feature.properties.name || "Unknown location";
  const marker = new Marker(place.getLatLng());
  marker.feature = feature;
  marker.bindPopup(calculatePopup, {
    minWidth: 300,
    maxWidth: 520,
    autoPanPadding: [16, 16]
  });
  marker.bindTooltip(calculateTooltip);
  marker.on("popupopen", () => marker.closeTooltip());

  // Set aria-label when marker is added to map (for screen readers)
  marker.on("add", () => {
    if (marker._icon) {
      marker._icon.setAttribute("aria-label", eName);
      marker._icon.setAttribute("role", "button");
    }
  });

  return marker;
}

// Calculate tooltip content for a given marker layer (text only, no HTML parsing)
function calculateTooltip(layer) {
  const span = document.createElement("span");
  span.textContent = layer.feature.properties.name;
  return span;
}

// Create an element with a class name and text content
function createTextElement(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

// Create an external link that opens in a new tab
function createExternalLink(url, text) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = text;
  return link;
}

// Calculate popup content for a given marker layer
function calculatePopup(layer) {
  // Get the information
  const feature = layer.feature;
  const eId = feature.properties._id;
  const eNam = feature.properties.name;
  const eTyp = feature.properties._type;

  /** * Building the popup content ** */
  const root = document.createElement("div");

  // Popup title
  root.append(createTextElement("div", "map-popup-title", eNam), document.createElement("hr"));

  // Add undefined keys
  if (feature.properties.undefined !== undefined) {
    feature.properties.undefined.forEach(key => root.appendChild(createTextElement("div", "popup-issue", `'${key}' is undefined`)));
  }

  // Add issues
  if (feature.properties.issues !== undefined) {
    feature.properties.issues.forEach(issue => root.appendChild(createTextElement("div", "popup-issue", issue)));
  }

  // OSM link to edit
  const osmShowUrl = `https://openstreetmap.org/${encodeURIComponent(eTyp)}/${encodeURIComponent(eId)}`;
  const osmEditUrl = `https://www.openstreetmap.org/edit?${encodeURIComponent(eTyp)}=${encodeURIComponent(eId)}`;
  const editorLinks = document.createElement("div");
  editorLinks.className = "map-editor-link";
  editorLinks.append(
    createExternalLink(osmShowUrl, "Show on OpenStreetMap"),
    document.createElement("br"),
    createExternalLink(osmEditUrl, "Edit on OpenStreetMap")
  );
  root.append(document.createElement("hr"), editorLinks);

  return root;
}

// Main function
veggiemap();

// Show info modal on startup
showInfoOnStartup();

// Set aria-labels for close buttons (no i18n system in datacheck)
initCloseButtons();
