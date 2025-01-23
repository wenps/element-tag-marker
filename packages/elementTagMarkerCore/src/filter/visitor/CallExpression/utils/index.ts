/*
 * @Date: 2025-01-22 19:23:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 10:03:27
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/utils/index.ts
 */

import * as t from "@babel/types";
/**
 * 向props对象添加标记属性
 * @param {string} tag - 标记属性名
 * @param {string} value - 标记属性值
 */
export const setAttr = (tag: string, value: string, propsArg: t.ObjectExpression) => {
  const tagProperty = t.objectProperty(
    t.identifier(tag),
    t.stringLiteral(value)
  );
  propsArg.properties.push(tagProperty);
};