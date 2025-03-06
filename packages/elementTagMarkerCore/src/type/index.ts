/*
 * @Date: 2025-02-06 16:18:46
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 16:40:15
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/type/index.ts
 */
/**
 * 转换函数类型定义，可接受源文件内容、文件路径，返回处理后内容，也可为 null 或 undefined
 */
export type Transform =
  | ((source: string, filePath: string) => string)
  | null
  | undefined;

/**
 * 转换函数类型定义，可接受源文件内容、文件路径，返回处理后内容，也可为 null 或 undefined
 */
export type  AttrTransform = | ((val: string) => any) | null | undefined;

/**
 * 初始化方法类型定义，可接受源文件内容、文件路径，返回处理后内容，也可为 null 或 undefined
 */
export type initMethod =
  | ((source: string, filePath: any) => string)
  | null
  | undefined;

/**
 * 标记类型枚举，定义三种标记元素的方式
 */
export enum TagType {
  // 使用哈希值作为标记
  hash = "hash",
  // 使用文件路径作为标记
  path = "path",
  // 使用自定义函数生成标记
  function = "function",
}

/**
 * 基础配置类型接口，定义标记工具的基础配置选项
 */
export interface BaseOption {
  // 标记类型
  tagType: TagType;
  // 排除的路径列表
  excludedPath: (string | RegExp)[];
  // 包含的路径列表
  includePath: (string | RegExp)[];
  // 包含的标签列表
  includeTag: string[];
  // 排除的标签列表
  excludedTag: string[];
  // 哈希函数，生成路径哈希值
  hashFunction: (path: string) => string;
  // 标签键，标识标记
  tagKey: string;
  // 是否为生产环境
  toProd: boolean;
  // 是否写入文件
  writeToFile: false | TagType.hash | TagType.path;
  // 配置描述信息
  describe: string;
  // 标签前缀
  tagPrefix: string;
  // 项目名称
  projectName: string;
  // 标签生成函数，生成自定义标签
  tagFunction: (
    path: string,
    elementTag: object,
    option: BaseOption
  ) => { tag: string; tagValue: string } | [tag: string, value: string][];
  // 工作区路径
  workSpacePath: string;
  // 是否仅显示工作区文件路径
  onlyShowWorkSpaceFilePath: boolean;
  // 转换前处理函数
  beforeTransform: Transform;
  // 转换后处理函数
  afterTransform: Transform;
  // 初始化方法
  initMethod: initMethod;
  // 设置属性转换函数
  setAttrTransform: AttrTransform;
}

/**
 * 工具箱类型，包含转换函数及其他任意属性
 */
export type UtilsBox = {
  transform: (source: string, filePath: string, option: BaseOption) => string;
  [key: string]: any;
};
