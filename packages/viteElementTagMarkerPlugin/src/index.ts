/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-01-21 15:50:27
 * @FilePath: /element-tag-marker/packages/viteElementTagMarkerPlugin/src/index.ts
 * @Description: Vite插件，用于在构建过程中为元素添加标记
 */

import { Plugin } from "vite";
import * as babel from "@babel/core";
import { checkAgainstRegexArray,
  OptionInfo,
  initOption,
  filter,
  option,
  writeTagToFile
 } from "element-tag-marker-core-plugin";

/**
 * 创建一个Vite插件，用于为元素添加标记
 * @param {OptionInfo} optionInfo - 插件配置选项
 * @returns {Plugin} Vite插件实例
 */
export default function viteElementTagMarkerPlugin(optionInfo?: OptionInfo): Plugin {
  const name = "vite-plugin-element-tag-marker";

  // 初始化插件配置
  if(optionInfo) initOption(optionInfo);
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
      
      // 检查文件类型是否符合要求
      if (!path.match(/\.(js|jsx|ts|tsx|vue)$/)) {
        return code;
      }

      // 检查文件路径是否符合包含/排除规则
      if (option.includePath.length && !checkAgainstRegexArray(path, option.includePath)) {
        return code;
      }
      if (option.excludedPath.length && checkAgainstRegexArray(path, option.excludedPath)) {
        return code;
      }

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
