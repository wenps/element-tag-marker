/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-03-05 14:12:15
 * @FilePath: /element-tag-marker/packages/viteElementTagMarkerPlugin/src/index.ts
 * @Description: Vite插件，用于在构建过程中为元素添加标记
 */

import { Plugin } from "vite";
import * as babel from "@babel/core";
import {
  option,
  OptionInfo,
  initOption,
  filter,
  writeTagToFile,
  checkPath,
} from "element-tag-marker-core";

// 导出标记插件
export { markerPlugin } from "element-tag-marker-core";

/**
 * 创建一个Vite插件，用于为元素添加标记
 * @param {OptionInfo} optionInfo - 插件配置选项
 * @returns {Plugin} Vite插件实例
 */
export default function viteElementTagMarkerPlugin(
  optionInfo?: OptionInfo
): Plugin {
  const name = "vite-plugin-element-tag-marker";

  // 初始化插件配置
  if (optionInfo) initOption(optionInfo);
  else initOption();

  const plugin: Plugin = {
    name,
    /**
     * 转换源代码，为元素添加标记
     * @param {string} code - 源代码
     * @param {string} path - 文件路径
     * @returns {string} 转换后的代码
     */
    async transform(code: string, path: string) {
      // 如果在生产环境，且标注生产环境不生效，就直接跳过
      if (process.env.NODE_ENV === "production" && !option.toProd) {
        return code;
      }

      // 检查文件类型是否符合要求
      if (!path.match(/\.(js|jsx|ts|tsx|vue)$/)) {
        return code;
      }

      // 检查文件路径是否符合要求
      if (!checkPath(path)) return code;

      // 将tag标识写入文件
      writeTagToFile(path);

      try {
        // 使用babel转换代码，应用标记过滤器
        let result = babel.transformSync(code, {
          configFile: false,
          plugins: [filter.default(path)],
        });
        return result?.code;
      } catch (e) {
        console.error(e);
      }
    },
  };

  return plugin;
}
