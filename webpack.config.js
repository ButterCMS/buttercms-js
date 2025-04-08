const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

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
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.json'],
  },
};

module.exports = [
  // UMD Build
  {
    ...productionConfig,
    entry: "./lib/butter.js",
    output: {
      filename: "butter.umd.cjs",
      globalObject: "this",
      library: {
        name: "Butter",
        type: "umd",
        export: "default",
      },
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    node: "18"
                  },
                  modules: 'commonjs'
                }]
              ]
            },
          },
        },
      ],
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
      environment: {
        module: true,
      },
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    node: "18"
                  },
                  modules: false
                }]
              ]
            },
          },
        },
      ],
    },
  },
];
