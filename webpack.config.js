import * as url from 'url';
import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const commonConfig = {
  devtool: 'source-map', // Enable source maps
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          sourceMap: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
}

export default [
  // UMD Build
  {
    entry: './lib/butter.js',
    mode: "production",
    output: {
      filename: 'butter.umd.js',
      globalObject: "this",
      library: {
        name: 'Butter',
        type: 'umd',
      },
      path: path.resolve(__dirname, 'dist')
    },
    ...commonConfig
  },
  // ES Module Build
  {
    entry: './lib/butter.js',
    mode: "production",
    output: {
      filename: 'butter.esm.js',
      library: {
        type: 'module'
      },
      path: path.resolve(__dirname, 'dist')
    },
    experiments: {
      outputModule: true,
    },
    ...commonConfig
  }
];
