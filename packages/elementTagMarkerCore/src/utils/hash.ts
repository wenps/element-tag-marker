/*
 * @Date: 2025-01-09 14:46:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-09 19:31:42
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/hash.ts
 */
export function hashTag(path: string) {
    let hash = 0
    for (let i = 0; i < path.length; i++) {
        const charCode = path.charCodeAt(i)
        hash = (hash << 5) - hash + charCode
        hash = hash & hash
    }
    const id = Math.abs(hash).toString(36) + path.length.toString(36)
    return id
}
