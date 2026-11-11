/** @module place-cluster-layer */

import { DivIcon, LayerGroup, Marker } from "leaflet";
import { ZoomRadiusSupercluster } from "./zoom-radius-supercluster.js";

const SELECTED_CLASS = "marker-selected";
const HIGHLIGHT_CLASS = "marker-highlight";
// Map area around the view that is rendered as well, so short pans show markers right away
const RENDER_PADDING = 0.25;
// Clusters with more places than this are not searched for a highlighted place
const MAX_SEARCHED_CLUSTER_SIZE = 2000;
// Number of indexes kept for filter settings that may come back (e.g. a quick filter switched on and off)
const INDEX_CACHE_SIZE = 2;
// Cluster radius in pixels as [highest zoom level, radius], at least the cluster icon size (40px) up to zoom 13
const CLUSTER_RADIUS_BY_ZOOM = [[6, 80], [10, 60], [13, 45]];

/**
 * Cluster radius for a zoom level: large when zoomed out, so clusters do not overlap, and small when zoomed in.
 * @param {number} zoom - Zoom level
 * @returns {number} Radius in pixels
 */
export function clusterRadiusForZoom(zoom) {
  return CLUSTER_RADIUS_BY_ZOOM.find(([maxZoom]) => zoom <= maxZoom)?.[1] ?? 30;
}

/**
 * Clustered place markers, indexed with Supercluster.
 *
 * Only the clusters and places in (and around) the current view have Leaflet markers; place markers
 * are created on first use. Places are objects with getLatLng() and a GeoJSON point geometry.
 */
export class PlaceClusterLayer {
  /**
   * @param {import('leaflet').Map} map - Leaflet map instance
   * @param {object} options
   * @param {number} options.maxZoom - Highest map zoom level; places are never clustered on it
   * @param {Function} options.radiusForZoom - Returns the cluster radius in pixels for a zoom level
   * @param {Function} options.createMarker - Returns a new Leaflet marker for a place
   * @param {Function} options.clusterLabel - Returns the accessible name of a cluster with the given number of places
   */
  constructor(map, { maxZoom, radiusForZoom, createMarker, clusterLabel }) {
    this._map = map;
    this._maxZoom = maxZoom;
    this._radiusForZoom = radiusForZoom;
    this._createMarker = createMarker;
    this._clusterLabel = clusterLabel;
    this._places = [];
    this._index = null;
    this._rendered = new Map(); // Place or cluster key → marker on the map
    this._placeMarkers = new WeakMap();
    this._selected = null;
    this._highlighted = null;
    this._afterIndex = [];
    this._indexCache = new Map(); // Cache key → { places, index }
    this._group = new LayerGroup().addTo(map);
    map.on("moveend", this._render, this);
  }

  /**
   * Show these places (clustered) instead of the previous ones.
   * @param {Array} places - Places to show
   * @param {string} [cacheKey] - Identifies this set of places (the filter settings); a recent index for the same key is reused
   */
  setPlaces(places, cacheKey) {
    if (places.length === this._places.length && places.every((place, i) => place === this._places[i])) { return; }
    const cached = cacheKey === undefined ? null : this._indexCache.get(cacheKey);
    const reuse = cached?.places.length === places.length;
    this._places = reuse ? cached.places : places;
    this._index = reuse ? cached.index : this._createIndex(places);
    if (cacheKey !== undefined) {
      this._indexCache.delete(cacheKey);
      this._indexCache.set(cacheKey, { places: this._places, index: this._index });
      if (this._indexCache.size > INDEX_CACHE_SIZE) { this._indexCache.delete(this._indexCache.keys().next().value); }
    }
    // Cluster ids of the old index are not valid in the new one
    this._removeClusters();
    this._render();
    this._afterIndex.splice(0).forEach(callback => callback());
  }

  _createIndex(places) {
    const index = new ZoomRadiusSupercluster({ maxZoom: this._maxZoom - 1, extent: 256, radius: 0 }, this._radiusForZoom);
    return index.load(places);
  }

  /**
   * @param {import('leaflet').LatLngBounds} bounds - Area to search
   * @returns {Array} Shown places within the bounds
   */
  getPlacesInBounds(bounds) {
    return this._places.filter(place => bounds.contains(place.getLatLng()));
  }

  /**
   * @param {object} place - Place
   * @returns {HTMLElement|null} Element of the place's marker if it is on the map
   */
  getMarkerElement(place) {
    return this._rendered.get(place)?.getElement() || null;
  }

  /** Create the cluster markers anew, e.g. after a language change. */
  redraw() {
    this._removeClusters();
    this._render();
  }

  /**
   * Mark a place as selected; the mark follows the place's marker while it is on the map.
   * @param {object|null} place - Place, or null
   */
  setSelected(place) {
    this._selected = place;
    this._applyClasses();
  }

  /**
   * Highlight a place: its marker, or the cluster it is in.
   * @param {object|null} place - Place, or null
   */
  setHighlighted(place) {
    this._highlighted = place;
    this._applyClasses();
  }

