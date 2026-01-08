# Adapting Veggiekarte for Individual Cities

This guide describes how to adapt Veggiekarte for a single city or region (using Halle/Saale as an example).

## Quick Start with Central Configuration

**Since version 2.4.0**, Veggiekarte uses a centralized configuration system. To customize for your city:

### 1. Create Custom Configuration

Copy the example config and customize it:

```bash
cp config.example.json config.custom.json
```

Edit `config.custom.json`:

```json
{
  "appName": "Veggiekarte Halle",
  "appDescription": "Vegan and vegetarian places in Halle",
  "mapCenter": [51.42, 12.0],
  "mapZoom": 11,
  "mapMinZoom": 3,
  "mapMaxZoom": 19,
  "areas": [
    { "type": "de:amtlicher_gemeindeschluessel", "value": "15002000", "name": "halle" },
    { "type": "de:amtlicher_gemeindeschluessel", "value": "15088", "name": "saalekreis" }
  ],
  "areaQuery": null,
  "includeVegetarian": false,
  "localSiteEnabled": true,
  "localSiteUrl": "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/",
  "localSiteMoreInfoIds": [2338022982, 9676330117]
}
```

### 2. Configuration Options

| Field                  | Description                                              | Example                   |
| ---------------------- | -------------------------------------------------------- | ------------------------- |
| `appName`              | Name of your map                                         | `"Veggiekarte Halle"`     |
| `appDescription`       | Short description                                        | `"Vegan places in Halle"` |
| `mapCenter`            | Initial map position `[latitude, longitude]`             | `[51.42, 12.0]`           |
| `mapZoom`              | Initial zoom level (3 = worldwide, 11-13 = city)         | `11`                      |
| `mapMinZoom`           | Minimum zoom level                                       | `3`                       |
| `mapMaxZoom`           | Maximum zoom level                                       | `19`                      |
| `areas`                | List of OSM areas to query (see below)                   | `[{...}]`                 |
| `areaQuery`            | Advanced: Custom Overpass area query (overrides `areas`) | `null`                    |
| `includeVegetarian`    | Include vegetarian places (also shows vegetarian filter) | `true` or `false`         |
| `localSiteEnabled`     | Enable "More Info" links for specific places             | `true` or `false`         |
| `localSiteUrl`         | URL for "More Info" links                                | `"https://example.com"`   |
| `localSiteMoreInfoIds` | OSM IDs that get "More Info" links                       | `[123456, 789012]`        |

### 3. Defining Areas

#### Option A: Using Structured Areas (Recommended)

The `areas` field accepts a list of OSM area definitions:

```json
"areas": [
  { "type": "de:amtlicher_gemeindeschluessel", "value": "15002000", "name": "halle" },
  { "type": "de:amtlicher_gemeindeschluessel", "value": "15088", "name": "saalekreis" }
]
```

Common area types:

- `de:amtlicher_gemeindeschluessel` - German municipality key
- `ISO3166-2` - ISO region code
- `name` - Area name (less reliable)

