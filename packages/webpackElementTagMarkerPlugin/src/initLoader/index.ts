/*
 * @Date: 2025-03-06 14:28:21
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-07 11:35:39
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/initLoader/index.ts
 */

import { LoaderContext } from "webpack";
import { option } from "element-tag-marker-core";

/**
 * Webpack loader的配置选项类型
 */
type LoaderOptions = {
  [key: string]: any;
};
/**
 * Webpack Loader 函数，用于处理源代码中的元素标记
 * @param {string} source 源代码内容
 * @returns {string} 处理后的代码
 */
module.exports = function (source: string, ) {
  // 获取loader上下文
  const context = this as unknown as LoaderContext<LoaderOptions>;
  const filePath = context.resourcePath;
  // 获取loader传入的参数entryFiles
  const entryFiles = context?.getOptions()?.entryFiles;
  // 检查 option 是否有 initMethod 属性
  if ('initMethod' in option && typeof option.initMethod === 'function') {
    return option.initMethod(source, [filePath, entryFiles]);
  }
  return source;
};
