/**
 * Simple hash management for Leaflet maps
 * Syncs map position with URL hash: #map=zoom/lat/lng (OpenStreetMap format)
 *
 * @param {import('leaflet').Map} map - Leaflet map instance
 */
export function createMapHash(map) {
  function setHash() {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    const hashStr = `#map=${zoom}/${center.lat.toFixed(precision)}/${center.lng.toFixed(precision)}`;
    if (location.hash !== hashStr) {
      history.replaceState(null, "", hashStr);
    }
  }

  function parseHash() {
    const hash = location.hash;
    if (hash && hash.startsWith("#map=")) {
      const parts = hash.slice(5).split("/");
      if (parts.length === 3) {
        const zoom = Number.parseInt(parts[0], 10);
        const lat = Number.parseFloat(parts[1]);
        const lng = Number.parseFloat(parts[2]);
        if (!Number.isNaN(zoom) && !Number.isNaN(lat) && !Number.isNaN(lng)) {
          map.setView([lat, lng], zoom);
        }
      }
    }
  }

  map.on("moveend", setHash);
  parseHash();
}
