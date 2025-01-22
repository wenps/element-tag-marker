/*
 * @Date: 2025-01-22 11:16:53
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-22 11:35:25
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/option.ts
 */

import { option } from "src/option";
import { checkAgainstRegexArray } from "./path";

// 检查标签是否需要处理
export function checkTag(tagName: string) {
  if (option.excludedTag.includes(tagName)) {
    return false;
  }
  if (option.includeTag.length > 0 && !option.includeTag.includes(tagName)) {
    return false;
  }
  return true;
}
// 检查文件路径是否符合包含/排除规则
export function checkPath(path: string) {
  if (
    option.includePath.length &&
    !checkAgainstRegexArray(path, option.includePath)
  ) {
    return false;
  }
  if (
    option.excludedPath.length &&
    checkAgainstRegexArray(path, option.excludedPath)
  ) {
    return false;
  }
  return true;
}
