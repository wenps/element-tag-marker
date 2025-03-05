/*
 * @Date: 2025-03-04 16:36:11
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-05 11:00:56
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/pluginClass.ts
 */
import { BaseOption } from '../type/index';
import { Transform } from 'src/type';
import { option } from '../option';

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
    public transform: Transform 

    /**
     * 构造函数，初始化 PluginClass 实例。
     * @param transform - 一个 Transform 类型的对象，用于进行数据转换。
     */
    constructor(transform: Transform = null) {
        // 缓存全局配置
        this.option = option;
        // 将传入的 transform 参数赋值给类的私有属性
        this.transform = transform;
    }
}
