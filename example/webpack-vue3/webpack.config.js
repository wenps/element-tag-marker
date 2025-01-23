/*
 * @Date: 2025-01-23 13:44:00
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 18:21:01
 * @FilePath: /element-tag-marker/example/webpack-vue3/webpack.config.js
 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackElementTagMarkerPlugin  = require('webpack-element-tag-marker-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpackElementTagMarkerPlugin({
      option: {
          writeToFile: 'hash',
          tagType: 'hash'
      }
  })
  ],
  devServer: {
    port: 3000,
    hot: true
  }
}; 