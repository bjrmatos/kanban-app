'use strict';

require('es6-promise').polyfill();

var path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Clean = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin'),
    pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: PATHS.app
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kanban App'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = webpackMerge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // by default webpack dev server is on port 8080
      new OpenBrowserWebpackPlugin({ url: 'http://localhost:8080' })
    ]
  });
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = webpackMerge(common, {
    devtool: 'source-map',
    // Define entry points needed for splitting
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      // Output using entry name
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      // Extract CSS during build
      loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: PATHS.app
      }]
    },
    plugins: [
      new Clean([PATHS.build]),
      // Output extracted CSS to a file
      new ExtractTextPlugin('styles.[chunkhash].css'),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  });
}
