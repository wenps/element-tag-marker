/*
 * @Date: 2025-03-06 14:28:21
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 15:03:24
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/initLoader/index.ts
 */

/**
 * Webpack Loader 函数，用于处理源代码中的元素标记
 * @param {string} source 源代码内容
 * @returns {string} 处理后的代码
 */
module.exports = function (source: string) {
  console.log(source);
  return source;
};
