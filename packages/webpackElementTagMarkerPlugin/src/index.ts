/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2025-01-23 17:06:53
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/index.ts
 */
import webpack from 'webpack'
import {
  OptionInfo,
  initOption
 } from "element-tag-marker-core";
import path from 'path';
import { Compilation } from 'webpack';

/**
 * 允许处理的文件扩展名列表
 */
const allowedExtensions = ['.vue', '.ts', '.js', '.tsx', '.jsx']

/**
 * 生成文件扩展名的正则表达式
 * @param extensions 扩展名数组
 * @returns 匹配指定扩展名的正则表达式
 */
function generateFileExtensionRegex(extensions: string[]) {
    // 将扩展名数组转换为正则表达式字符串
    const regexString = extensions.map(ext => ext.replace('.', '\\.')).join('|')
    // 返回完整的正则表达式
    return new RegExp(`\(${regexString})$`)
}

/**
 * Webpack插件类，用于自动处理标记
 */
export default class webpackElementTagMarkerPlugin {
    /**
     * 构造函数
     * @param optionInfo 插件配置选项
     */
    constructor(optionInfo: OptionInfo) {
        // 初始化插件配置，如果没有传入配置则使用默认配置
        if(optionInfo) initOption(optionInfo);
        else initOption();
    }

    /**
     * Webpack插件应用方法
     * @param compiler Webpack编译器实例
     */
    apply(compiler: webpack.Compiler) {
        // 在编译开始前注册异步钩子
        compiler.hooks.beforeCompile.tapAsync('webpackElementTagMarkerPlugin', (_params: Compilation["params"], callback: (err?: Error) => void) => {
            // 添加自定义 loader 到 Webpack 配置
            if (compiler.options.module.rules) {
                compiler.options.module.rules.push({
                    // loader 只能处理js 因此这里需要作为后置loader进行插入
                    test: generateFileExtensionRegex(allowedExtensions),
                    enforce: 'post', // 后置loader确保在其他loader之后执行
                    use: [
                        {
                            // 基于loader批量收集目标翻译内容
                            loader: path.resolve(__dirname, './Loader/index.cjs')
                        }
                    ]
                })
            }
            callback()
        })
    }
}
