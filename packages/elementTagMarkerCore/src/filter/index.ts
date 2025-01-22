/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2025-01-21 15:20:49
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/filter/index.ts
 */

import CallExpression from './visitor/CallExpression'
export default function (path: string) {
    return {
        visitor: {
            CallExpression(node: any) {
                return CallExpression(node, path)
            }
        }
    };
}

