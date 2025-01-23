/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-01-23 10:50:24
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/index.ts
 */
import handleJsxDEV from "./core/jsxDEV";
import handle_c from "./core/_c";

/**
 * 处理CallExpression节点,为React和Vue2组件添加标记属性
 * @param {any} path - Babel遍历路径对象
 * @param {string} filePath - 当前处理的文件路径
 */
export default function (path: any, filePath: string) {
  let { node } = path;

  // 判断是否为jsxDEV函数调用，处理react
  if (node.callee && node.callee.name === "jsxDEV") {
    handleJsxDEV(node, filePath)
  }
  // 判断是否为_c函数调用，处理vue2
  if (node.callee && node.callee.name === "_c") {
    handle_c(node, filePath)
  }
}

