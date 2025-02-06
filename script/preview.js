/*
 * @Date: 2025-02-06 16:17:07
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-06 18:46:20
 * @FilePath: /element-tag-marker/script/preview.js
 */
// @ts-check
const shell = require('shelljs')
const { select } = require('@inquirer/prompts')
const fs = require('fs')
const util = require('util')

const run = async () => {
    const readdir = util.promisify(fs.readdir)
    // 读取文件夹内容
    const files = await readdir('example', { withFileTypes: true })
    // 过滤出文件夹
    const choices = files
        .filter(file => file.isDirectory())
        .map(folder => {
            return {
                name: folder.name,
                value: folder.name
            }
        })

    const example = await select({
        message: 'please select preview example ——',
        choices: choices,
        default: choices[0].value
    })

    shell.cd(`example/${example}`)
    shell.exec('pnpm run dev')
}

run()
