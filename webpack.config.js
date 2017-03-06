const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const extractSass = new ExtractTextPlugin({
    //filename: "[name].[contenthash].css",
    filename: "[name].bundle.css",
    disable: process.env.NODE_ENV === "development"
});

const config = {
  entry: {
    app: ['./src/index']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      // use: [{ loader: /*'babel-loader'*/ }]
    }, {
      test: /\.scss$/,
      loader: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, './src'),
              'node_modules'
            ]
          }
        }]
      })
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/build'
  },
  plugins: [
    extractSass
  ],
  resolve: {
    extensions: ['.js', '.sass', '.css'],
    modules: [
      path.join(__dirname, './src'),
      'node_modules'
    ]
  }
}

module.exports = config