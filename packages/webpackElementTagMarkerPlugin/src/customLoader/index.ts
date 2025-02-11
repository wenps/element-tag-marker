// /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/customLoader/index.ts
import { LoaderContext } from "webpack";
import * as babel from "@babel/core";
import { filter, writeTagToFile, checkPath, fileCache } from "element-tag-marker-core";
import fs from "fs";
import murmur from "murmurhash"; // 使用 Murmurhash 算法替代 MD5

// 定义 Loader 的配置选项类型
type LoaderOptions = {
  [key: string]: any;
};

/**
 * 生成部分内容的哈希值，帮助快速判断文件内容是否改变
 * @param content 文件内容
 * @returns 文件内容前 1000 个字符的哈希值
 */
function generatePartialHash(content: string): string {
  const partialContent = content.slice(0, 1000); // 取文件的前 1000 字节
  return murmur.v3(partialContent).toString();
}

/**
 * 根据文件信息生成缓存键
 * @param filePath 文件路径
 * @returns 缓存键，由路径 + 修改时间 + 文件大小组成
 */
function generateFileKey(filePath: string): string {
  const stats = fs.statSync(filePath); // 读取文件元数据
  return `${filePath}-${stats.mtimeMs}-${stats.size}`;
}

/**
 * Webpack 的加载器主函数
 * @param source 文件的源代码
 * @returns 转换后的代码
 */
module.exports = function (source: string): string {
  const context = this as unknown as LoaderContext<LoaderOptions>; // 获取当前的 Loader 上下文
  const filePath = context.resourcePath; // 获取当前文件路径

  // 启用 Webpack 缓存
  context.cacheable && context.cacheable(true);

  // 检查文件路径是否符合配置规则
  if (!checkPath(filePath)) {
    return source; // 如果不符合规则，直接返回源代码
  }

  // 使用文件路径和元数据生成缓存键
  const cacheKey = generateFileKey(filePath);

  // 检查内存缓存是否命中
  const cached = fileCache.get(cacheKey);
  if (cached) {
    cached.used = 0; // 如果命中缓存，重置使用计数
    return cached.result;
  }

  // console.log("⚙️ 未命中缓存，开始处理文件:", filePath);

  // 将标记信息写入文件
  writeTagToFile(filePath);

  try {
    // 使用 Babel 插件处理代码
    const result = babel.transformSync(source, {
      configFile: false,
      plugins: [filter.default(filePath)],
    });

    const transformedCode = result?.code || source;

    // 将处理结果存入缓存
    fileCache.set(cacheKey, {
      result: transformedCode, // 转换后的代码
      used: 0, // 初始化缓存使用计数
    });

    return transformedCode;
  } catch (error) {
    console.error("❌ 文件处理错误:", filePath, error);
    return source; // 如果出错，返回原始代码
  }
};
