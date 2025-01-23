/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2025-01-23 10:07:11
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/index.ts
 */

import CallExpression from './visitor/CallExpression'
export default function (path: string) {
    return {
        visitor: {
            CallExpression(node: babel.NodePath<babel.types.CallExpression>) {
                return CallExpression(node, path)
            }
        }
    };
}

