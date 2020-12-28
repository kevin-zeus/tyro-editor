/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const pkg = require('./package.json');

  /**
   * Environment
   *
   * @type {any}
   */
  const NODE_ENV = argv.mode || 'development';
  const VERSION = process.env.VERSION || pkg.version;

  /**
   * Plugins for bundle
   *
   * @type {webpack}
   */
  const webpack = require('webpack');

  return {
    entry: {
      editor: './src/index.ts',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: [ 'Editor' ],
      libraryTarget: 'umd',
    },

    watchOptions: {
      aggregateTimeout: 50,
    },

    /**
     * Tell webpack what directories should be searched when resolving modules.
     */
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.ts'],
    },

    plugins: [
      /** Pass variables into modules */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        VERSION: JSON.stringify(VERSION),
      }),
    ],

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
            'postcss-loader',
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

    devtool: NODE_ENV === 'development' ? 'source-map' : false,
  };
};