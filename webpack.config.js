var path = require('path');

module.exports = {
  entry: './lib/butter.js',
  output: {
    filename: 'butter.js',
    library: 'Butter',
    path: path.resolve(__dirname, 'dist')
  }
};
