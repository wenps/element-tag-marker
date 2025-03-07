/*
 * @Date: 2025-03-06 17:55:08
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-07 16:25:26
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/setAttrTransform.ts
 */

// 获取生成父标签路径的 AST Node
function getGenerateParentTagAstNode() {
  // 此变量声明用于存储父标签路径，在 window.generateParentTagPath 函数可用时调用该函数，否则将其设为空字符串
  const parentTagPath =
    // 使用条件表达式判断 window.generateParentTagPath 是否可用
    t.conditionalExpression(
      // 使用逻辑与表达式检查 window.generateParentTagPath 是否存在且为函数类型
      t.logicalExpression(
        "&&",
        // 检查 window 对象上是否存在 generateParentTagPath 属性
        t.memberExpression(
          t.identifier("window"),
          t.identifier("generateParentTagPath"),
          false
        ),
        // 检查 window.generateParentTagPath 是否为函数类型
        t.binaryExpression(
          "===",
          // 使用 typeof 运算符检查 window.generateParentTagPath 的类型
          t.callExpression(t.identifier("typeof"), [
            t.memberExpression(
              t.identifier("window"),
              t.identifier("generateParentTagPath")
            ),
          ]),
          t.stringLiteral("function")
        )
      ),
      // 如果 window.generateParentTagPath 可用，则调用该函数并传入 this 上下文
      t.callExpression(
        t.memberExpression(
          t.identifier("window"),
          t.identifier("generateParentTagPath")
        ),
        [t.thisExpression()]
      ),
      // 如果 window.generateParentTagPath 不可用，则将 parentTagPath 设为空字符串
      t.stringLiteral("")
    );
  return parentTagPath;
}

import { BaseOption } from "../../type";
import { types as t } from "@babel/core";
export default function setAttrTransform(
  val: string,
  _option: BaseOption,
  setAttrTransformFn: ((val: string) => string) | null
): t.BinaryExpression {
  const realVal =
    "[" + (setAttrTransformFn && typeof setAttrTransformFn === "function"
      ? setAttrTransformFn(val)
      : val.toString().split("/src/")[1]) + "]";
  // 创建 "[parentTagPath || ''] + [realVal]" 的 AST 节点
  const ast = t.binaryExpression(
    "+",
    t.logicalExpression(
      "||",
      getGenerateParentTagAstNode(),
      t.stringLiteral("")
    ),
    t.stringLiteral(realVal)
  );
  return ast;
}
