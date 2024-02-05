import * as url from 'url';
import path from "path";
import webpack from "webpack";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  entry: './lib/butter.js',
  mode: "production",
  output: {
    filename: 'butter.js',
    globalObject: "this",
    library: 'Butter',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    })
  ]
};
