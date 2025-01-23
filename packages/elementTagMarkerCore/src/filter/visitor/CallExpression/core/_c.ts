import { getKeyValue, checkTag } from "src/utils";
import { setAttr } from "../utils";
import * as t from "@babel/types";
// todo 需要优化
/*
 * @Date: 2025-01-22 19:25:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 09:57:52
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/_c.ts
 */
export default function (node: any, filePath: string) {
    // 获取标签名
    const tagName = node.arguments[0].value;
    if (!checkTag(tagName)) return;

    let propsArg = node.arguments[1];

    // 如果 propsArg 不存在或者不是对象表达式，创建一个新的空对象表达式
    if (!propsArg || !t.isObjectExpression(propsArg)) {
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });
      // 创建新的对象表达式
      let attrsObj = t.objectExpression([]);
      // 添加标记属性到 attrs 对象
      if (Array.isArray(res)) {
        res.forEach(([tag, value]) => {
          setAttr(tag, value, attrsObj);
        });
      } else {
        setAttr(res.tag, res.tagValue, attrsObj);
      }
      // 创建新的对象表达式，用于存储attrs属性 真是存储在_c的第二个参数中
      let realAttrsObj = t.objectExpression([]);
      // 添加标记属性到 attrs 对象
      realAttrsObj.properties.push(
        t.objectProperty(t.identifier("attrs"), attrsObj)
      );
      // 如果第二个参数不存在，直接将realAttrsObj设置为第二个参数
      if (!propsArg) {
        node.arguments[1] = realAttrsObj;
      } else if (!t.isObjectExpression(propsArg)) {
        // 如果第二个参数存在但不是对象表达式，需要保留原参数
        // 将第二个参数及之后的所有参数后移一位，为realAttrsObj腾出位置
        for (let i = node.arguments.length - 1; i >= 1; i--) {
          node.arguments[i + 1] = node.arguments[i];
        }
        // 将realAttrsObj插入到第二个参数的位置
        node.arguments[1] = realAttrsObj;
      }
    } else {
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });

      // 创建一个新的对象来存储属性
      let attrsObj: t.ObjectExpression;

      // 查找现有的 attrs 属性
      const existingAttrs = propsArg.properties.find(
        (prop): prop is t.ObjectProperty => t.isObjectProperty(prop) && t.isIdentifier(prop.key)  && prop?.key?.name === "attrs"
      );

      if (existingAttrs && t.isObjectExpression(existingAttrs.value)) {
        // 如果已存在 attrs，使用现有的对象
        attrsObj = existingAttrs.value;
        // 添加标记属性到 attrs 对象
        if (Array.isArray(res)) {
          res.forEach(([tag, value]) => {
            setAttr(tag, value, attrsObj);
          });
        } else {
          setAttr(res.tag, res.tagValue, attrsObj);
        }
      } else {
        // 如果不存在 attrs，创建新的对象表达式
        attrsObj = t.objectExpression([]);
        // 添加标记属性到 attrs 对象
        if (Array.isArray(res)) {
          res.forEach(([tag, value]) => {
            setAttr(tag, value, attrsObj);
          });
        } else {
          setAttr(res.tag, res.tagValue, attrsObj);
        }
        // 创建 attrs 属性并添加到 propsArg
        const attrsProperty = t.objectProperty(t.identifier("attrs"), attrsObj);
        propsArg.properties.push(attrsProperty);
      }
    }
}