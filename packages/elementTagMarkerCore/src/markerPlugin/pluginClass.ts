/*
 * @Date: 2025-03-04 16:36:11
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 18:16:00
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/markerPlugin/pluginClass.ts
 */
// 导入类型定义
import { Transform, initMethod, AttrTransform, BaseOption } from 'src/type';
// 导入配置选项
import { option } from '../option';

/**
 * 定义插件选项类型
 */
export type OptionPlugin = {
    // 转换前的处理函数
    beforeTransform?: Transform,
    // 转换后的处理函数
    afterTransform?: Transform,
    // 初始化方法
    initMethod?: initMethod,
    // 属性转换函数
    setAttrTransform?: AttrTransform
}

/**
 * PluginClass 类用于初始化和管理配置选项与转换方法
 */
export default class PluginClass {
    // 基础配置选项
    public option: BaseOption;
    // 转换前的处理函数
    public beforeTransform: Transform;
    // 转换后的处理函数
    public afterTransform: Transform;
    // 初始化方法
    public initMethod: initMethod;
    // 属性转换函数
    public setAttrTransform: AttrTransform;

    /**
     * 构造函数，初始化插件类
     * @param optionPlugin - 插件选项，包含转换方法和初始化方法
     */
    constructor(optionPlugin: OptionPlugin = {
        beforeTransform: null,
        afterTransform: null,
        initMethod: undefined,
        setAttrTransform: undefined
    }) {
        // 解构赋值获取插件选项
        const {
            beforeTransform,
            afterTransform,
            initMethod = null,
            setAttrTransform = null
        } = optionPlugin;

        // 赋值转换前的处理函数
        this.beforeTransform = beforeTransform;
        // 赋值转换后的处理函数
        this.afterTransform = afterTransform;
        // 赋值初始化方法
        this.initMethod = initMethod;
        // 赋值属性转换函数
        this.setAttrTransform = setAttrTransform;
        // 赋值基础配置选项
        this.option = option;
    }
}
