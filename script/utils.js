/*
 * @Date: 2024-12-07 16:03:52
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-09 14:24:52
 * @FilePath: /element-tag-marker/script/utils.js
 */
/** 将命令传参转为对象
 * @returns { Map<string, string> }
 */
const parseArgsToMap = () => {
    const args = new Map()

    process.argv.forEach(arg => {
        const [key, value] = arg.split('=')
        args.set(key, value)
    })
    return args
}

module.exports = {
    parseArgsToMap
}
