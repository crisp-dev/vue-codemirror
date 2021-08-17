
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => path.join(__dirname, '..', dir)

const env = process.env.NODE_ENV === 'testing'
  ? { NODE_ENV: '"testing"' }
  : { NODE_ENV: '"production"' }

const mode = process.env.NODE_ENV === 'testing'
  ? "development"
  : "production"

module.exports = {
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
        }
      })
    ]
  }
}
