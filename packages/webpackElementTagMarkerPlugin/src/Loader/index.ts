/*
 * @Date: 2025-01-23 15:14:06
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 17:07:02
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/Loader/index.ts
 */
import { LoaderContext } from 'webpack'
import * as babel from '@babel/core'
import {
  filter,
  writeTagToFile,
  checkPath
} from "element-tag-marker-core";

/**
 * Webpack loader的配置选项类型
 */
type LoaderOptions = {
    [key: string]: any
}

/**
 * Webpack loader函数，用于处理源代码中的元素标记
 * 主要功能:
 * 1. 检查文件类型和路径是否符合要求
 * 2. 写入元素标记到文件
 * 3. 使用babel转换代码，应用标记过滤器
 * 
 * @param {string} source - 源代码内容
 * @returns {string} 处理后的代码
 */
module.exports = function(source: string): string {
    // 获取loader上下文
    const context = this as unknown as LoaderContext<LoaderOptions>
    const filePath = context.resourcePath

    // 检查文件路径是否符合配置要求
    if (!checkPath(filePath)) {
        return source;
    }
    
    // 将元素标记信息写入文件
    writeTagToFile(filePath);

    try {
        // 使用babel转换代码，应用自定义的标记过滤器插件
        const result = babel.transformSync(source, {
            configFile: false,
            plugins: [filter.default(filePath)],
        });
        
        // 返回转换后的代码，如果转换失败则返回原始代码
        return result?.code || source;
    } catch (error) {
        // 记录错误但不中断编译流程
        console.error('Element tag marker plugin error:', error);
        return source;
    }
        
}
