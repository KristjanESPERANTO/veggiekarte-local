/**
 * Simple hash management for Leaflet maps
 * Syncs map position with URL hash: #map=zoom/lat/lng (OpenStreetMap format)
 * Falls back to localStorage if no hash is present
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
    // Always update localStorage to remember last position
    localStorage.setItem("veggiekarte_map_position", hashStr);
  }

  function parsePosition(hashString) {
    if (!hashString || !hashString.startsWith("#map=")) {
      return null;
    }
    const parts = hashString.slice(5).split("/");
    if (parts.length === 3) {
      const zoom = Number.parseInt(parts[0], 10);
      const lat = Number.parseFloat(parts[1]);
      const lng = Number.parseFloat(parts[2]);
      if (!Number.isNaN(zoom) && !Number.isNaN(lat) && !Number.isNaN(lng)) {
        return { zoom, lat, lng };
      }
    }
    return null;
  }

  // Try hash first, then localStorage, then use default from map
  const position = parsePosition(location.hash)
    || parsePosition(localStorage.getItem("veggiekarte_map_position"));

  if (position) {
    map.setView([position.lat, position.lng], position.zoom);
  }

  map.on("moveend", setHash);
}
