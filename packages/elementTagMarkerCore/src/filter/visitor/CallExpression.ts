/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-01-22 14:00:45
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression.ts
 */
import * as t from "@babel/types";
import { getKeyValue } from "src/utils/keyValue";
import { checkTag } from "src/utils";

/**
 * 处理CallExpression节点,为React和Vue2组件添加标记属性
 * @param {any} path - Babel遍历路径对象
 * @param {string} filePath - 当前处理的文件路径
 */
export default function (path: any, filePath: string) {
  let { node } = path;

  // 判断是否为jsxDEV函数调用，处理react
  if (node.callee && node.callee.name === "jsxDEV") {
    // 获取第一个参数(标签名)
    const tagName = node.arguments[0].value;

    if(!checkTag(tagName)) return

    // 获取第二个参数(props对象)
    const propsArg = node.arguments[1];
    
    // 如果props对象存在且是对象表达式,则添加标记属性
    if (propsArg && t.isObjectExpression(propsArg)) {
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });

      /**
       * 向props对象添加标记属性
       * @param {string} tag - 标记属性名
       * @param {string} value - 标记属性值
       */
      const setAttr = (tag: string, value: string) => {
        const tagProperty = t.objectProperty(
          t.identifier(tag),
          t.stringLiteral(value)
        );
        propsArg.properties.push(tagProperty);
      }

      // 根据返回结果类型添加标记属性
      if (Array.isArray(res)) {
        res.forEach((item) => {
            setAttr(item[0], item[1])
        });
      } else {
        setAttr(res.tag, res.tagValue)
      }
    }
  }
  // 判断是否为vue2的_c函数调用，处理vue2
  if (node.callee && node.callee.name === "_c") {
    // 获取标签名
    const tagName = node.arguments[0].value;
    if(!checkTag(tagName)) return;
    
    let propsArg = node.arguments[1];
    // console.log(propsArg, node.arguments[0].value);
    if (t.isArrayExpression(propsArg)) {
      console.log('array');
      
    } else if (t.isObjectExpression(propsArg)) {
      // 获取需要添加的标记属性
      const res = getKeyValue({ path: filePath, elementTag: node });

      /**
       * 向props对象添加标记属性
       * @param {string} tag - 标记属性名
       * @param {string} value - 标记属性值
       */
      const setAttr = (tag: string, value: string) => {
        const tagProperty = t.objectProperty(
          t.identifier(tag),
          t.stringLiteral(value)
        );
        propsArg.properties.push(tagProperty);
      }

      // 根据返回结果类型添加标记属性
      if (Array.isArray(res)) {
        res.forEach((item) => {
            setAttr(item[0], item[1])
        });
      } else {
        setAttr(res.tag, res.tagValue)
      }
      // console.log(propsArg.properties);
      
      // console.log('object');
    } else {
      // console.log('other');
    }
    
    
    // // 如果 propsArg 不存在或者不是对象表达式，创建一个新的空对象表达式
    // if (!propsArg || !t.isObjectExpression(propsArg)) {
    //     // 创建一个新的空对象表达式
    //     const newProps = t.objectExpression([]);
        
    //     // 如果原来有 children（第二个参数是数组），需要把它后移
    //     if (propsArg && t.isArrayExpression(propsArg)) {
    //         // 保存原来的 children
    //         const children = node.arguments[1];
    //         // 设置新的 props
    //         node.arguments[1] = newProps;
    //         // 移动 children 到第三个参数
    //         node.arguments[2] = children;
    //     } else {
    //         // 如果没有 children，直接设置新的 props
    //         node.arguments[1] = newProps;
    //     }
        
    //     propsArg = newProps;
    // }

    // // 获取需要添加的标记属性
    // const res = getKeyValue({ path: filePath, elementTag: node });

    // /**
    //  * 向props对象添加标记属性
    //  * @param {string} tag - 标记属性名
    //  * @param {string} value - 标记属性值
    //  */
    // const setAttr = (tag: string, value: string) => {
    //   const tagProperty = t.objectProperty(
    //     t.identifier(tag),
    //     t.stringLiteral(value)
    //   );
    //   propsArg.properties.push(tagProperty);
    // }

    // // 根据返回结果类型添加标记属性
    // if (Array.isArray(res)) {
    //   res.forEach((item) => {
    //       setAttr(item[0], item[1])
    //   });
    // } else {
    //   setAttr(res.tag, res.tagValue)
    // }
  }
}