**Find municipality keys:** [Wikipedia (German)](https://de.wikipedia.org/wiki/Amtlicher_Gemeindeschl%C3%BCssel)

#### Option B: Custom Area Query (Advanced)

For complex queries, use `areaQuery` (this overrides `areas`):

```json
"areaQuery": "area['de:amtlicher_gemeindeschluessel'='15002000']->.halle;area['de:amtlicher_gemeindeschluessel'='15088']->.saalekreis;(.halle;.saalekreis;)->.searchArea;"
```

#### Option C: Worldwide

Leave both empty for a worldwide map:

```json
"areas": [],
"areaQuery": null
```

### 4. Build and Deploy

```bash
npm run build
npm run refresh
```

The build system automatically uses:

- `config.custom.json` if it exists (gitignored)
- Otherwise `config.default.json` (tracked in git)

### 5. Optional: Customize App Name in Manifest

Edit `site.webmanifest`:

```json
{
  "name": "Veggiekarte Halle",
  "short_name": "Veggiekarte Halle"
}
```

---

## Checklist for New City Forks

- [ ] Fork the repository
- [ ] Copy `config.example.json` to `config.custom.json`
- [ ] Determine municipality key or bounding box for the region
- [ ] Edit `config.custom.json` with your settings
- [ ] Optional: Customize `site.webmanifest`
- [ ] Run `npm run build`
- [ ] Run `npm run refresh` (load data)
- [ ] Run `npm run datacheck` (check data)
- [ ] Test!

---

## Useful Links

- [Overpass Turbo](https://overpass-turbo.eu/) - For testing Overpass queries
- [German Municipality Keys](https://de.wikipedia.org/wiki/Amtlicher_Gemeindeschl%C3%BCssel)
- [OpenStreetMap Wiki - Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)

If you prefer not to use the centralized config, you can still manually edit files:

---

## Improvement Suggestions for the Main Project

To simplify adapting Veggiekarte for individual cities, the following changes could be made to the main project:

### 1. Central Configuration File `config.js`

A central configuration file would bundle all city-specific settings:

```javascript
// config.js
export default {
  // App metadata
  appName: "Veggiekarte",
  appDescription: "Vegan and vegetarian places on OpenStreetMap",

  // Map settings
  map: {
    center: [51.1657, 10.4515], // Center of Germany
    zoom: 6,
    minZoom: 3,
    maxZoom: 19
  },

  // Overpass query settings
  overpass: {
    // Define areas for regional queries (empty = worldwide)
    // Multiple areas will be combined into a single search area
    areas: [
      // Example for Halle + Saalekreis:
      // { type: 'de:amtlicher_gemeindeschluessel', value: '15002000', name: 'halle' },
      // { type: 'de:amtlicher_gemeindeschluessel', value: '15088', name: 'saalekreis' }
    ],

    // Advanced: Custom area query string (overrides 'areas' if set)
    // Use this for complex queries that can't be expressed with 'areas'
    areaQuery: null,

    // Which diet types to query?
    includeVegan: true,
    includeVegetarian: true
  },

  // UI settings
  ui: {
    showVegetarianFilter: true, // false for vegan-only maps
    showDataChart: true
  },

  // Local website integration (optional)
  localSite: {
    enabled: false,
    url: null,
    // OSM IDs for "More Info" links
    moreInfoIds: []
  }
};
```

### 2. Environment Variables for Python Script

In `refresh.py`, environment variables or a JSON config could be used:

```python
import json
from pathlib import Path

# Load config
CONFIG_FILE = Path("./config.json")
if CONFIG_FILE.exists():
    with open(CONFIG_FILE) as f:
        CONFIG = json.load(f)
else:
    CONFIG = {}

# Use config values with defaults
AREA_QUERY = CONFIG.get("overpass", {}).get("areaQuery", None)
INCLUDE_VEGETARIAN = CONFIG.get("overpass", {}).get("includeVegetarian", True)
```

### 3. Config File `config.json` in Root Directory

```json
{
  "appName": "Veggiekarte Halle",
  "map": {
    "center": [51.42, 12.0],
    "zoom": 11
  },
  "overpass": {
    "areaQuery": "area['de:amtlicher_gemeindeschluessel'='15002000']->.halle;area['de:amtlicher_gemeindeschluessel'='15088']->.saalekreis;(.halle;.saalekreis;)->.searchArea;",
    "includeVegetarian": false
  },
  "ui": {
    "showVegetarianFilter": false
  },
  "localSite": {
    "enabled": true,
    "url": "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/",
    "moreInfoIds": [2338022982, 9676330117]
  }
}
```

### 4. Build-Time Configuration

The Rollup build could read the config and replace constants:

```javascript
// rollup.config.js
import replace from "@rollup/plugin-replace";
import config from "./config.json";

export default {
  plugins: [
    replace({
      __APP_NAME__: JSON.stringify(config.appName),
      __MAP_CENTER__: JSON.stringify(config.map.center),
      __MAP_ZOOM__: config.map.zoom,
      __SHOW_VEGETARIAN_FILTER__: config.ui.showVegetarianFilter
    })
  ]
};
```

### 5. Benefits of a Central Configuration

- **Easy customization**: Change only one file instead of several
- **Fewer merge conflicts**: When rebasing on upstream, there are fewer conflicts
- **Documentation**: The config file is self-documenting
- **Validation**: Config can be validated during build
- **CI/CD friendly**: Different configs for different deployments

### 6. Advanced Configuration Options

#### Environment-Specific Configurations

For different deployment environments, use separate config files:

```javascript
// config.development.js
export default {
  // ... development settings
  map: { center: [51.42, 12.0], zoom: 13 }
};

// config.production.js
export default {
  // ... production settings
  map: { center: [51.42, 12.0], zoom: 11 }
};
```

Load the appropriate config in your build process or dynamically at runtime.

#### Overpass Query Builder

Instead of writing raw query strings, a helper function could generate the query from the config:

```javascript
// In refresh.py or a separate JS utility
function buildOverpassQuery(config) {
  let query = "?data=[out:json][timeout:900];";

  // Build area query if areas are defined
  if (config.overpass.areas && config.overpass.areas.length > 0) {
    config.overpass.areas.forEach((area) => {
      query += `area['${area.type}'='${area.value}']->.${area.name};`;
    });
    query += `(${config.overpass.areas.map((a) => `.${a.name}`).join(";")};)->.searchArea;`;
    query += "nwr(area.searchArea)";
  } else if (config.overpass.areaQuery) {
    // Use raw area query if provided
    query += config.overpass.areaQuery;
    query += "nwr(area.searchArea)";
  } else {
    // Worldwide query
    query += "nwr";
  }

  // Build diet filter
  const dietFilters = [];
  if (config.overpass.includeVegan) {
    dietFilters.push("'diet:vegan'~'yes|only|limited'");
  }
  if (config.overpass.includeVegetarian) {
    dietFilters.push("'diet:vegetarian'~'yes|only'");
  }

  if (dietFilters.length > 0) {
    query += `[${dietFilters.join("][")}]`;
  }

  query += ";out+center;";
  return query;
}
```

This approach makes the configuration more declarative and easier to validate.

### 7. Git Strategy for Forks

With a central config, `.gitignore` would exclude this file:

```gitignore
# Local configuration (not tracked)
config.local.json
```

And a `config.example.json` would serve as a template:

```bash
cp config.example.json config.json
# Customize...
```

---

## Checklist for New City Forks

- [ ] Fork the repository
- [ ] Create `config.json` (if available) or manually adjust files
- [ ] Determine municipality key or bounding box for the region
- [ ] `refresh.py` - Adjust Overpass query
- [ ] `js/veggiemap.js` - Set map position
- [ ] `js/veggiemap.js` - Adjust diet filter (if vegan only)
- [ ] Update `README.md`
- [ ] Customize `site.webmanifest`
- [ ] Run `node --run build`
- [ ] Run `node --run refresh` (load data)
- [ ] Run `node --run datacheck` (check data)
- [ ] Test!

---

## Useful Links

- [Overpass Turbo](https://overpass-turbo.eu/) - For testing Overpass queries
- [German Municipality Keys](https://de.wikipedia.org/wiki/Amtlicher_Gemeindeschl%C3%BCssel)
- [OpenStreetMap Wiki - Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)
