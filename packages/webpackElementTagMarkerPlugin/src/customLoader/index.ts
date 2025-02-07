/*
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/customLoader/index.ts
 */
import { LoaderContext } from 'webpack';
import * as babel from '@babel/core';
import { filter, writeTagToFile, checkPath } from 'element-tag-marker-core';
import crypto from 'crypto';

/**
 * Webpack loader的配置选项类型
 */
type LoaderOptions = {
    [key: string]: any
}

/**
 * 生成文件内容的哈希值
 * @param content 文件内容
 * @returns 哈希值
 */
function generateHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Webpack Loader 函数，用于处理源代码中的元素标记
 * @param {string} source 源代码内容
 * @returns {string} 处理后的代码
 */
module.exports = function (source: string): string {
  // 获取loader上下文
  const context = this as unknown as LoaderContext<LoaderOptions>
  const filePath = context.resourcePath;
  const cache = context.getOptions()?.cache as Map<string, any>; // 通过 options 获取插件的共享缓存

  if (!cache) {
    throw new Error('文件缓存不存在?');
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
    console.log('命中缓存');
    
    // 命中缓存标识
    cache.get(filePath + contentHash).index = 1
    return cache.get(filePath + contentHash).result;
  }
  console.log('未命中缓存');

  // 将元素标记信息写入文件
  writeTagToFile(filePath);

  try {
    // 使用 Babel 转换代码，应用自定义的标记过滤器插件
    const result = babel.transformSync(source, {
      configFile: false,
      plugins: [filter.default(filePath)],
    });

    const transformedCode = result?.code || source;

    // 将结果存入缓存
    cache.set(filePath + contentHash, {
      result: transformedCode,
      index: 1
    })

    return transformedCode;
  } catch (error) {
    console.error('文件处理异常: ', filePath);
    console.error(error);
    return source;
  }
};