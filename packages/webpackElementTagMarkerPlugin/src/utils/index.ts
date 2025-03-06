/*
 * @Date: 2025-03-05 15:19:33
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 15:26:25
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/utils/index.ts
 */

import path from "path";
import webpack from "webpack";

/**
 * 从 Webpack 的入口配置中提取所有入口文件的路径。
 *
 * @param entry - Webpack 的入口配置，可以是字符串、数组、对象等多种形式。
 * @returns 包含所有入口文件路径的数组。
 */
export function getEntryFiles(entry: webpack.Entry): string[] {
  // 用于存储提取到的入口文件路径
  const files: string[] = [];

  /**
   * 递归处理入口配置项，将文件路径添加到 files 数组中。
   *
   * @param item - 入口配置项，可以是字符串、数组或包含 import 属性的对象。
   */
  const processEntry = (item: any) => {
    // 如果 item 是字符串，直接添加到 files 数组中
    if (typeof item === "string") files.push(item);
    // 如果 item 是数组，递归处理数组中的每个元素
    else if (Array.isArray(item)) item.forEach(processEntry);
    // 如果 item 是对象且包含 import 属性，递归处理 import 属性的值
    else if (item?.import) processEntry(item.import);
  };

  // 如果 entry 是对象，遍历对象的值并处理每个值
  if (typeof entry === "object") {
    Object.values(entry).forEach(processEntry);
  }
  // 返回包含所有入口文件路径的数组
  return files;
}

/**
 * 生成一个动态正则表达式，验证以下条件：
 *  - 文件名需以特定的扩展名结尾
 *  - 必须满足 `phrasesOptions.includePhrases` 中的条件中的至少一个条件（支持字符串和正则）
 *  - 不能满足 `phrasesOptions.excludePhrases` 中的任何条件（支持字符串和正则）
 *
 * @param extensions 文件扩展名数组 (如: ['.vue', '.tsx', '.jsx'])
 * @returns 动态生成的正则表达式
 */
export function generateAdvancedRegex(
  extensions: string[],
  phrasesOptions: {
    includePhrases: (string | RegExp)[];
    excludePhrases: (string | RegExp)[];
  }
): RegExp {
  // 转义扩展名，用于正则的结尾匹配
  const extensionsRegex = `(${extensions.map((ext) => ext.replace(".", "\\.")).join("|")})$`;

  /**
   * 处理短语，可以是字符串或正则
   *
   * @param phrase 待处理的短语，可以是字符串或正则表达式
   * @returns 处理后的正则表达式字符串
   */
  function phraseToRegex(phrase: string | RegExp): string {
    if (phrase instanceof RegExp) {
      // 如果是正则，直接取正则的源码
      return phrase.source;
    }
    // 如果是字符串，将其转义为安全正则
    return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const { includePhrases, excludePhrases } = phrasesOptions;

  // 构造包含正则：匹配至少一个短语/正则
  const includeRegex = includePhrases.length
    ? `(?=.*(${includePhrases.map(phraseToRegex).join("|")}))`
    : "";

  // 构造排除正则：不能匹配任意一个短语/正则
  const excludeRegex = excludePhrases.length
    ? `^(?!.*(${excludePhrases.map(phraseToRegex).join("|")}))`
    : "";

  // 拼接最终正则
  const finalRegex = `${excludeRegex}${includeRegex}.*${extensionsRegex}`;

  // 返回正则对象
  return new RegExp(finalRegex, "i");
}

/**
 * 生成一个正则表达式，生成精准路径匹配正则，匹配入口文件
 *
 * @param files - 一个包含文件路径的数组。
 * @returns 一个正则表达式对象，用于匹配数组中任何文件的完整路径。
 */
export function generateEntryRegex(files: string[]): RegExp {
  // 对每个文件路径进行处理，将其转换为正则表达式可以安全匹配的格式
  const escapedPaths = files.map((file) =>
    // 解析文件路径为绝对路径
    path
      .resolve(file)
      // 处理路径分隔符，使其在不同操作系统上都能正确匹配
      .replace(/[\\/]/g, "[\\\\/]")
      // 转义点号，确保在正则表达式中正确匹配
      .replace(/\./g, "\\.")
  );
  // 使用竖线分隔所有转义后的路径，构建一个匹配任何路径的正则表达式
  return new RegExp(`(${escapedPaths.join("|")})$`);
}

/**
 * 检查 webpack 规则配置中是否包含自定义加载器
 * @param rule webpack 规则配置对象
 * @returns {boolean} 如果包含自定义加载器返回 true，否则返回 false
 * @description 通过检查规则的 use 数组中是否存在 loader 路径包含 "customLoader/index.cjs" 的加载器来判断
 */
export const hasCustomLoader = (rule: any, loaderPath: string): boolean => {
  return (
    rule.use &&
    Array.isArray(rule.use) &&
    rule.use.some(({ loader }: { loader: string }) => {
      return loader && loader.includes(loaderPath);
    })
  );
};
