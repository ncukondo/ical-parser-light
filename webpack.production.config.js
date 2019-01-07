const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/index.ts',
  devtool: false,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'product')
  }
});
