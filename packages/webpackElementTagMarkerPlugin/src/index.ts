
import webpack from "webpack";
import {
  OptionInfo,
  initOption,
  option,
  fileCache,
} from "element-tag-marker-core";
import path from "path";
import {
  getEntryFiles,
  generateAdvancedRegex,
  generateEntryRegex,
  hasCustomLoader
} from "./utils";

// 导出标记插件
export { markerPlugin } from "element-tag-marker-core";

const PLUGIN_NAME = "webpackElementTagMarkerPlugin";

/**
 * 允许处理的文件扩展名列表
 * 只单纯处理 js 可能会导致一些莫名其妙的问题，所以需要结合用户的配置，只处理指定目录
 */
const allowedExtensions = [".vue", ".tsx", ".jsx", ".js", ".ts"];

/**
 * Webpack 插件类，用于自动处理标记
 */
export default class webpackElementTagMarkerPlugin {
  private test: RegExp;

  /**
   * 构造函数
   * 
   * @param optionInfo 插件配置选项
   *                   如果传入该参数，则使用该配置初始化插件；若未传入，则使用默认配置
   */
  constructor(optionInfo: OptionInfo) {
    
    
    // 生成动态正则表达式，用于匹配允许处理的文件
    this.test = generateAdvancedRegex(allowedExtensions, {
      includePhrases: option.includePath,
      excludePhrases: option.excludedPath
    });

    // 初始化插件配置
    // 如果传入了配置选项，则使用该配置进行初始化
    // 若未传入，则使用默认配置
    if (optionInfo) {
      initOption(optionInfo);
    } else {
      initOption();
    }
  }

  /**
   * Webpack 插件应用方法
   * 
   * @param compiler Webpack 编译器实例
   */
  apply(compiler: webpack.Compiler) {
    // 清空缓存，每次启动 Webpack 都会重置 Map 表
    fileCache.clear();

    // 判断当前是否为生产环境，如果是生产环境，且不在生产环境产生功能时，不处理标记
    if (compiler.options.mode === "production" && !option.toProd) {
      return;
    }

    // 检查是否包含自定义核心加载器
    const hasCoreCustomLoader = (rule: any): boolean => {
      return hasCustomLoader(rule, "customLoader/index.cjs");
    }

    // 检查是否包含自定义初始化加载器
    const hasInitCustomLoader = (rule: any): boolean => {
      return hasCustomLoader(rule, "initLoader/index.cjs");
    }

    /**
     * 检查是否可以添加新的 loader 规则
     * @param rules Webpack 配置中的规则数组
     * @returns 如果可以添加新规则，返回 true，否则返回 false
     */
    const canAddLoaderRule = (rules: any[] | undefined, loaderCheck: (rule: any) => boolean): boolean => {
      return !!(rules && !rules.some(loaderCheck));
    };

    // 核心函数 文件处理新增标记
    // 添加 Loader 时共享缓存
    compiler.hooks.environment.tap(PLUGIN_NAME, () => {
      // 初始化 init Loader，对代码首文件进行补充，添加 init Loader 到 Webpack 配置
      if (option.initMethod) {
        // 生成入口文件列表
        const entryFiles = getEntryFiles(compiler.options.entry as unknown as webpack.Entry);
    
        if (entryFiles.length > 0) {
          const entryRegex = generateEntryRegex(entryFiles);
          const rules = compiler.options.module.rules;
    
          if (canAddLoaderRule(rules, hasInitCustomLoader)) {
            rules.push({
              test: entryRegex,
              enforce: "post", // 后置 Loader，确保在其他 Loader 之后执行
              use: [
                {
                  // 基于 loader 处理入口文件
                  loader: path.resolve(__dirname, "./initLoader/index.cjs"),
                },
              ],
            });
          }
        }
      }
    
      // 初始化核心 Loader，对代码进行解析，添加核心 Loader 到 Webpack 配置
      const rules = compiler.options.module.rules;
      if (canAddLoaderRule(rules, hasCoreCustomLoader)) {
        rules.push({
          // loader 只能处理 js，因此这里需要作为后置 loader 进行插入
          test: this.test,
          enforce: "post", // 后置 Loader，确保在其他 Loader 之后执行
          use: [
            {
              // 基于 loader 批量处理虚拟 dom
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
