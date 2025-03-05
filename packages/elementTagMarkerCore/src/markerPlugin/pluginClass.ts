
/*
 * @Date: 2025-03-04 16:36:11
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-05 18:32:06
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/pluginClass.ts
 */
import { BaseOption } from '../type/index';
import { Transform, initMethod } from 'src/type';
import { option } from '../option';

export type OptionPlugin = {
    beforeTransform?: Transform,
    afterTransform?: Transform,
    initMethod?: initMethod
}

/**
 * PluginClass 类用于初始化和管理配置选项与转换方法。
 * 该类接收一个 Transform 类型的参数，用于初始化内部的转换方法。
 * 配置选项从 '../option' 模块中导入并存储在类的私有属性中。
 */
export default class PluginClass {
    /**
     * 存储 BaseOption 类型的配置选项。
     */
    public option: BaseOption;
    /**
     * 存储 Transform 类型的转换方法，option 可以从当前实例获取
     */
    public beforeTransform: Transform | undefined;

    /**
     * 存储 Transform 类型的转换方法，option 可以从当前实例获取
     */
    public afterTransform: Transform


    /**
     * 初始化方法，在入口文件中运行。
     */
    public initMethod: initMethod;

    /**
     * 构造函数，初始化 PluginClass 实例。
     * @param transform - 一个 Transform 类型的对象，用于进行数据转换。
     */
    constructor(optionPlugin: OptionPlugin = {
        beforeTransform: null ,
        afterTransform: null
    }) {
        const {beforeTransform, afterTransform, initMethod = undefined} = optionPlugin;
        // 合并配置
        this.beforeTransform = beforeTransform;
        this.afterTransform = afterTransform;
        this.initMethod = initMethod;
        // 缓存全局配置
        this.option = option;
    }
}
