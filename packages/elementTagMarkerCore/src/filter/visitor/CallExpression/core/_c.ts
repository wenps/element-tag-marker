/*
 * @Date: 2025-01-22 19:25:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-10 19:12:32
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/_c.ts
 */
import { getKeyValue, checkTag } from "src/utils";
import { setObjAttrToObj } from "../utils";
import * as t from "@babel/types";

/**
 * 处理Vue2的_c函数调用,为组件添加标记属性
 * @param {any} node - AST节点对象
 * @param {string} filePath - 当前处理的文件路径
 */
export default function (node: t.CallExpression, filePath: string) {
  // 校验函数映射表
  const checkFnMap = {
    // 检测是否为空或非对象的情况
    checkEmptyNoObj: (node: any) => {
      try {
        return !node || !t.isObjectExpression(node);
      } catch (error) {
        return false;
      }
    },
    // 处理vue v-bind 情况下_b的调用
    check_bCall: (node: any) => {
      try {
        return (
          t.isCallExpression(node) &&
          t.isIdentifier((node.callee as any).property) &&
          (node.callee as any).property.name === "_b" &&
          t.isIdentifier((node.callee as any).object) &&
          (node.callee as any).object.name === "_vm"
        );
      } catch (error) {
        return false;
      }
    },
  };

  // 获取组件标签名
  let tagName: string = '';
  let firstArg = node.arguments[0];
  if (t.isStringLiteral(firstArg)) {
    tagName = firstArg.value;
  }
  // 检查标签是否需要处理,不需要则直接返回
  if (!checkTag(tagName)) return;

  // 获取props参数(第二个参数)
  let propsArg = node.arguments[1];
  // 获取需要添加的标记属性信息
  const res = getKeyValue({ path: filePath, elementTag: node }) as
    | [string, string][]
    | { tag: string; tagValue: string };
  // 创建一个新的对象来存储属性
  let attrsObj: t.ObjectExpression;
  // 处理vue v-bind 情况下_b的调用
  if (checkFnMap.check_bCall(propsArg)) {
    // 获取_b函数的第一个参数
    let firstArg
    // 检查 propsArg 是否为 CallExpression 类型
    if (t.isCallExpression(propsArg)) {
      firstArg = propsArg.arguments[0];
      // 后续使用 firstArg 的代码逻辑
    }
    if (t.isObjectExpression(firstArg)) {
      // 查找现有的attrs属性
      const existingAttrs = firstArg.properties.find(
        (prop): prop is t.ObjectProperty =>
          t.isObjectProperty(prop) &&
          t.isIdentifier(prop.key) &&
          prop.key.name === "attrs"
      );
      if (existingAttrs && t.isObjectExpression(existingAttrs.value)) {
        // 如果已存在attrs属性,使用现有的对象
        setObjAttrToObj(res, existingAttrs.value);
      } else {
        // 如果不存在attrs属性,创建新的对象表达式
        const attrsObj = t.objectExpression([]);
        setObjAttrToObj(res, attrsObj);
        // 创建attrs属性并添加到第一个参数中
        const attrsProperty = t.objectProperty(t.identifier("attrs"), attrsObj);
        firstArg.properties.push(attrsProperty);
      }
    }
  }
  // 处理props参数不存在或不是对象表达式的情况
  else if (checkFnMap.checkEmptyNoObj(propsArg)) {
    // 创建新的对象表达式用于存储标记属性
    let attrsObj = t.objectExpression([]);
    // 设置标记属性到对象中
    setObjAttrToObj(res, attrsObj);
    // 创建新的对象表达式,用于存储attrs属性(Vue2中实际存储在_c的第二个参数中)
    let realAttrsObj = t.objectExpression([]);
    // 将标记属性对象添加到attrs属性中
    realAttrsObj.properties.push(
      t.objectProperty(t.identifier("attrs"), attrsObj)
    );

    // 根据第二个参数的情况处理参数插入
    if (!propsArg) {
      // 如果第二个参数不存在,直接设置
      node.arguments[1] = realAttrsObj;
    } else if (!t.isObjectExpression(propsArg)) {
      // 如果第二个参数存在但不是对象表达式,需要保留原参数
      // 将第二个参数及之后的所有参数后移一位,为realAttrsObj腾出位置
      for (let i = node.arguments.length - 1; i >= 1; i--) {
        node.arguments[i + 1] = node.arguments[i];
      }
      // 将realAttrsObj插入到第二个参数的位置
      node.arguments[1] = realAttrsObj;
    }
  } else {
    // 处理props参数存在且是对象表达式的情况
    // 查找现有的attrs属性
    // 检查 propsArg 是否为 ObjectExpression 类型
    const existingAttrs = t.isObjectExpression(propsArg) ? propsArg.properties.find(
      (value: t.ObjectMethod | t.ObjectProperty | t.SpreadElement): value is t.ObjectProperty =>
      {
        return t.isObjectProperty(value) &&
        t.isIdentifier(value.key) &&
        value.key.name === "attrs"
      }
    ) : null

    if (existingAttrs && t.isObjectExpression(existingAttrs.value)) {
      // 如果已存在attrs属性,使用现有的对象
      attrsObj = existingAttrs.value;
      // 设置标记属性到现有对象中
      setObjAttrToObj(res, attrsObj);
    } else {
      // 如果不存在attrs属性,创建新的对象表达式
      attrsObj = t.objectExpression([]);
      // 设置标记属性到新对象中
      setObjAttrToObj(res, attrsObj);
      // 创建attrs属性并添加到props参数中
      const attrsProperty = t.objectProperty(t.identifier("attrs"), attrsObj);
      if (t.isObjectExpression(propsArg)) {
        propsArg.properties.push(attrsProperty);
      }
    }
  }
}
