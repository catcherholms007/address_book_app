const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = merge(common,{
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[hash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
  ]
});