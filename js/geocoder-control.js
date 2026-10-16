/** @module geocoder-control */

import { Geocoder } from "leaflet-control-geocoder";
import { Marker } from "leaflet";

/**
 * Add the place search control to the map.
 *
 * A selected result is centered on its point (e.g. the city center) instead of
 * the center of its bounding box; the bounding box only determines the zoom level.
 * @param {import('leaflet').Map} map - Leaflet map instance
 * @param {Function} [getViewOffset] - Returns the pixel offset [x, y] of the uncovered map area's
 *   center from the map center; the result is centered there
 * @returns {Geocoder} The geocoder control
 */
export function addGeocoder(map, getViewOffset = () => [0, 0]) {
  let resultMarker = null;

  const geocoder = new Geocoder({ defaultMarkGeocode: false, collapsed: false });
  geocoder.on("markgeocode", (evt) => {
    const { bbox, center, html, name } = evt.geocode;
    const zoom = map.getBoundsZoom(bbox);
    const target = map.project(center, zoom).subtract(getViewOffset());
    map.setView(map.unproject(target, zoom), zoom);

    if (resultMarker) { map.removeLayer(resultMarker); }
    resultMarker = new Marker(center).bindPopup(html || name).addTo(map).openPopup();
  });

  return geocoder.addTo(map);
}
