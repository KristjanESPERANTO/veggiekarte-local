/* eslint-disable no-return-assign */
/* global L */

// Define marker groups
const parentGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 20
});
const issueNumber0 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber1 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber2 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber3 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber4 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber5 = L.featureGroup.subGroup(parentGroup, {});
const issueNumber6 = L.featureGroup.subGroup(parentGroup, {});
const issueNumberMany = L.featureGroup.subGroup(parentGroup, {});
const subgroups = {
  issue_number_0: issueNumber0,
  issue_number_1: issueNumber1,
  issue_number_2: issueNumber2,
  issue_number_3: issueNumber3,
  issue_number_4: issueNumber4,
  issue_number_5: issueNumber5,
  issue_number_6: issueNumber6,
  issue_number_many: issueNumberMany
};

let map;

function veggiemap() {
  // TileLayer
  const tileOSM = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
      maxZoom: 18
    }
  );

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

  // Define overlays (each marker group gets a layer) + add legend to the description
  const overlays = {
    "<div class='legend-row'><div class='second-cell'>no issues</div><div class='third-cell' id='issue_number_0'></div></div>":
      issueNumber0,
    "<div class='legend-row'><div class='second-cell'>1 issue</div><div class='third-cell' id='issue_number_1'></div></div>":
      issueNumber1,
    "<div class='legend-row'><div class='second-cell'>2 issues</div><div class='third-cell' id='issue_number_2'></div></div>":
      issueNumber2,
    "<div class='legend-row'><div class='second-cell'>3 issues</div><div class='third-cell' id='issue_number_3'></div></div>":
      issueNumber3,
    "<div class='legend-row'><div class='second-cell'>4 issues</div><div class='third-cell' id='issue_number_4'></div></div>":
      issueNumber4,
    "<div class='legend-row'><div class='second-cell'>5 issues</div><div class='third-cell' id='issue_number_5'></div></div>":
      issueNumber5,
    "<div class='legend-row'><div class='second-cell'>6 issues</div><div class='third-cell' id='issue_number_6'></div></div>":
      issueNumber6,
    "<div class='legend-row'><div class='second-cell'>more than 6</div><div class='third-cell' id='issue_number_many'></div></div>":
      issueNumberMany
  };

  veggiemapPopulate(parentGroup);

  // Close the tooltip when opening the popup
  parentGroup.on("click", () => {
    if (parentGroup.isPopupOpen()) {
      parentGroup.closeTooltip();
    }
  });

  // Add hash to the url
  // eslint-disable-next-line no-unused-vars
  const hash = new L.Hash(map);

  // Add info button
  const infoButton = L.easyButton('<div class="info-button"></div>', () => {
    toggleInfo();
  }).addTo(map);
  infoButton.setPosition("topright");

  // Add button for search places
  L.Control.geocoder().addTo(map);

  // Add button to search own position
  L.control
    .locate({
      icon: "locate-icon",
      iconLoading: "loading-icon",
      showCompass: true,
      locateOptions: { maxZoom: 16 },
      position: "topright"
    })
    .addTo(map);

  // Add layer control button
  L.control.layers(null, overlays).addTo(map);
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
    document.getElementById(categoryName).innerHTML = `(${markerNumber})`;
  }
  // Add the date to the Layer Control
  const lastEntry =
    document.getElementById("issue_number_many").parentNode.parentNode;
  lastEntry.innerHTML += `<br /><div>(${date})</div>`;
}

// Function to get the information from the places json file.
function veggiemapPopulate(parentGroupVar) {
  const url = "../data/check_results.json";
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

      // Don't show markers without issues
      map.removeLayer(issueNumber0);

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
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
}

// Process the places GeoJSON into the groups of markers
function geojsonToMarkerGroups(geojson) {
  const date = geojson._timestamp.split(" ")[0];
  const groups = {};
  geojson.features.forEach((feature) => {
    let eCat = "issue_number_";
    if (feature.properties.issue_number > 6) {
      eCat += "many";
    } else {
      eCat += feature.properties.issue_number;
    }
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
    feature.properties.undefined.forEach(
      (key) =>
        (popupContent += `<div class='popup-issue'>'${key}' is undefined</div>`)
    );
  }

  // Add issues
  if (feature.properties.issues !== undefined) {
    feature.properties.issues.forEach(
      (issue) => (popupContent += `<div class='popup-issue'>${issue}</div>`)
    );
  }

  // OSM link to edit
  const osmUrl = `https://openstreetmap.org/${eTyp}/${eId}`;
  popupContent += `<hr/><div class='map-editor-link'><a href='${osmUrl}' target='_blank' rel='noopener noreferrer'>(Edit on OpenStreetMap)</a></div>`;

  return popupContent;
}

// Main function
veggiemap();
