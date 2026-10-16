/** @module geocoder-control */

import { Geocoder } from "leaflet-control-geocoder";
import { Marker } from "leaflet";

/**
 * Add the place search control to the map.
 *
 * A selected result is centered on its point (e.g. the city center) instead of
 * the center of its bounding box; the bounding box only determines the zoom level.
 * @param {import('leaflet').Map} map - Leaflet map instance
 * @returns {Geocoder} The geocoder control
 */
export function addGeocoder(map) {
  let resultMarker = null;

  const geocoder = new Geocoder({ defaultMarkGeocode: false });
  geocoder.on("markgeocode", (evt) => {
    const { bbox, center, html, name } = evt.geocode;
    map.setView(center, map.getBoundsZoom(bbox));

    if (resultMarker) { map.removeLayer(resultMarker); }
    resultMarker = new Marker(center).bindPopup(html || name).addTo(map).openPopup();
  });

  return geocoder.addTo(map);
}
