/*
 * @Date: 2025-01-23 13:43:39
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-08 10:52:25
 * @FilePath: /element-tag-marker/example/webpack-react/webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackElementTagMarkerPlugin  = require('webpack-element-tag-marker-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpackElementTagMarkerPlugin({
      option: {
          writeToFile: 'hash',
          tagType: 'path'
      }
  })
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
}; 