  /**
   * Zoom in until the place is no longer part of a cluster, then call the callback.
   * Places that are not shown (filtered out) are only centered.
   * @param {object} place - Place
   * @param {Function} callback - Called when the place's marker is on the map (or the map is centered)
   */
  revealPlace(place, callback) {
    if (!this._index) {
      this._afterIndex.push(() => this.revealPlace(place, callback));
      return;
    }
    const map = this._map;
    const latlng = place.getLatLng();
    if (!this._places.includes(place)) {
      map.setView(latlng, Math.max(map.getZoom(), 16));
      callback();
      return;
    }
    let zoom = Math.round(map.getZoom());
    while (zoom < this._maxZoom && !this._isSingleAt(place, zoom)) { zoom += 1; }
    const inView = map.getBounds().contains(latlng);
    if (zoom === Math.round(map.getZoom()) && inView) {
      callback();
      return;
    }
    map.once("moveend", () => callback());
    map.setView(latlng, zoom);
  }

  // Whether the place is shown as its own marker (not in a cluster) at the zoom level
  _isSingleAt(place, zoom) {
    const { lat, lng } = place.getLatLng();
    // The index stores rounded (32-bit) coordinates, so the search box is a few meters wide
    const delta = 1e-4;
    return this._index.getClusters([lng - delta, lat - delta, lng + delta, lat + delta], zoom).some(item => item.properties.place === place);
  }

  _render() {
    if (!this._index) { return; }
    const map = this._map;
    const zoom = Math.round(map.getZoom());
    const bounds = map.getBounds().pad(RENDER_PADDING);
    const items = this._index.getClusters([bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()], zoom);

    const wanted = new Map();
    items.forEach((item) => {
      if (item.properties?.cluster) { wanted.set(`c${item.properties.cluster_id}`, item); }
      else { wanted.set(item.properties.place, item.properties.place); }
    });
    this._rendered.forEach((marker, key) => {
      if (!wanted.has(key)) {
        this._group.removeLayer(marker);
        this._rendered.delete(key);
      }
    });
    wanted.forEach((item, key) => {
      if (this._rendered.has(key)) { return; }
      const marker = typeof key === "string" ? this._createClusterMarker(item) : this._getPlaceMarker(item);
      this._rendered.set(key, marker);
      this._group.addLayer(marker);
    });
    this._applyClasses();
  }

  _removeClusters() {
    this._rendered.forEach((marker, key) => {
      if (typeof key !== "string") { return; }
      this._group.removeLayer(marker);
      this._rendered.delete(key);
    });
  }

  _getPlaceMarker(place) {
    let marker = this._placeMarkers.get(place);
    if (!marker) {
      marker = this._createMarker(place);
      this._placeMarkers.set(place, marker);
    }
    return marker;
  }

  _createClusterMarker(cluster) {
    const count = cluster.properties.point_count;
    let size = "large";
    if (count < 10) { size = "small"; }
    else if (count < 100) { size = "medium"; }
    const [lng, lat] = cluster.geometry.coordinates;
    const marker = new Marker([lat, lng], {
      icon: new DivIcon({ html: `<div><span>${count}</span></div>`, className: `marker-cluster marker-cluster-${size}`, iconSize: [40, 40] })
    });
    marker.clusterId = cluster.properties.cluster_id;
    marker.pointCount = count;
    const zoomIn = () => {
      const zoom = Math.min(this._index.getClusterExpansionZoom(marker.clusterId), this._maxZoom);
      this._map.setView(marker.getLatLng(), zoom);
    };
    marker.on("click", zoomIn);
    marker.on("add", () => {
      const element = marker.getElement();
      element.setAttribute("role", "button");
      element.setAttribute("aria-label", this._clusterLabel(count));
    });
    return marker;
  }

  _applyClasses() {
    this._group.eachLayer((marker) => {
      marker.getElement()?.classList.remove(SELECTED_CLASS, HIGHLIGHT_CLASS);
    });
    if (this._selected) { this.getMarkerElement(this._selected)?.classList.add(SELECTED_CLASS); }
    if (this._highlighted) { this._findShownMarker(this._highlighted)?.getElement()?.classList.add(HIGHLIGHT_CLASS); }
  }

  // The marker that shows the place: its own marker, or the cluster on the map it is in
  _findShownMarker(place) {
    const own = this._rendered.get(place);
    if (own) { return own; }
    if (!this._index || !this._places.includes(place)) { return null; }
    const map = this._map;
    const point = map.latLngToLayerPoint(place.getLatLng());
    const clusters = [...this._rendered.values()]
      .filter(marker => marker.clusterId !== undefined && marker.pointCount <= MAX_SEARCHED_CLUSTER_SIZE)
      .sort((markerA, markerB) => map.latLngToLayerPoint(markerA.getLatLng()).distanceTo(point) - map.latLngToLayerPoint(markerB.getLatLng()).distanceTo(point));
    return clusters.find(marker => this._index.getLeaves(marker.clusterId, Infinity).some(leaf => leaf.properties.place === place)) || null;
  }
}
