import { LatLng, Marker } from "leaflet";
import { getIcon, iconToEmoji } from "./veggiemap-icons.js";
import { getCategoryForIcon } from "./category-mapping.js";

let placeClickHandler = null;

/**
 * Set the function that is called with the place when its marker is clicked.
 * @param {Function} handler - Click handler
 */
export function setPlaceClickHandler(handler) {
  placeClickHandler = handler;
}

/** Build a tooltip element for a marker layer (text only, no HTML parsing). */
function calculateTooltip(layer) {
  const feature = layer.feature;
  const eIco = feature.properties.icon;
  const span = document.createElement("span");
  span.textContent = `${iconToEmoji[eIco] || ""} ${feature.properties.name}`;
  return span;
}

/**
 * A place from the GeoJSON data. Its map marker is created only when it is first shown.
 * The point geometry is what the cluster index reads.
 */
class Place {
  constructor(feature) {
    this.feature = feature;
    this.geometry = feature.geometry;
    this.dietType = feature.properties.category;
    this.categoryInfo = getCategoryForIcon(feature.properties.icon);
  }

  /** @returns {LatLng} Position of the place */
  getLatLng() {
    if (!this._latlng) {
      const [lng, lat] = this.geometry.coordinates;
      this._latlng = new LatLng(lat, lng);
    }
    return this._latlng;
  }
}

/**
 * Create the Leaflet marker of a place.
 * @param {Place} place - Place
 * @returns {Marker} Marker; clicking it or pressing Enter on it calls the place click handler
 */
export function createPlaceMarker(place) {
  const { feature } = place;
  const eIco = feature.properties.icon;
  const eName = feature.properties.name || "Unknown location";
  const marker = new Marker(place.getLatLng(), { icon: getIcon(eIco, feature.properties.category) });
  marker.feature = feature;
  marker.bindTooltip(calculateTooltip);
  marker.on("click", () => {
    marker.closeTooltip();
    if (placeClickHandler) { placeClickHandler(place); }
  });
  marker.on("keypress", (evt) => {
    if (evt.originalEvent.code === "Enter" && placeClickHandler) { placeClickHandler(place); }
  });

  // Set aria-label when marker is added to map (for screen readers)
  marker.on("add", () => {
    if (marker._icon) {
      marker._icon.setAttribute("aria-label", eName);
      marker._icon.setAttribute("role", "button");
    }
  });

  return marker;
}

/** Process a places GeoJSON into groups of places by diet category.
 * @param {object} geojson
 * @returns {[object, string]} [placeGroups, dateString]
 */
export function geojsonToPlaceGroups(geojson) {
  const date = geojson._timestamp.split(" ")[0];
  const groups = {};
  geojson.features.forEach((feature) => {
    const eCat = feature.properties.category;
    if (!groups[eCat]) { groups[eCat] = []; }
    groups[eCat].push(new Place(feature));
  });
  return [groups, date];
}

/** Update the statistics DOM with marker counts and the data date.
 * @param {object} markerGroups
 * @param {string} date
 */
export function statPopulate(markerGroups, date) {
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
