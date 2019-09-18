require('dotenv/config');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rootPath = './src/server/public';

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, `${rootPath}/js/main.js`),
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'src/server/public/dist'),
    libraryTarget: 'umd',
    library: 'baseLib',
    publicPath: 'dist/',
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
  },
  module: {
    rules: [{
      exclude: /(node_modules)/,
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
          hmr: process.env.NODE_ENV === 'development',
        },
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'sass-loader',
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'src/server/views/layouts/basic.html'),
      template: path.resolve(__dirname, 'src/server/views/layouts/basic-org.html'),
      hash: true,
    }),
  ],
};
