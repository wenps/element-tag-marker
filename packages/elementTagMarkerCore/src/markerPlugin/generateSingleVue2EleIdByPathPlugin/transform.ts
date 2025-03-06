/*
 * @Date: 2025-02-28 14:28:09
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 10:07:13
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/transform.ts
 */
import * as t from "@babel/types";
import { transform } from "@babel/core";
import { BaseOption } from "../../type";

/**
 * 生成父标签路径的 Babel 插件访问者
 * @param {string} filePath - 文件路径
 * @param {BaseOption} option - 基础选项
 * @returns {Object} Babel 插件访问者对象
 */
const generateParentTagPath = function (filePath: string, option: BaseOption) {
  return {
    visitor: {
      /**
       * 函数声明节点的访问者
       * @param {babel.NodePath<babel.types.FunctionDeclaration>} path - 函数声明节点的路径
       */
      FunctionExpression(path: babel.NodePath<babel.types.FunctionExpression>) {
        // 获取当前节点
        let { node } = path;
        // 检查函数是否名为 'render'
        if (node.id && node.id.name === "render") {
          // 检查函数体的类型是否为块语句（BlockStatement）
          if (node.body.type === "BlockStatement") {
            // 检查函数体是否为空
            if (node.body.body.length) {
              // 获取函数体的第一个节点
              const temp = node.body.body[0];
              // 判断是否是否声明了变量 parentTagPath，如果不存在则添加
              if (
                !(
                  temp.type === "VariableDeclaration" &&
                  temp.declarations[0]?.type === "VariableDeclarator" &&
                  temp.declarations[0].id.type === "Identifier" &&
                  temp.declarations[0].id.name === "parentTagPath"
                )
              ) {
                // 此变量声明用于存储父标签路径，在 window.generateParentTagPath 函数可用时调用该函数，否则将其设为空字符串
                const parentTagPath = t.variableDeclaration("let", [
                  t.variableDeclarator(
                    t.identifier("parentTagPath"),
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
                    )
                  ),
                ]);
                // 将新的变量声明添加到函数体的开头
                if ((node.body.type = "BlockStatement")) {
                  node.body.body.unshift(parentTagPath);
                }
              }
            }
          }
        }
      },
    },
  };
};

/**
 * 转换 JavaScript 字符串，插入父标签路径的生成代码
 * @param {string} jsString - 要转换的 JavaScript 字符串
 * @param {string} filePath - 文件路径
 * @param {BaseOption} option - 基础配置
 * @returns {string} 转换后的 JavaScript 字符串
 */
export default function change(
  jsString: string,
  filePath: string,
  option: BaseOption
): string {
  // 使用 Babel 转换代码，应用 generateParentTagPath 插件
  const result = transform(jsString, {
    plugins: [generateParentTagPath(filePath, option)],
  });
  // 返回转换后的代码，如果转换失败则返回原始代码
  return result?.code || jsString;
}
