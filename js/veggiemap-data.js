import { getIcon, iconToEmoji } from "./veggiemap-icons.js";
import { Marker } from "leaflet";
import { calculatePopup } from "./popup.js";
import { getCategoryForIcon } from "./category-mapping.js";

/** Build a tooltip string for a marker layer. */
function calculateTooltip(layer) {
  const feature = layer.feature;
  const eIco = feature.properties.icon;
  return `${iconToEmoji[eIco] || ""} ${feature.properties.name}`;
}

/** Create a Leaflet Marker from a GeoJSON feature. */
function getMarker(feature) {
  const eLatLon = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
  const eIco = feature.properties.icon;
  const eCat = feature.properties.category;
  const eName = feature.properties.name || "Unknown location";
  const marker = new Marker(eLatLon, { icon: getIcon(eIco, eCat) });
  marker.feature = feature;
  marker.categoryInfo = getCategoryForIcon(eIco);
  marker.bindPopup(calculatePopup, { minWidth: 300, maxWidth: 520, autoPanPadding: [16, 16] });
  marker.bindTooltip(calculateTooltip);

  // Set aria-label when marker is added to map (for screen readers)
  marker.on("add", () => {
    if (marker._icon) {
      marker._icon.setAttribute("aria-label", eName);
      marker._icon.setAttribute("role", "button");
    }
  });

  return marker;
}

/** Process a places GeoJSON into diet-category groups of markers.
 * @param {object} geojson
 * @returns {[object, string]} [markerGroups, dateString]
 */
export function geojsonToMarkerGroups(geojson) {
  const date = geojson._timestamp.split(" ")[0];
  const groups = {};
  geojson.features.forEach((feature) => {
    const eCat = feature.properties.category;
    if (!groups[eCat]) { groups[eCat] = []; }
    groups[eCat].push(getMarker(feature));
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
