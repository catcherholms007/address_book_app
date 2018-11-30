const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
});