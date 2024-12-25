

/**
 * Class representing the hash management for a Leaflet map.
 */
export class Hash {
  /**
   * Creates an instance of Hash.
   * @param {L.Map} map - A Leaflet map instance.
   */
  constructor (map) {
    /**
     * @type {number}
     * @description Delay time in milliseconds for change handling.
     */
    this.changeDefer = 100

    if (map) {
      this.init(map)
    }
  }

  /**
   * Returns the zoom lebel based on the altitude and latitude
   * @param {number} zoom - The zoom level
   * @param {number} altitude - The altitude
   * @returns {number} The latitude
   */
  static getZoom (altitude, latitude) {
    return Math.log2(133876102434.048 * Math.cos((latitude * Math.PI) / 180) / (altitude * 256))
  }

  /**
   * Returns the altitude based on the zoom level and latitude
   * @param {number} zoom - The zoom level
   * @param {number} latitude - The latitude
   * @returns {number} The altitude
   */
  static getAltitude (zoom, latitude) {
    return 133876102434.048 * Math.cos((latitude * Math.PI) / 180) / (Math.pow(2, zoom) * 256)
  }

  /**
   * Parses the hash string and returns map center and zoom level.
   * @param {string} hash - The hash string from the URL.
   * @returns {{center: L.LatLng, zoom: number} | false} The parsed center and zoom level or false if invalid.
   */
  static parseHash (hash) {
    if (hash.startsWith('#')) {
      hash = hash.slice(1)
    }
    if (hash.startsWith('@')) {
      hash = hash.slice(1)
    }
    const args = hash.split(',')
    if (args.length === 3) {
      const lat = parseFloat(args[0])
      const lon = parseFloat(args[1])
      const zoom = Hash.getZoom(parseInt(args[2], 10), lat)
      if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
        return false
      } else {
        return {
          center: new L.LatLng(lat, lon),
          zoom
        }
      }
    } else {
      return false
    }
  }

  /**
   * Formats the map's center and zoom level into a hash string.
   * @param {L.Map} map - A Leaflet map instance.
   * @returns {string} The formatted hash string.
   */
  static formatHash (map) {
    const center = map.getCenter()
    const zoom = map.getZoom()
    const precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2))
    const altitude = Math.round(Hash.getAltitude(zoom, center.lat))

    return `#@${center.lat.toFixed(precision)},${center.lng.toFixed(precision)},${altitude}m`
  }

  /**
   * Initializes the hash management for the map.
   * @param {L.Map} map - A Leaflet map instance.
   */
  init (map) {
    this.map = map

    // Reset the hash
    this.lastHash = null
    this.onHashChange()

    if (!this.isListening) {
      this.startListening()
    }
  }

  /**
   * Removes the hash management from the map.
   */
  removeFrom () {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout)
    }

    if (this.isListening) {
      this.stopListening()
    }

    this.map = null
  }

  /**
   * Handles map move events.
   */
  onMapMove = () => {
    // Bail if we're moving the map (updating from a hash),
    // or if the map is not yet loaded
    if (this.movingMap || !this.map || !this.map._loaded) {
      return
    }

    const hash = Hash.formatHash(this.map)
    if (this.lastHash !== hash) {
      window.history.replaceState(null, '', hash)
      this.lastHash = hash
    }
  }

  /**
   * Updates the map view based on the current hash in the URL.
   */
  update = () => {
    const hash = window.location.hash
    if (hash === this.lastHash) {
      return
    }
    const parsed = Hash.parseHash(hash)
    if (parsed) {
      this.movingMap = true

      if (this.map) {
        this.map.setView(parsed.center, parsed.zoom)
      }

      this.movingMap = false
    } else {
      this.onMapMove()
    }
  }

  /**
   * Handles hash change events.
   */
  onHashChange = () => {
    // Throttle calls to update() so that they only happen every `changeDefer` ms
    if (!this.changeTimeout) {
      this.changeTimeout = setTimeout(() => {
        this.update()
        this.changeTimeout = null
      }, this.changeDefer)
    }
  }

  /**
   * Starts listening for map move and hash change events.
   */
  startListening () {
    if (this.map) {
      this.map.on('moveend', this.onMapMove)
    }

    window.addEventListener('hashchange', this.onHashChange)
    this.isListening = true
  }

  /**
   * Stops listening for map move and hash change events.
   */
  stopListening () {
    if (this.map) {
      this.map.off('moveend', this.onMapMove)
    }

    window.removeEventListener('hashchange', this.onHashChange)
    this.isListening = false
  }
}

/**
 * Creates a new Hash instance for the given map.
 * @param {L.Map} map - A Leaflet map instance.
 * @returns {Hash} The created Hash instance.
 */
export function createHash (map) {
  return new Hash(map)
}
