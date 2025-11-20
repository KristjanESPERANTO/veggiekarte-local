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

export default [
  // Main app bundle (DEBUG - no minification)
  {
    input: "js/veggiemap.js",
    output: {
      banner,
      file: "js/bundle.debug.js",
      format: "es",
      sourcemap: true
    },
    plugins: [nodeResolve()]
  }
];
