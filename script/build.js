/*
 * @Date: 2024-12-07 16:03:52
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-06 18:41:57
 * @FilePath: /element-tag-marker/script/build.js
 */
// @ts-check
const shell = require('shelljs')
const argMap = require('./utils').parseArgsToMap()
const { select } = require('@inquirer/prompts')

const run = async () => {
    const isDev = argMap.has('d')
    const runBuild = () => {
        const buildCmd = 'pnpm build' + (isDev ? ' -w' : '')
        shell.exec(buildCmd, { async: isDev })
    }

    const choices = ['vite', 'webpack'].map(type => {
        return {
            name: type,
            value: type + 'ElementTagMarkerPlugin' // 这里用了拼接，要留意后续目录是否变更
        }
    })
    let dir
    if (argMap.has('p')) {
        dir = choices.find(choice => choice.name === argMap.get('p'))?.value
    }
    if (!dir) {
        dir = await select({
            message: 'please select plugin type ——',
            choices,
            default: choices[0].value
        })
    }
    shell.cd('packages/elementTagMarkerCore')
    runBuild()

    shell.cd('..')

    shell.cp('readme*', dir)
    shell.cd(dir)
    runBuild()
}

run()
