/*
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/index.ts
 */
import webpack from "webpack";
import {
  OptionInfo,
  initOption,
  option,
  fileCache,
} from "element-tag-marker-core";
import path from "path";

// 导出标记插件
export { markerPlugin } from "element-tag-marker-core";

const PLUGIN_NAME = "webpackElementTagMarkerPlugin";

/**
 * Webpack 插件类，用于自动处理标记
 */
export default class webpackElementTagMarkerPlugin {
  private test: RegExp;

  /**
   * 构造函数
   * @param optionInfo 插件配置选项
   */
  constructor(optionInfo: OptionInfo) {
    this.test = generateAdvancedRegex(allowedExtensions);
    // 初始化插件配置，如果没有传入配置则使用默认配置
    if (optionInfo) initOption(optionInfo);
    else initOption();
  }

  /**
   * Webpack 插件应用方法
   * @param compiler Webpack 编译器实例
   */
  apply(compiler: webpack.Compiler) {
    // 清空缓存，每次启动 Webpack 都会重置 Map 表
    fileCache.clear();

    // 判断当前是否为生产环境，如果是生产环境，且不在生产环境产生功能时，不处理标记
    if (compiler.options.mode === "production" && !option.toProd) {
      return;
    }

    // 检查是否已添加 Loader
    const hasCustomLoader = (rule: any) =>
      rule.use &&
      Array.isArray(rule.use) &&
      rule.use.some(({ loader }: { loader: string }) => {
        loader && loader.includes("customLoader/index.cjs");
      });
    // 添加 Loader 时共享缓存
    compiler.hooks.environment.tap(PLUGIN_NAME, () => {
      // 添加自定义 Loader 到 Webpack 配置
      if (
        compiler.options.module.rules &&
        !compiler.options.module.rules.some(hasCustomLoader)
      ) {
        compiler.options.module.rules.push({
          // loader 只能处理js 因此这里需要作为后置loader进行插入
          test: this.test,
          enforce: "post", // 后置 Loader，确保在其他 Loader 之后执行
          use: [
            {
              // 基于loader批量收集目标翻译内容
              loader: path.resolve(__dirname, "./customLoader/index.cjs"),
            },
          ],
        });
      }
    });

    // 构建完成后，清理缓存或更新 index
    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      console.log("⚙️ 构建完成，开始处理 fileCache 缓存...");

      // 遍历缓存，按规则处理（index = 1 -> index = 0, index = 0 -> 删除）
      Array.from(fileCache.entries()).forEach(([key, value]) => {
        if (value.index === 1) {
          value.index = 0; // 如果 index 为 1，则重置为 0
        } else if (value.index === 0) {
          fileCache.delete(key); // 如果 index 为 0，则删除缓存
          console.log(`🗑️ 缓存删除: ${key}`);
        }
      });

      console.log("✅ 文件缓存 更新完成");
    });
  }
}

/**
 * 允许处理的文件扩展名列表，如果这里只单纯处理js可能会导致一些莫名其妙的问题，所以需要结合用户的配置，只处理指定目录
 */
const allowedExtensions = [".vue", ".tsx", ".jsx", ".js", ".ts"];

/**
 * 生成一个动态正则表达式，验证以下条件：
 *  - 文件名需以特定的扩展名结尾
 *  - 必须满足`option.includePath`中的条件`中的至少一个条件（支持字符串和正则）
 *  - 不能满足`option.excludedPath`中的任何条件（支持字符串和正则）
 *
 * @param extensions 文件扩展名数组 (如: ['.vue', '.tsx', '.jsx'])
 * @returns 动态生成的正则表达式
 */
function generateAdvancedRegex(extensions: string[]): RegExp {
  // 转义扩展名，用于正则的结尾匹配
  const extensionsRegex = `(${extensions.map((ext) => ext.replace(".", "\\.")).join("|")})$`;

  // Helper: 处理短语，可以是字符串或正则
  function phraseToRegex(phrase: string | RegExp): string {
    if (phrase instanceof RegExp) {
      // 如果是正则，直接取正则的源码
      return phrase.source;
    }
    // 如果是字符串，将其转义为安全正则
    return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const includePhrases = option.includePath;
  const excludePhrases = option.excludedPath;

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
