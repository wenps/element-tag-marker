/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-01-21 15:22:42
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/filter/visitor/CallExpression.ts
 */
import * as t from '@babel/types';
import { option } from '../../option'
import { getKeyValue } from 'src/utils/keyValue';

// 处理jsxDEV函数调用
export default function (path: any, filePath: string) {
    let { node } = path
    
    
    // 判断是否为jsxDEV函数调用
    if (node.callee && node.callee.name === 'jsxDEV') {
        // 获取第一个参数(props对象)
        const tagName = node.arguments[0].value
        
        // 检查标签是否需要处理
        if (option.excludedTag.includes(tagName)) {
            return;
        }
        if (option.includeTag.length > 0 && !option.includeTag.includes(tagName)) {
            return;
        }
        // 获取第二个参数(props对象)
        const propsArg = node.arguments[1]
        
        if (propsArg && t.isObjectExpression(propsArg)) {
            const { tag, tagValue } = getKeyValue({ path: filePath, elementTag: node })
            
            // 创建新的属性
            const tagProperty = t.objectProperty(
                t.identifier(tag),
                t.stringLiteral(tagValue)
            )
            
            // 添加到props对象中
            propsArg.properties.push(tagProperty)
        }
    }
}
