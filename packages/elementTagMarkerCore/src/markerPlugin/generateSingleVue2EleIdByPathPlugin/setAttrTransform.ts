/*
 * @Date: 2025-03-06 17:55:08
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 18:48:42
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/setAttrTransform.ts
 */

import { BaseOption } from "../../type";
import { types as t } from "@babel/core";
export default function setAttrTransform(
  val: string,
  _option: BaseOption
): t.BinaryExpression {
  // 创建 "(parentTagPath || '') + val" 的 AST 节点
  const ast = t.binaryExpression('+', t.logicalExpression('||', t.identifier('parentTagPath'), t.stringLiteral('')), t.stringLiteral(val));
  return ast;
}
