/*
 * @Date: 2025-03-06 17:55:08
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-07 11:01:24
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/setAttrTransform.ts
 */

import { BaseOption } from "../../type";
import { types as t } from "@babel/core";
export default function setAttrTransform(
  val: string,
  _option: BaseOption
): t.BinaryExpression {
  const realVal = "[" + val.toString().split("/src/")[1] + "]";
  // 创建 "[parentTagPath || ''] + [realVal]" 的 AST 节点
  const ast = t.binaryExpression('+', t.logicalExpression('||', t.identifier('parentTagPath'), t.stringLiteral('')), t.stringLiteral(realVal));
  return ast;
}
