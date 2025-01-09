/*
 * @Date: 2025-01-09 18:47:34
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-09 19:15:00
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/filter/visitor/JSXOpeningElement.ts
 */

import * as t from '@babel/types';
import { option } from '../../option';
export default function JSXOpeningElement( path: any, hashValue: string) {
    // 获取标签名
    const tagName = (path.node.name as any).name;
    
    // 检查标签是否需要处理
    if (option.excludedTag.includes(tagName)) {
        return;
    }
    if (option.includeTag.length > 0 && !option.includeTag.includes(tagName)) {
        return;
    }

    
    const tagValue = option.tagPrefix ? `${option.tagPrefix}-${hashValue}` : hashValue;

    // 检查是否已经存在tag属性
    const existingTag = path.node.attributes.find(
        (attr: any) => t.isJSXAttribute(attr) && (attr.name as any).name === option.tagKey
    );

    if (!existingTag) {
        // 创建新的JSX属性
        const tagAttribute = t.jsxAttribute(
            t.jsxIdentifier(option.tagKey),
            t.stringLiteral(tagValue)
        );
        
        // 添加属性到元素
        path.node.attributes.push(tagAttribute);
    }
}