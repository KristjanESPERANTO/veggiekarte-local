/**
 * SubGroup – Minimal Leaflet 2.0 compatible SubGroup implementation.
 *
 * Adds its layers to a parent group (e.g., MarkerClusterGroup) instead of
 * directly to the map. This enables layer toggling for marker categories
 * without forcing the marker cluster to fully recompute on each toggle.
 *
 * Inspired by ghybs/Leaflet.FeatureGroup.SubGroup (v1.0.2), simplified and
 * optimized for Leaflet 2.0.
 */

/* global L */

const SubGroup = L.LayerGroup.extend({
  /**
   * Create a new SubGroup.
   * @param {L.LayerGroup} parentGroup - The parent group (e.g., MarkerClusterGroup)
   * @param {Array} layers - Optional initial layers
   */
  initialize(parentGroup, layers) {
    L.LayerGroup.prototype.initialize.call(this, layers);
    this._parentGroup = parentGroup;
  },

  /**
   * Called when the SubGroup is added to the map.
   * Adds all layers to the parent group instead of the map.
   */
  onAdd(map) {
    this._map = map;

    if (!this._parentGroup) {
      return;
    }

    // Batch optimization: MarkerClusterGroup exposes addLayers()
    if (this._parentGroup.addLayers) {
      this._parentGroup.addLayers(this.getLayers());
    }
    // Fallback: add layers one by one
    else {
      this.eachLayer(this._parentGroup.addLayer, this._parentGroup);
    }
  },

  /**
   * Called when the SubGroup is removed from the map.
   * Removes all layers from the parent group.
   */
  onRemove() {
    if (!this._parentGroup) {
      this._map = null;
      return;
    }

    // Batch optimization: MarkerClusterGroup exposes removeLayers()
    if (this._parentGroup.removeLayers) {
      this._parentGroup.removeLayers(this.getLayers());
    }
    // Fallback: remove layers one by one
    else {
      this.eachLayer(this._parentGroup.removeLayer, this._parentGroup);
    }

    this._map = null;
  },

  /**
   * Add a layer to the SubGroup.
   * If the SubGroup is already on the map, add the layer to the parent group
   * immediately as well.
   */
  addLayer(layer) {
    const id = this.getLayerId(layer);

    // Layer already present in this SubGroup? No-op.
    if (this._layers[id]) {
      return this;
    }

    // Register layer in the internal registry
    this._layers[id] = layer;

    // If already on the map: add to parent immediately
    if (this._map && this._parentGroup) {
      this._parentGroup.addLayer(layer);
    }

    return this;
  },

  /**
   * Remove a layer from the SubGroup.
   * If the SubGroup is on the map, also remove it from the parent group.
   */
  removeLayer(layer) {
    const id = layer in this._layers ? layer : this.getLayerId(layer);

    // Layer not present in this SubGroup? No-op.
    if (!this._layers[id]) {
      return this;
    }

    // If on the map: remove from parent
    if (this._map && this._parentGroup) {
      this._parentGroup.removeLayer(this._layers[id]);
    }

    // Remove from internal registry
    delete this._layers[id];

    return this;
  }
});

/**
 * Batch API: efficiently add multiple layers.
 * Accepts an array of layers (typically markers).
 * If the SubGroup is already on the map and the parent group provides a
 * addLayers method (e.g., MarkerClusterGroup), that is used for performance.
 * The internal registry (_layers) is always kept in sync.
 */
SubGroup.prototype.addLayers = function addLayers(layers) {
  if (!Array.isArray(layers) || layers.length === 0) { return this; }

  // Filter bereits vorhandene Layer und registriere neue in _layers
  const toAdd = [];
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i];
    const id = this.getLayerId(layer);
    if (!this._layers[id]) {
      this._layers[id] = layer;
      toAdd.push(layer);
    }
  }

  if (toAdd.length === 0) { return this; }

  // If already on the map and parent supports batching → add directly
  if (this._map && this._parentGroup && typeof this._parentGroup.addLayers === "function") {
    this._parentGroup.addLayers(toAdd);
    return this;
  }

  // Otherwise, add one by one (or simply leave them registered internally;
  // OnAdd will take care of batching later)
  for (let i = 0; i < toAdd.length; i += 1) {
    if (this._map && this._parentGroup) {
      this._parentGroup.addLayer(toAdd[i]);
    }
  }
  return this;
};

/**
 * Batch API: efficiently remove multiple layers.
 * Removes the given layers from the SubGroup and — if the SubGroup is
 * currently on the map — also from the parent group (using removeLayers
 * when available, otherwise one by one).
 */
SubGroup.prototype.removeLayers = function removeLayers(layers) {
  if (!Array.isArray(layers) || layers.length === 0) { return this; }

  const toRemove = [];
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i];
    const id = this.getLayerId(layer);
    if (this._layers[id]) {
      toRemove.push(this._layers[id]);
      delete this._layers[id];
    }
  }

  if (toRemove.length === 0) { return this; }

  if (this._map && this._parentGroup) {
    if (typeof this._parentGroup.removeLayers === "function") {
      this._parentGroup.removeLayers(toRemove);
    }
    else {
      for (let i = 0; i < toRemove.length; i += 1) {
        this._parentGroup.removeLayer(toRemove[i]);
      }
    }
  }
  return this;
};

/**
 * Override clearLayers with a batched variant that — when possible —
 * first removes all layers from the parent group in one go and then clears
 * the internal registry.
 */
SubGroup.prototype.clearLayers = function clearLayers() {
  const layers = this.getLayers();
  if (layers.length && this._map && this._parentGroup) {
    if (typeof this._parentGroup.removeLayers === "function") {
      this._parentGroup.removeLayers(layers);
    }
    else {
      for (let i = 0; i < layers.length; i += 1) {
        this._parentGroup.removeLayer(layers[i]);
      }
    }
  }
  // Clear LayerGroup internal registry
  L.LayerGroup.prototype.clearLayers.call(this);
  return this;
};

// Export for ES modules
export { SubGroup };

// Global registration for non-module scripts (datacheck.js)
if (typeof L !== "undefined") {
  L.SubGroup = SubGroup;
}
