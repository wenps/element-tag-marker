/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2025-01-09 19:32:14
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/filter/index.ts
 */

import JSXOpeningElement from './visitor/JSXOpeningElement'
export default function (hashValue: string) {
    return {
        visitor: {
            JSXOpeningElement(node: any) {
                return JSXOpeningElement(node, hashValue)
            }
        }
    };
}
