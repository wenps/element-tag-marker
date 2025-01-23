/*
 * @Date: 2025-01-22 19:25:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 18:05:29
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/_createElementVNode.ts
 */
import { getKeyValue, checkTag } from "src/utils";
import { setObjAttrToObj } from "../utils";
import * as t from "@babel/types";

/**
 * 处理 Vue3 的 _createElementVNode 函数调用和 React 的 createElement 函数调用
 * 为组件添加标记属性
 * 支持以下场景:
 * 1. Vue3 的 _createElementVNode 函数
 * 2. webpack 打包后的 React.createElement 函数
 * 
 * @param {any} node - AST节点对象
 * @param {string} filePath - 当前处理的文件路径
 */
export default function (node: any, filePath: string) {
    // 获取组件标签名
    const tagName = node.arguments[0].value;
    // 检查标签是否需要处理,不需要则直接返回
    if (!checkTag(tagName)) return;

    // 获取props参数(第二个参数)
    let propsArg = node.arguments[1];

    // 处理props参数不存在或为null的情况
    if (!propsArg || t.isNullLiteral(propsArg)) {
        // 创建一个空的对象表达式作为新的props
        let attrsObj = t.objectExpression([]);
        // 获取需要添加的标记属性信息
        const res = getKeyValue({ path: filePath, elementTag: node });
        
        // 根据返回类型添加标记属性到现有的props对象中
        setObjAttrToObj(res, attrsObj);
        // 将新创建的props对象设置为第二个参数
        node.arguments[1] = attrsObj;
    } else {
        // props参数存在的情况
        // 获取需要添加的标记属性信息
        const res = getKeyValue({ path: filePath, elementTag: node });
        // 根据返回类型添加标记属性到现有的props对象中
        setObjAttrToObj(res, propsArg);
    }
}