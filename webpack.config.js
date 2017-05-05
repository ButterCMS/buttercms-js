var path = require('path');

module.exports = {
  entry: './lib/butter.js',
  output: {
    filename: 'butter.js',
    library: 'Butter',
    sourceMapFilename: 'butter.js.map',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map'
};
