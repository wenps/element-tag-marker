/*
 * @Date: 2025-02-28 14:28:09
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 16:09:14
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/initMethod.ts
 */
import { BaseOption } from "../../type";

/**
 * 为入口文件头一行添加生成父标签路径的函数
 * @param jsString - 要转换的 JavaScript 字符串
 * @param _filePath - 文件路径
 * @param _option - 基础配置
 * @returns 转换后的 JavaScript 字符串
 */
export default function initMethod(
  jsString: string,
  _filePath: any,
  _option: BaseOption
): string {
  // 若 jsString 为空则直接返回
  if (!jsString) return jsString;

  const codeToAdd = `window.generateParentTagPath = (val) => { return val?.tag || (console.log("父组件tag不存在"), ""); };`;

  // 若 jsString 已包含 codeToAdd 则直接返回，否则添加到开头
  return jsString.includes(codeToAdd) ? jsString : `${codeToAdd}\n${jsString}`;
}
