/*
 * @Date: 2025-02-06 16:17:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-10 17:31:24
 * @FilePath: /element-tag-marker/example/webpack-vue2/webpack.config.js
 */
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackElementTagMarkerPlugin = require("webpack-element-tag-marker-plugin");

// 生成vue2标注插件实例
const GenerateSingleVue2EleIdByPathPlugin =
  new webpackElementTagMarkerPlugin.markerPlugin.GenerateSingleVue2EleIdByPathPluginClass.default();

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpackElementTagMarkerPlugin.default({
      option: {
        writeToFile: "hash",
        tagType: "path",
        markerPlugin: GenerateSingleVue2EleIdByPathPlugin
      },
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
  },
};
