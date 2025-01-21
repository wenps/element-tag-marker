/*
 * @Date: 2025-01-13 18:31:37
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-13 18:31:39
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/path.ts
 */
/**
 * @description: 用于判断提供的值是否符合正则表达式数组中的任一规则，符合则跳过
 * @param {*} value
 * @param {*} regexArray
 * @return {*}
 */
export function checkAgainstRegexArray(value: string, regexArray: string[] | RegExp[]) {
    for (let i = 0; i < regexArray.length; i++) {
        const regex = typeof regexArray[i] === 'string' ? new RegExp(regexArray[i]) : regexArray[i]
        if ((regex as RegExp).test(value)) {
            return true // 如果符合任何一个规则，返回 true
        }
    }
    return false // 如果所有规则都不符合，返回 false
}