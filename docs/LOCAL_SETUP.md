# Adapting Veggiekarte for Individual Cities

This guide describes how to adapt Veggiekarte for a single city or region (using Halle/Saale as an example).

## Overview of Required Changes

### 1. `refresh.py` - Modify Overpass Query

The most important change is restricting the Overpass query to a specific region.

#### Before (worldwide query):

```python
overpass_query = "?data=[out:json][timeout:900];("
overpass_query += "nwr['diet:vegan'~'yes|only|limited'];"
overpass_query += "nwr['diet:vegetarian'~'yes|only'];"
overpass_query += ");out+center;"
```

#### After (for Halle + Saalekreis):

```python
overpass_query = "?data=[out:json][timeout:900];"

# Define the area - Halle + Saalekreis
overpass_query += "area['de:amtlicher_gemeindeschluessel'='15002000']->.halle;"
overpass_query += "area['de:amtlicher_gemeindeschluessel'='15088']->.saalekreis;"
overpass_query += "(.halle;.saalekreis;)->.searchArea;"

# Collect the vegan nodes, ways and relations (vegan only, no vegetarian)
overpass_query += "nwr(area.searchArea)['diet:vegan'~'yes|only|limited'];"
overpass_query += "out+center;"
```

**Note:** You can find the municipality key for your city on Wikipedia or via the Overpass API.

#### Alternative: Using a Bounding Box

```python
# Example for a bounding box around Leipzig
overpass_query = "?data=[out:json][timeout:900];"
overpass_query += "nwr(51.2,12.2,51.5,12.6)['diet:vegan'~'yes|only|limited'];"
overpass_query += "out+center;"
```

### 2. `refresh.py` - Optional: "More Info" Links for Local Places

If you have a local website, you can add a "More Info" link for specific places:

```python
# only for Halle
TOP_URL = "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/"

# list of objects which get links to more information (OSM Node IDs)
GET_MORE_INFO = [
    2338022982,  # Cup der guten Hoffnung
    9676330117,  # Bay Vegan
    # ... more IDs
]
```

And in the `write_data()` function:

```python
if element_id in GET_MORE_INFO:
    place_obj["properties"]["more_info"] = True
```

### 3. `js/veggiemap.js` - Adjust Map Position

Change the map's starting position to your city:

```javascript
map = new Map("map", {
  center: [51.42, 12.0], // Halle (Saale) - [latitude, longitude]
  zoom: 11, // Zoom level (11-13 for city level)
  worldCopyJump: true,
  zoomControl: false
});
```

### 4. `js/veggiemap.js` - Remove Vegetarian Filter (optional)

If you only display vegan places, remove `vegetarian_friendly` from the diet filter list:

```javascript
// Before:
const dietOrder = ["vegetarian_friendly", "vegan_limited", "vegan_friendly", "vegetarian_only", "vegan_only"];

// After (vegan only):
const dietOrder = ["vegan_limited", "vegan_friendly", "vegetarian_only", "vegan_only"];
```

### 5. `js/popup.js` - "More Info" Function (if used)

Add the `addMoreInfo()` function:

```javascript
export async function addMoreInfo(element, container) {
  if (!element.feature) {
    return;
  }
  if (!element.feature.properties.more_info) {
    return;
  }

  const TOP_URL = "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/";
  const link = document.createElement("a");
  link.href = TOP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = t("words.more_info") || "More information";
  const row = makeRow("ℹ️", [link]);
  container.replaceChildren(row);
}
```

And in `calculatePopup()`:

```javascript
if (feature.properties.more_info) {
  const moreInfoDiv = document.createElement("div");
  moreInfoDiv.dataset.section = "more_info";
  root.appendChild(moreInfoDiv);
  addMoreInfo(element, moreInfoDiv);
}
```

### 6. `locales/*.json` - Add Translations

Add `words.more_info` to all language files:

| Language | Translation                 |
| -------- | --------------------------- |
| de       | "Mehr Infos"                |
| en       | "More information"          |
| es       | "Más información"           |
| fr       | "Plus d'informations"       |
| it       | "Maggiori informazioni"     |
| ca       | "Més informació"            |
| eo       | "Pliaj informoj"            |
| fi       | "Lisätietoja"               |
| ko       | "더 많은 정보"              |
| ru       | "Дополнительная информация" |

### 7. `README.md` - Customize

Change the title and description:

```markdown
# Veggiekarte local

This is a fork of the world wide map [veggiekarte from piratenpanda](https://codeberg.org/piratenpanda/veggiekarte).
This map is for local use. Improvements will be added to the upstream project.
```

### 8. `site.webmanifest` - Customize App Name (optional)

```json
{
  "name": "Veggiekarte Halle",
  "short_name": "Veggiekarte Halle"
}
```

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
    // null = worldwide, otherwise area query
    areaQuery: null,
    // Example for Halle:
    // areaQuery: "area['de:amtlicher_gemeindeschluessel'='15002000']->.searchArea;",

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

### 6. Git Strategy for Forks

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
