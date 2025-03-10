/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-26 17:34:47
 * @LastEditTime: 2025-03-10 16:59:34
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/option.ts
 * @Description: 配置文件，用于设置标记器的各项参数
 */

import { cloneDeep } from "./utils";
import { hashTag } from "./utils";
import { BaseOption, TagType } from "./type";
import PluginClass from "./markerPlugin/pluginClass";

// 文件缓存
export const fileCache: Map<string, any> = new Map();

const DEFAULT_OPTION: BaseOption = {
  // 是否显示日志
  showLog: false,

  // 标记类型
  tagType: TagType.hash,

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
  tagKey: "tag",

  // 生成环境是否触发
  toProd: false,

  // 是否将标识的值写入原文件中，只支持hash和path两种类型，function类型不支持，因为function类型是自定义的
  writeToFile: false,

  // 描述信息
  describe: "",

  // 标签前缀，用于区分不同项目的标签
  tagPrefix: "",

  // 项目名称
  projectName: "",

  // 标签函数，用于生成标签
  tagFunction: (
    _path: string,
    _elementTag: Record<string, any>,
    _option: BaseOption
  ) => {
    return [["", ""]];
  },

  // 是否只展示工作目录下的具体文件路径
  onlyShowWorkSpaceFilePath: false,

  // 工作空间路径
  workSpacePath: "",

  // 提供markerPlugin实例入口
  markerPlugin: null,

  // 转换函数，默认从markerPlugin中获取，也可以自己传入

  // 在转换之前执行的函数
  beforeTransform: null,

  // 在转换之后执行的函数
  afterTransform: null,

  // 初始化方法，注册在所有代码运行前的方法
  initMethod: undefined,

  // 设置属性转换函数
  setAttrTransform: null,
};

/** 导出当前配置实例 */
export let option: BaseOption = { ...DEFAULT_OPTION };

/**
 * 用户配置信息接口
 * @property {Partial<OptionType>} option - 部分或全部配置选项
 */
export type OptionInfo = {
  option: Partial<BaseOption>;
};

/**
 * 生成用户配置
 * @param {OptionInfo} optionInfo - 用户提供的配置信息
 * @returns {Partial<OptionType>} 处理后的用户配置
 */
function generateUserOption(optionInfo: OptionInfo): Partial<BaseOption> {
  const val = cloneDeep(optionInfo.option);
  const { markerPlugin } = optionInfo.option;

  /**
   * 处理函数值，根据提供的键从配置选项或插件中获取函数值
   * @param {Exclude<keyof PluginClass, "option">} key - 要处理的键
   */
  const handleFunction = (key: Exclude<keyof PluginClass, "option">) => {
    /**
     * 从源对象中获取指定键的函数值
     * @param {any} source - 源对象
     * @returns {((...args: any[]) => any) | null} - 函数值，如果不存在则返回 null
     */
    const getFunctionValue = (source: any) => {
      // 检查源对象中是否存在指定的键，并且该键的值不为空
      if (key in source && source[key]) {
        const value = source[key];
        // 如果值是函数类型或者为 null，则返回该值，否则返回 null
        return typeof value === "function" || value === null
          ? (value as ((...args: any[]) => any) | null)
          : null;
      }
      return null;
    };

    // 从用户配置选项中获取函数值
    const valueFromOption = getFunctionValue(optionInfo.option);
    if (valueFromOption) {
      // 如果用户配置选项中存在该函数值，则将其赋值给处理后的配置
      val[key] = valueFromOption;
    } else if (markerPlugin) {
      // 如果用户配置选项中不存在该函数值，但存在插件实例
      const valueFromPlugin = getFunctionValue(markerPlugin);
      if (valueFromPlugin) {
        // 如果插件实例中存在该函数值，则将其赋值给处理后的配置
        val[key] = valueFromPlugin;
      } else {
        // 如果插件实例中也不存在该函数值，则将处理后的配置中该键的值设为 null
        val[key] = null;
      }
    } else {
      // 如果既没有用户配置选项中的函数值，也没有插件实例，则将处理后的配置中该键的值设为 null
      val[key] = null;
    }
  };

  // 处理 beforeTransform
  handleFunction("beforeTransform");

  // 新增 afterTransform 处理
  handleFunction("afterTransform");

  // 新增 initMethod 处理
  handleFunction("initMethod");

  // 新增 setAttrTransform 处理
  handleFunction("setAttrTransform");

  return val;
}
/**
 * 初始化配置
 * @param {OptionInfo} optionInfo - 用户提供的配置信息
 */
export function initOption(optionInfo?: OptionInfo): void {
  option = {
    ...DEFAULT_OPTION,
    ...generateUserOption(
      optionInfo || {
        option: {},
      }
    ),
  };
  console.log("工作目录:", process.cwd());

  // 存储工作目录
  option.workSpacePath = process.cwd();
}
