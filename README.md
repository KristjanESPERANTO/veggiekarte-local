# Veggiekarte

## Description

A OpenStreetMap based map to easily find places, like restaurants and cafes, with vegetarian and vegan options.

## Usage

You can use it in any modern browser or install it as an app (as a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application)).

## Get involved

There are several ways to get involved:

1. Improve the data on OpenStreetMap
   1. Add missing places
   2. Add and correct information (like opening hours) of places
   3. Check and fix issues on <https://veggiekarte.de/datacheck/>
2. Report issues
3. Help to translate
   1. Translate to new languages - take [locales/en.json](locales/en.json) as template.
   2. Complete translations: [locales/ko.json](locales/ko.json) is incomplete.
4. Participate in development
5. Write reviews for places on [https://lib.reviews/](lib.reviews)

## Keys

The most important keys for us are [diet: vegan](https://wiki.openstreetmap.org/wiki/DE:Key:diet:vegan) and [diet: vegetarian](https://wiki.openstreetmap.org/wiki/DE:Key:diet:vegetarian). These keys are used to determine whether a place is shown on the Veggiekarte or not.

You can find an overview of which other keys we use at [Taginfo](https://taginfo.openstreetmap.org/projects/veggiekarte#tags).

## Website

[www.veggiekarte.de](https://www.veggiekarte.de)

## Third-party software and data

This is an overview of the third-party software and data we use. Many thanks to the open source community, especially to the authors of the following projects! ❤️ 🍻

| software                                                                                   | license                                                                                                          | version       | purpose                                                                                |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| [chart.js](https://github.com/chartjs/Chart.js)                                            | MIT [\*](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)                                             | 4.4.0         | JavaScript library to create charts. We use this in the `data_chart.html`.             |
| [i18next](https://github.com/i18next/i18next)                                              | MIT [\*](https://github.com/i18next/i18next/blob/master/LICENSE)                                                 | 24.2.0        | JavaScript internationalization framework.                                             |
| [leaflet](https://github.com/Leaflet/Leaflet/)                                             | BSD-2-Clause [\*](https://github.com/Leaflet/Leaflet/blob/master/LICENSE)                                        | 2.0.0-alpha.1 | JavaScript library to create interactive maps.                                         |
| [leaflet.control.geocoder](https://github.com/perliedman/leaflet-control-geocoder/)        | BSD-2-Clause [\*](https://github.com/perliedman/leaflet-control-geocoder/blob/master/LICENSE)                    | 3.3.1         | A control to locate places. The button with the magnifier 🔍.                          |
| [leaflet.easybutton](https://github.com/CliffCloud/Leaflet.EasyButton)                     | MIT [\*](https://github.com/CliffCloud/Leaflet.EasyButton/blob/master/LICENSE)                                   | 2.4.0         | Adding buttons. We are using it for the info button.                                   |
| [leaflet.featuregroup.subgroup](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup)    | BSD-2-Clause [\*](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/blob/master/LICENSE)                    | 1.0.2         | Dynamically add/remove groups of markers.                                              |
| [leaflet.fullscreen](https://github.com/brunob/leaflet.fullscreen)                         | MIT [\*](https://github.com/brunob/leaflet.fullscreen/blob/master/LICENSE)                                       | 3.0.2         | Add a fullscreen button.                                                               |
| [modern.leaflet.hash](https://github.com/qgustavor/modern-leaflet-hash)                    | MIT [\*](https://github.com/qgustavor/modern-leaflet-hash/blob/master/LICENSE.md)                                | 1.1.1         | Add coordinate hashes to the URL in the browser address field.                         |
| [leaflet.languageselector](https://github.com/KristjanESPERANTO/Leaflet.LanguageSelector/) | CC0 [\*](https://github.com/KristjanESPERANTO/Leaflet.LanguageSelector/blob/master/LICENSE)                      | 1.2.5         | A control to switch between languages.                                                 |
| [leaflet.locatecontrol](https://github.com/domoritz/leaflet-locatecontrol/)                | MIT [\*](https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/LICENSE)                                | 0.82.0        | A control to locate the position of the user.                                          |
| [leaflet.markercluster](https://github.com/KristjanESPERANTO/Leaflet.markercluster)        | MIT [\*](https://github.com/KristjanESPERANTO/Leaflet.markercluster/blob/main/LICENCE.md)                        | 1.5.5         | Marker Clustering plugin.                                                              |
| [opening_hours.js](https://github.com/opening-hours/opening_hours.js)                      | LGPL-3.0-only [\*](https://github.com/opening-hours/opening_hours.js/blob/master/LICENSES/LGPL-3.0-or-later.txt) | 3.9.0-dev     | Library to parse and process the opening_hours tag from OpenStreetMap data.            |
| [OpenStreetMap](https://www.openstreetmap.org)                                             | CC BY-SA [\*](https://www.openstreetmap.org/copyright)                                                           |               | There we get the data of the places. We also show the markers on an OpenStreetMap map. |
| icons from [OpenStreetMap Carto](https://github.com/gravitystorm/openstreetmap-carto)      | CC0 [\*](https://github.com/gravitystorm/openstreetmap-carto/blob/master/LICENSE.txt)                            |               | Default marker icons                                                                   |
| icons from [Maki](https://labs.mapbox.com/maki-icons/)                                     | CC0                                                                                                              |               | Fallback marker icons                                                                  |
| [veggiepenguin](https://openclipart.org/detail/189178/veggiepenguin)                       | CC0 [\*](https://openclipart.org/share)                                                                          |               | Favicon                                                                                |

## For developers

We use node.js for a few developer tools. For the operation of veggiekarte node.js is not necessary.

To use the tools you have to run `npm install` once to install the required packages. The prerequisite is that you have node.js installed on your system.

### Linter and Formatter

To produce a more consistent code we use ESLint and Prettier.

To test whether the linter and prettier rules are complied with in the code, execute the following command: `node --run lint`.

If errors occur, you can use the following command to eliminate some of the errors: `node --run lint:fix`.

### Bundler

We use some 3rd party software for veggiekarte. So that the browser doesn't have to download an extra JavaScript file for each one, we bundle our JavaScript code with the 3rd party software in one package. In some cases, unused code is also discarded (treeshaking) - but unfortunately not all plugins are designed for treeshaking yet. This makes the website load faster.

A new bundle must be build after each change to the code. Use this command to do that: `node --run build`.

For test purposes, you can also bypass the bundling process by changing this line

`<script src="js/bundle.js" type="module"></script>`

to this

`<script src="js/veggiemap.js" type="module"></script>`

in the index.html.

### Manually update data

Run `python3 refresh.py` to get new data from OpenStreetMap.

### Check data

Run `python3 datacheck/datacheck.py` to run the data check on the data.

### Release

To create a new release, you have to run the following command: `node --run release`. This will run the following steps:

1. Run the linter and fix some errors.
2. Build the bundle.
3. Update the version in the package.json, package-lock.json and the bundle.js. And add a new tag to the git repository.

The changes are not pushed to the repository. You have to do that manually after checking the changes.
