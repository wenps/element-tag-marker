import { getKeyValue, checkTag } from "src/utils";
import { setObjAttrToObj } from "../utils";
import * as t from "@babel/types";

/*
 * @Date: 2025-01-22 19:22:30
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 17:21:56
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/jsxDEV.ts
 */
export default function (node: any, filePath: string) {
  // 获取第一个参数(标签名)
  const tagName = node.arguments[0].value;

  if (!checkTag(tagName)) return;

  // 获取第二个参数(props对象)
  const propsArg = node.arguments[1];

  // 如果props对象存在且是对象表达式,则添加标记属性
  if (propsArg && t.isObjectExpression(propsArg)) {
    // 获取需要添加的标记属性
    const res = getKeyValue({ path: filePath, elementTag: node });

    // 根据返回结果类型添加标记属性
    setObjAttrToObj(res, propsArg)
  }
}