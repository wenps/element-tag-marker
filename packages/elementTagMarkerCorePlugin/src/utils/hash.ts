/*
 * @Date: 2025-01-09 14:46:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-09 14:49:51
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/hash.ts
 */
export function hashTag(path: string) {
    return path.split('/').reduce((acc, curr) => {
        return acc + curr.charCodeAt(0)
    }, 0) + ''
}
