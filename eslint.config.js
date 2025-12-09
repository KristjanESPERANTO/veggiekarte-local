import { defineConfig, globalIgnores } from "eslint/config";
import css from "@eslint/css";
import globals from "globals";
import { flatConfigs as importX } from "eslint-plugin-import-x";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores([
    ".venv/",
    "css/bundle.css",
    "js/bundle.js",
    "js/veggiemap_chart-bundle.js",
    "package-lock.json",
    "rollup.config.js",
    "third-party/",
    "**/*.min.json",
    "data/check_results.json",
    "data/overpass.json",
    "data/places.json",
    "data/places_old.json",
    "datacheck/datacheck-bundle.js"
  ]),
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"], rules: { "css/no-important": "off", "css/use-baseline": "off" } },
  {
    files: ["**/*.js"],
    languageOptions: { ecmaVersion: "latest", globals: globals.browser },
    plugins: { js, stylistic },
    extends: [importX.recommended, "js/all", "stylistic/recommended"],
    rules: {
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-statements-per-line": ["error", { max: 2 }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "func-style": "off",
      "id-length": ["error", { exceptions: ["i", "L"] }],
      "import-x/no-unresolved": ["error", { ignore: ["eslint/config"] }],
      "init-declarations": "off",
      "max-lines": ["warn", 500],
      "max-lines-per-function": ["warn", 175],
      "max-statements": "off",
      "no-console": "off",
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-param-reassign": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": "off",
      "no-warning-comments": "off",
      "one-var": "off",
      "prefer-destructuring": "off",
      "sort-keys": "off",
      "sort-vars": "off"
    }
  },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] }
]);
