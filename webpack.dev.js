/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

const webpackConfig = { 
  entry: {},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    hot: true,
    port: 9000
  },
  plugins: [
    new SimpleProgressWebpackPlugin(),
  ],
};

function getEntries(globPath) {
  let files = glob.sync(globPath), entries = {};

  files.forEach((filePath) => {
    let split = filePath.split('/');
    let name = split[split.length - 2];
    entries[name] = './' + filePath;
  });

  return entries;
}

let entries = getEntries('example/*/index.js');

Object.keys(entries).forEach(name => {
  webpackConfig.entry[name] = entries[name];

  let plugin = new HtmlWebpackPlugin({
    filename: name + '/index.html',
    template: './example/example.html',
    inject: true,
    chunks: ['chunk-vendors', 'chunk-common', name]
  });
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;
