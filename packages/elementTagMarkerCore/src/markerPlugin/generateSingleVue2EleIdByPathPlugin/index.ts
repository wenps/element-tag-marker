/*
 * @Date: 2025-02-28 14:28:36
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-07 14:16:34
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/index.ts
 */

import { OptionPlugin } from "./../pluginClass";
import originClass from "../pluginClass";
import initMethod from "./initMethod";
import setAttrTransform from "./setAttrTransform";


/**
 * 一个用于根据路径生成单个Vue 2元素ID的工具类。
 * 继承自`originClass`，使用传入的转换函数进行初始化。
 */
export default class GenerateSingleVue2EleIdByPathPlugin extends originClass {
  /**
   * 构造函数，初始化`GenerateSingleVue2EleIdByPathPlugin`实例。
   *
   * @param transform - 一个转换函数，用于处理特定的逻辑。
   */
  constructor(optionPlugin: OptionPlugin) {
    // 调用父类的构造函数，传入转换函数
    super(optionPlugin);
    this.initMethod = (source: string, filePath: any) =>
      initMethod(source, filePath, this.option);
    /**
     * 默认切割 /src/ 后的内容。
     */
    this.setAttrTransform = (val: string) => setAttrTransform(val, this.option);
  }
}
