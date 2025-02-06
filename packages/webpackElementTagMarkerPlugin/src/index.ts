/*
 * @Author: xiaoshanwen
 * @Date: 2024-03-01 11:27:03
 * @LastEditTime: 2025-02-06 10:28:01
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/index.ts
 */
import webpack from 'webpack'
import {
  OptionInfo,
  initOption,
  option
 } from "element-tag-marker-core";
import path from 'path';
import { Compilation } from 'webpack';

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
                    test: generateAdvancedRegex(allowedExtensions),
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

/**
 * 允许处理的文件扩展名列表，如果这里只单纯处理js可能会导致一些莫名其妙的问题，所以需要结合用户的配置，只处理指定目录
 */
const allowedExtensions = ['.vue', '.tsx', '.jsx', '.js', '.ts']
/**
 * 生成一个动态正则表达式，验证以下条件：
 *  - 文件名需以特定的扩展名结尾
 *  - 必须满足`option.includePath`中的条件`中的至少一个条件（支持字符串和正则）
 *  - 不能满足`option.excludedPath`中的任何条件（支持字符串和正则）
 *
 * @param extensions 文件扩展名数组 (如: ['.vue', '.tsx', '.jsx'])
 * @returns 动态生成的正则表达式
 */
function generateAdvancedRegex(
    extensions: string[]
): RegExp {
    // 转义扩展名，用于正则的结尾匹配
    const extensionsRegex = `(${extensions.map(ext => ext.replace('.', '\\.')).join('|')})$`;

    // Helper: 处理短语，可以是字符串或正则
    function phraseToRegex(phrase: string | RegExp): string {
        if (phrase instanceof RegExp) {
            // 如果是正则，直接取正则的源码
            return phrase.source;
        } else {
            // 如果是字符串，将其转义为安全正则
            return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
    }
    const includePhrases = option.includePath
    const excludePhrases = option.excludedPath

    // 构造包含正则：匹配至少一个短语/正则
    const includeRegex = includePhrases.length
        ? `(?=.*(${includePhrases.map(phraseToRegex).join('|')}))`
        : '';

    // 构造排除正则：不能匹配任意一个短语/正则
    const excludeRegex = excludePhrases.length
        ? `^(?!.*(${excludePhrases.map(phraseToRegex).join('|')}))`
        : '';

    // 拼接最终正则
    const finalRegex = `${excludeRegex}${includeRegex}.*${extensionsRegex}`;

    // 返回正则对象
    return new RegExp(finalRegex, 'i'); // 'i' 表示不区分大小写
}