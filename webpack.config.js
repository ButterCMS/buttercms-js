import * as url from "url";
import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const productionConfig = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
        },
        extractComments: false
      }),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

const developmentConfig = {
  mode: "development",
  devtool: 'inline-source-map',
  optimization: {
    minimize: false, // No minification in development
  },
};

export default [
  // UMD Build
  {
    ...productionConfig,
    entry: "./lib/butter.js",
    output: {
      filename: "butter.umd.js",
      globalObject: "this",
      library: {
        name: "Butter",
        type: "umd",
      },
      path: path.resolve(__dirname, "dist"),
    },
  },
  // ES Module Build
  {
    ...productionConfig,
    entry: "./lib/butter.js",
    output: {
      filename: "butter.esm.js",
      library: {
        type: "module",
      },
      path: path.resolve(__dirname, "dist"),
    },
    experiments: {
      outputModule: true,
    },
  },
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
