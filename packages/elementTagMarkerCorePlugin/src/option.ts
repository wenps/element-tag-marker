/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2025-01-09 15:00:18
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/option.ts
 * @Description: 配置文件，用于设置标记器的各项参数
 */

import cloneDeep from 'lodash/cloneDeep'
import { hashTag } from './utils/hash'

const DEFAULT_OPTION = {
    // 需要排除的文件路径，例如 node_modules、dist 等
    excludedPath: [] as string[],

    // 需要包含的文件路径正则表达式，默认包含 src 目录下的所有文件
    includePath: [/src\//],

    // 需要包含的标签，为空时包含所有标签
    includeTag: [] as string[],

    // 需要排除的标签，优先级高于 includeTag
    excludedTag: [] as string[],

    // 用于生成标签的哈希函数，默认使用路径字符串生成
    hashFunction: hashTag as (path: string) => string,

    // 标签的键名，用于在元素属性中标识标签
    tagKey: 'tag',

    // 生成环境是否触发
    toProd: false,

    // 是否将hash值写入原文件中
    writeToFile: true,

    // 描述信息
    describe: '',

    // 是否开启调试模式，开启后会输出更多日志信息
    debug: false,

    // 标签前缀，用于区分不同项目的标签
    tagPrefix: '',

    // 项目名称
    projectName: ''
}

/** 配置选项类型定义 */
type OptionType = typeof DEFAULT_OPTION

/** 导出当前配置实例 */
export let option: OptionType = { ...DEFAULT_OPTION }

/** 
 * 用户配置信息接口
 * @property {Partial<OptionType>} option - 部分或全部配置选项
 */
export type OptionInfo = {
    option: Partial<OptionType>
}

/**
 * 生成用户配置
 * @param {OptionInfo} optionInfo - 用户提供的配置信息
 * @returns {Partial<OptionType>} 处理后的用户配置
 */
function generateUserOption(optionInfo: OptionInfo): Partial<OptionType> {
    return cloneDeep(optionInfo.option)
}

/**
 * 初始化配置
 * @param {OptionInfo} optionInfo - 用户提供的配置信息
 */
export function initOption(optionInfo: OptionInfo): void {
    option = { ...DEFAULT_OPTION, ...generateUserOption(optionInfo) }
}
