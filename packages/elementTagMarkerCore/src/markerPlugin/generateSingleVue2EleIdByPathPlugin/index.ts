/*
 * @Date: 2025-02-28 14:28:36
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 11:04:33
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/generateSingleVue2EleIdByPathPlugin/index.ts
 */

import { OptionPlugin } from './../pluginClass';
import originClass from '../pluginClass';
import change from './transform';

/**
 * 一个用于根据路径生成单个Vue 2元素ID的工具类。
 * 继承自`originClass`，使用传入的转换函数进行初始化。
 */
export default class GenerateSingleVue2EleIdByPathPlugin extends originClass {
    /**
     * 构造函数，初始化`GenerateSingleVue2EleIdByPathPlugin`实例。
     * 
     * @param transform - 一个转换函数，用于处理特定的逻辑。
     */
    constructor(optionPlugin: OptionPlugin) {
        // 调用父类的构造函数，传入转换函数
        super(optionPlugin);
        /**
         * 转换函数，使用传入的 `change` 函数对源字符串进行处理。
         * @param Source - 要处理的源字符串。
         * @param filePath - 文件的路径。
         * @returns 转换后的字符串。
         */
        this.beforeTransform = (Source: string, filePath: string) => {
            // 调用 change 函数进行转换，this.option 来自于 originClass 的实例化
            return change(Source, filePath, this.option);
        }
        this.initMethod = `
        // 生成父标签路径的函数
        window.generateParentTagPath = function (data) {
            if (data) {
                console.log(data);
                return data.tag;
            }
        }
        `
    }
}