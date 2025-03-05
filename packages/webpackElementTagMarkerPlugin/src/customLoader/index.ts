/*
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/customLoader/index.ts
 */
import { LoaderContext } from "webpack";
import * as babel from "@babel/core";
import {
  filter,
  writeTagToFile,
  checkPath,
  fileCache,
  option,
} from "element-tag-marker-core";
import crypto from "crypto";

/**
 * Webpack loader的配置选项类型
 */
type LoaderOptions = {
  [key: string]: any;
};

/**
 * 生成文件内容的哈希值
 * @param content 文件内容
 * @returns 哈希值
 */
function generateHash(content: string): string {
  return crypto.createHash("md5").update(content).digest("hex");
}

/**
 * Webpack Loader 函数，用于处理源代码中的元素标记
 * @param {string} source 源代码内容
 * @returns {string} 处理后的代码
 */
module.exports = function (source: string): string {
  // 获取loader上下文
  const context = this as unknown as LoaderContext<LoaderOptions>;
  const filePath = context.resourcePath;

  // 获取插件的共享缓存
  const cache = fileCache as Map<string, any>;

  // 检查缓存是否存在
  if (!cache) {
    throw new Error("文件缓存不存在?"); // 抛出错误提示缓存不存在
  }

  // 启用缓存
  context.cacheable && context.cacheable(true);

  // 检查文件路径是否符合配置要求
  if (!checkPath(filePath)) {
    return source; // 如果不符合处理规则，直接返回源代码
  }

  // 生成当前文件内容的哈希值
  const contentHash = generateHash(source);

  // 检查缓存，如果内容没有发生变化则直接返回缓存中的处理结果
  if (cache.get(filePath + contentHash)) {
    // 命中缓存标识，更新缓存索引
    cache.get(filePath + contentHash).index = 1;
    return cache.get(filePath + contentHash).result; // 返回缓存中的处理结果
  }

  // 将元素标记信息写入文件
  writeTagToFile(filePath);

  try {
    let transformedCode = source; // 初始化转换后的代码为源代码
    // 如果存在beforeTransform函数，则调用它进行预处理
    if (typeof option.beforeTransform === "function") {
      transformedCode = option.beforeTransform(source, filePath);
    }
    // 使用 Babel 转换代码，应用自定义的标记过滤器插件
    const result = babel.transformSync(transformedCode, {
      configFile: false, // 禁用 Babel 配置文件
      plugins: [filter.default(filePath)], // 应用过滤器插件
    });

    // 如果存在afterTransform函数，则调用它进行后处理
    if (typeof option.afterTransform === "function") {
      transformedCode = option.afterTransform(result?.code || source, filePath);
    }

    transformedCode = result?.code || source; // 获取转换后的代码

    // 将结果存入缓存
    cache.set(filePath + contentHash, {
      result: transformedCode, // 存储处理结果
      index: 1, // 更新缓存索引
    });

    return transformedCode; // 返回处理后的代码
  } catch (error) {
    // 捕获并打印处理异常
    console.error("文件处理异常: ", filePath);
    console.error(error);
    return source; // 返回源代码以防止程序崩溃
  }
};
