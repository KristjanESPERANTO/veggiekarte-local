import banner2 from "rollup-plugin-banner2";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json"));

const bannerText = `/*! *****************************************************************************
  ${pkg.name}
  Version ${pkg.version}

  ${pkg.description}
  Please submit bugs at ${pkg.bugs.url}

  (c) ${pkg.author.name ? pkg.author.name : pkg.contributors}
  Licence: ${pkg.license}

  This file is auto-generated. Do not edit.
***************************************************************************** */
`;

export default {
  input: "js/veggiemap.js",
  output: {
    file: "js/bundle.js",
    format: "iife"
  },
  plugins: [terser(), banner2(() => bannerText)]
};
