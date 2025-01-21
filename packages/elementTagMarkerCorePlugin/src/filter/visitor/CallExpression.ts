/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-01-21 18:29:00
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/filter/visitor/CallExpression.ts
 */
import * as t from "@babel/types";
import { option } from "../../option";
import { getKeyValue } from "src/utils/keyValue";

export default function (path: any, filePath: string) {
  let { node } = path;

  // 判断是否为jsxDEV函数调用
  if (node.callee && node.callee.name === "jsxDEV") {
    // 获取第一个参数(props对象)
    const tagName = node.arguments[0].value;

    // 检查标签是否需要处理
    if (option.excludedTag.includes(tagName)) {
      return;
    }
    if (option.includeTag.length > 0 && !option.includeTag.includes(tagName)) {
      return;
    }
    // 获取第二个参数(props对象)
    const propsArg = node.arguments[1];

    if (propsArg && t.isObjectExpression(propsArg)) {
      const res = getKeyValue({ path: filePath, elementTag: node });

      const setAttr = (tag: string, value: string) => {
        const tagProperty = t.objectProperty(
          t.identifier(tag),
          t.stringLiteral(value)
        );
        propsArg.properties.push(tagProperty);
      }

      if (Array.isArray(res)) {
        res.forEach((item) => {
            setAttr(item[0], item[1])
        });
      } else {
        setAttr(res.tag, res.tagValue)
      }
    }
  }
}
