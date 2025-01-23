import { getKeyValue, checkTag } from "src/utils";
import { setAttr } from "../utils";
import * as t from "@babel/types";
/*
 * @Date: 2025-01-22 19:25:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 11:39:15
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/_createElementVNode.ts
 */
export default function (node: any, filePath: string) {
    // 获取标签名
    const tagName = node.arguments[0].value;
    if (!checkTag(tagName)) return;

    let propsArg = node.arguments[1];

    // 如果 propsArg 不存在，对于 vue3 而言只有null这种情况
    if (!propsArg) {
      // 创建新的对象表达式
      let attrsObj = t.objectExpression([]);
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });
      
      // 添加标记属性到 attrs 对象
      if (Array.isArray(res)) {
        res.forEach(([tag, value]) => {
          setAttr(tag, value, attrsObj);
        });
      } else {
        setAttr(res.tag, res.tagValue, attrsObj);
      }
      // 如果第二个参数不存在，对于vue3而已只有null，直接将attrsObj设置为第二个参数
      node.arguments[1] = attrsObj;
    } else {
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });
      // 添加标记属性到 attrs 对象
      if (Array.isArray(res)) {
        res.forEach(([tag, value]) => {
          setAttr(tag, value, propsArg);
        });
      } else {
        setAttr(res.tag, res.tagValue, propsArg);
      }
    }
}