/*
 * @Author: 小山
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-01-09 19:12:52
 * @FilePath: /element-tag-marker/packages/viteElementTagMarkerPlugin/src/index.ts
 */

import { Plugin } from "vite";
import {
  OptionInfo,
  initOption,
  filter,
  option
} from "../../elementTagMarkerCorePlugin/src/index";
import * as babel from "@babel/core";

export default function viteElementTagMarkerPlugin(
  optionInfo: OptionInfo
): any {
  const name = "vite-plugin-auto-i18n";

  initOption(optionInfo);
  const plugin: Plugin = {
    name,
    async transform(code: string, path: string) {
      // 生成hash标签
      const hashValue = option.hashFunction(path);
      try {
        let result = babel.transformSync(code, {
          configFile: false,
          plugins: [filter.default(hashValue)],
        });

        return result?.code;
      } catch (e) {
        console.error(e);
      }
    },
  };

  return plugin;
}
