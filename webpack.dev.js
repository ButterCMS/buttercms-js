import * as url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    minimize: false, // No minification in development
  },
};

export default [
  // UMD Build - Development
  {
    ...developmentConfig,
    entry: "./lib/butter.js",
    output: {
      filename: "butter.umd.dev.js",
      globalObject: "this",
      library: {
        name: "Butter",
        type: "umd",
      },
      path: path.resolve(__dirname, "dist"),
    },
  },
  // ES Module Build - Development
  {
    ...developmentConfig,
    entry: "./lib/butter.js",
    output: {
      filename: "butter.esm.dev.js",
      library: {
        type: "module",
      },
      path: path.resolve(__dirname, "dist"),
    },
    experiments: {
      outputModule: true,
    },
  },
];
