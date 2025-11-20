import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json"));

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

// Plugin to inject default export for packages that use "import L from 'leaflet'"
const injectLeafletDefaultExport = {
  name: 'inject-leaflet-default',
  transform(code, id) {
    // Only process the leaflet-hash package
    if (id.includes('leaflet-hash') && code.includes("import L from 'leaflet'")) {
      return code.replace(
        /import L from ['"]leaflet['"]/,
        "import * as L from 'leaflet'"
      );
    }
    return null;
  }
};

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
    plugins: [
      injectLeafletDefaultExport,
      nodeResolve({ browser: true }),
      terser()
    ]
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
    plugins: [
      injectLeafletDefaultExport,
      nodeResolve({ browser: true }),
      terser()
    ]
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
    plugins: [
      injectLeafletDefaultExport,
      nodeResolve({ browser: true }),
      terser()
    ]
  }
];
