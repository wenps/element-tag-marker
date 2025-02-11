// /element-tag-marker/packages/webpackElementTagMarkerPlugin/src/index.ts
import webpack from "webpack";
import path from "path";
import { OptionInfo, initOption, option, fileCache } from "element-tag-marker-core";

const PLUGIN_NAME = "webpackElementTagMarkerPlugin";

export default class webpackElementTagMarkerPlugin {
  /**
   * 插件的构造函数
   * @param optionInfo 插件的配置选项，可选
   */
  constructor(optionInfo?: OptionInfo) {
    optionInfo ? initOption(optionInfo) : initOption();
  }

  /**
   * 应用 Webpack 插件
   * @param compiler Webpack 编译器实例
   */
  apply(compiler: webpack.Compiler): void {
    // 清空内存缓存，确保在每次构建时重新初始化缓存
    fileCache.clear();

    // 如果是生产模式且标记功能未启用，则直接退出
    if (compiler.options.mode === "production" && !option.toProd) return;

    // 在 Webpack 编译前挂载 Loader
    compiler.hooks.beforeCompile.tapAsync(
      PLUGIN_NAME,
      (_params: any, callback: (err?: Error) => void): void => {
        // 检查是否已有自定义 Loader
        const hasCustomLoader = (rule: any) =>
          rule.use &&
          Array.isArray(rule.use) &&
          rule.use.some(({ loader }: { loader: string }) =>
            loader.includes("customLoader/index.cjs")
          );

        if (
          compiler.options.module.rules &&
          !compiler.options.module.rules.some(hasCustomLoader)
        ) {
          compiler.options.module.rules.push({
            test: generateAdvancedRegex(allowedExtensions),
            enforce: "post", // 确保自定义 Loader 最后执行
            use: [
              {
                loader: path.resolve(__dirname, "./customLoader/index.cjs"),
              },
            ],
          });
        }
        callback();
      }
    );

    // 在构建完成后清理缓存
    compiler.hooks.done.tap(PLUGIN_NAME, (): void => {
      console.log("⚙️ 构建完成，开始清理 fileCache 缓存...");

      const cacheExpireTime = 2; // 缓存条目保留的构建周期数，用户可配置
      Array.from(fileCache.entries()).forEach(([key, value]) => {
        if (value.used >= cacheExpireTime) {
          // 如果条目已超期，删除缓存
          fileCache.delete(key);
          // console.log(`🗑️ 缓存删除: ${key}`);
        } else {
          // 未超期的条目增加使用计数
          value.used += 1;
        }
      });

      console.log("✅ 文件缓存已清理");
    });
  }
}

const allowedExtensions: string[] = [".vue", ".tsx", ".jsx", ".js", ".ts"];

/**
 * 动态生成正则表达式，用于匹配指定的文件路径和扩展名
 * @param extensions 文件扩展名数组
 * @returns 生成的正则表达式
 */
function generateAdvancedRegex(extensions: string[]): RegExp {
  const extensionsRegex = `(${extensions.map((ext) => ext.replace(".", "\\.")).join("|")})$`;

  // 将字符串或正则表达式转化为安全的正则表达式字符串
  function phraseToRegex(phrase: string | RegExp): string {
    if (phrase instanceof RegExp) return phrase.source;
    return phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const includeRegex = option.includePath.length
    ? `(?=.*(${option.includePath.map(phraseToRegex).join("|")}))`
    : "";
  const excludeRegex = option.excludedPath.length
    ? `^(?!.*(${option.excludedPath.map(phraseToRegex).join("|")}))`
    : "";

  const finalRegex = `${excludeRegex}${includeRegex}.*${extensionsRegex}`;
  return new RegExp(finalRegex, "i");
}
