/*
 * @Date: 2024-12-07 16:03:52
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-28 10:48:14
 * @FilePath: /element-tag-marker/script/build.js
 */
// @ts-check
import shell from 'shelljs'; // 使用 import 引入 shelljs 模块
import { select } from '@inquirer/prompts'; // 使用 import 引入 select 函数

// 解析命令行参数并将其存储在 Map 中
const parseArgsToMap = () => {
    const args = new Map()

    // 遍历命令行参数，将每个参数按 '=' 分割并存入 Map
    process.argv.forEach(arg => {
        const [key, value] = arg.split('=')
        args.set(key, value)
    })
    return args
}

// 解析命令行参数
const argMap = parseArgsToMap();

const run = async () => {
    // 自带指令 d 标识开发模式
    const isDev = argMap.has('d')
    
    // 定义构建命令的函数
    const runBuild = () => {
        const buildCmd = 'pnpm build' + (isDev ? ' -w' : '') // 根据是否为开发模式决定构建命令
        shell.exec(buildCmd, { async: isDev }) // 执行构建命令
    }

    // 定义可选的插件类型
    const choices = ['vite', 'webpack'].map(type => {
        return {
            name: type,
            value: type + 'ElementTagMarkerPlugin' // 这里用了拼接，要留意后续目录是否变更
        }
    })
    
    let dir
    // 自带指令 p 标识指定插件类型
    if (argMap.has('p')) {
        // 如果指定了插件类型，则从 choices 中查找对应的值
        dir = choices.find(choice => choice.name === argMap.get('p'))?.value
    }
    
    // 如果没有指定插件类型，则通过选择提示用户选择
    if (!dir) {
        dir = await select({
            message: 'please select plugin type ——',
            choices,
            default: choices[0].value
        })
    }
    
    // 进入核心插件目录
    shell.cd('packages/elementTagMarkerCore')
    runBuild() // 执行构建

    shell.cd('..') // 返回上级目录

    // 复制 README 文件到指定插件目录
    shell.cp('readme*', dir)
    shell.cd(dir) // 进入指定插件目录
    runBuild() // 执行构建
}

run() // 启动构建流程
