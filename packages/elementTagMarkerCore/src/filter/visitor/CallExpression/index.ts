/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-02-21 11:03:17
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/index.ts
 */
import handleJsxDEV from "./core/jsxDEV";
import handle_c from "./core/_c";
import handle_createElementVNode from "./core/_createElementVNode";
import handle_render from "./core/render";

/**
 * 处理CallExpression节点,为React和Vue2/3组件添加标记属性
 * @param {any} path - Babel遍历路径对象
 * @param {string} filePath - 当前处理的文件路径
 */
export default function (path: any, filePath: string) {
  let { node } = path;

  // 处理vue3的render函数
  if (node.id && node.id.name === "render") {
    console.log("render");
    
    handle_render(node, filePath);
  }

  // 处理react
  if (node.callee && node.callee.name === "jsxDEV") {
    handleJsxDEV(node, filePath);
  }
  // 处理vue2
  if (node.callee && node.callee.name === "_c") {
    handle_c(node, filePath);
  }
  // 处理vue3
  if (
    node.callee &&
    ["_createElementVNode", "_createBlock", "_createElementBlock"].includes(node.callee.name)
  ) {
    handle_createElementVNode(node, filePath);
  }
  // 处理webpack 打包的 react
  if (node.callee && node.callee.type === "MemberExpression" && (node.callee.object.name === "React" && node.callee.property.name === "createElement")) {
    handle_createElementVNode(node, filePath);
  }
}
