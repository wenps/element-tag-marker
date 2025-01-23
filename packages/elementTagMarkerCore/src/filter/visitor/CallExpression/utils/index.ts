/*
 * @Date: 2025-01-22 19:23:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 17:19:51
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

/**
 * 将标记属性设置到对象中
 * @param {[string, string][] | { tag:string, tagValue:string }} res - 标记属性信息
 * @param {t.ObjectExpression} attrsObj - 目标对象表达式
 */
export function setObjAttrToObj(res: [string, string][] | { tag:string, tagValue:string }, attrsObj: t.ObjectExpression) {
  if (Array.isArray(res)) {
    // 如果是数组形式,循环添加多个标记属性
    res.forEach(([tag, value]) => {
      setAttr(tag, value, attrsObj);
    });
  } else {
    // 单个标记属性直接添加
    setAttr(res.tag, res.tagValue, attrsObj);
  }
}