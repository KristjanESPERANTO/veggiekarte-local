import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { readFileSync, existsSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json"));

// Load config.custom.json if it exists, otherwise config.default.json
const configFile = existsSync("./config.custom.json") 
  ? "./config.custom.json" 
  : "./config.default.json";
const config = JSON.parse(readFileSync(configFile));
console.log(`Using config file: ${configFile}`);

const banner = `/*! *****************************************************************************
  ${pkg.name}
  Version ${pkg.version}

  ${pkg.description}
  Please submit bugs at ${pkg.bugs.url}

  © ${pkg.author.name ? pkg.author.name : pkg.contributors}
  License: ${pkg.license}

  This file is auto-generated. Do not edit.
***************************************************************************** */
`;

// Shared plugins for all bundles
const sharedPlugins = [
  replace({
    preventAssignment: true,
    values: {
      __APP_NAME__: JSON.stringify(config.appName),
      __APP_DESCRIPTION__: JSON.stringify(config.appDescription),
      __MAP_CENTER__: JSON.stringify(config.mapCenter),
      __MAP_ZOOM__: JSON.stringify(config.mapZoom),
      __MAP_MIN_ZOOM__: JSON.stringify(config.mapMinZoom),
      __MAP_MAX_ZOOM__: JSON.stringify(config.mapMaxZoom),
      __INCLUDE_VEGETARIAN__: JSON.stringify(config.includeVegetarian),
      __LOCAL_SITE_ENABLED__: JSON.stringify(config.localSiteEnabled),
      __LOCAL_SITE_URL__: JSON.stringify(config.localSiteUrl)
    }
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  terser()
];

export default [
  // Main app bundle
  {
    input: "js/veggiemap.js",
    output: {
      banner,
      file: "js/bundle.js",
      format: "es",
      sourcemap: true
    },
    plugins: sharedPlugins
  },
  // Datacheck bundle
  {
    input: "js/datacheck.js",
    output: {
      banner,
      file: "datacheck/datacheck-bundle.js",
      format: "es",
      sourcemap: true
    },
    plugins: sharedPlugins
  },
  // Chart bundle
  {
    input: "js/veggiemap_chart.js",
    output: {
      banner,
      file: "js/veggiemap_chart-bundle.js",
      format: "es",
      sourcemap: true
    },
    plugins: sharedPlugins
  }
];
