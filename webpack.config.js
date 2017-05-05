let path = require('path');
let webpack = require('webpack');
let BabiliPlugin = require("babili-webpack-plugin");

let productionPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // new webpack.optimize.DedupePlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  // new webpack.optimize.OccurenceOrderPlugin(),
];

let productionPluginsES5 = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: false,
      drop_debugger: false,
      dead_code: true,
      evaluate: true,
      unused: true,
    },
    output: {
      ascii_only: true,
    },
  }),
];

let productionPluginsES6 = [
  new BabiliPlugin({
    removeConsole: false,
    removeDebugger: false,
  })
];

module.exports = {
  devtool: 'source-map',
  entry: [
    //'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chango.js',
    library: 'chango',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|public\/)/,
        use: {
          loader: "babel-loader",
          options: {
            "plugins": [].concat(
              (process.env.NODE_ENV === 'production') ? [] : [],
              ["transform-runtime"],

              ["transform-object-rest-spread", "transform-class-properties"]
            ),
            "presets": [].concat(
              (process.env.ES_TARGET === 'es5') ? [["es2015", { "modules": false }]] : [],
              ["es2016", "es2017"],
              ["flow"]
            ),
          },
        },
      },
    ]
  },

  plugins: [].concat(
    (process.env.NODE_ENV === 'production') ? productionPlugins : [],
    (process.env.NODE_ENV === 'production') ? process.env.ES_TARGET === 'es5' ? productionPluginsES5 : productionPluginsES6 : [],
    [
  ]),
};
