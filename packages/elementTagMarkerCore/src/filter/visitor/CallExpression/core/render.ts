/*
 * @Date: 2025-02-21 10:31:43
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-21 11:07:55
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/filter/visitor/CallExpression/core/render.ts
 */
export default function (node: any, filePath: string) {
    try {
        const body = node.body.body;
        console.log(body);
    } catch (error) {
        console.log(error);
    }
}