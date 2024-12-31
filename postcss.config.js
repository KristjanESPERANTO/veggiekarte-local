import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssImport from "postcss-import";

export default {
  plugins: [
    postcssImport,
    autoprefixer,
    cssnano({
      preset: "default"
    })
  ]
};
