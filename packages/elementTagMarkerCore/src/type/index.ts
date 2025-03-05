/**
 * 转换函数类型定义
 * 定义了一个转换函数类型，该函数接受源文件内容、文件路径和基础配置选项作为参数，并返回处理后的源文件内容。
 * 该类型可以是一个函数，也可以为 null。
 * 
 * @param source - 源文件内容
 * @param filePath - 文件路径
 * @returns 处理后的源文件内容
 */
export type Transform =
  | ((source: string, filePath: string) => string)
  | null | undefined;
/**
 * 转换函数类型定义
 * 定义了一个转换函数类型，该函数接受源文件内容、文件路径和基础配置选项作为参数，并返回处理后的源文件内容。
 * 该类型可以是一个函数，也可以为 null。
 *
 * @param source - 源文件内容
 * @param filePath - 文件路径;
 */

export type initMethod = string | undefined

/** 标记类型 */
/**
 * 标记类型枚举
 * 定义了三种不同的标记类型，用于在基础配置中指定标记元素的方式。
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
 * 基础配置类型接口
 * 定义了标记工具的基础配置选项，用于指定标记类型、排除和包含的路径、标签等。
 */
export interface BaseOption {
  /**
   * 标记类型，指定使用何种方式进行标记
   */
  tagType: TagType;
  /**
   * 排除的路径列表，可以是字符串或正则表达式
   */
  excludedPath: (string | RegExp)[];
  /**
   * 包含的路径列表，可以是字符串或正则表达式
   */
  includePath: (string | RegExp)[];
  /**
   * 包含的标签列表
   */
  includeTag: string[];
  /**
   * 排除的标签列表
   */
  excludedTag: string[];
  /**
   * 哈希函数，用于生成路径的哈希值
   * @param path - 文件路径
   * @returns 生成的哈希值字符串
   */
  hashFunction: (path: string) => string;
  /**
   * 标签键，用于标识标记
   */
  tagKey: string;
  /**
   * 是否为生产环境
   */
  toProd: boolean;
  /**
   * 是否写入文件，可选择不写入、使用哈希值写入或使用文件路径写入
   */
  writeToFile: false | TagType.hash | TagType.path;
  /**
   * 配置描述信息
   */
  describe: string;
  /**
   * 标签前缀
   */
  tagPrefix: string;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 标签生成函数，用于生成自定义标签
   * @param path - 文件路径
   * @param elementTag - 元素标签对象
   * @param option - 基础配置选项
   * @returns 生成的标签和标签值的对象或数组
   */
  tagFunction: (
    path: string,
    elementTag: object,
    option: BaseOption
  ) => { tag: string; tagValue: string } | [tag: string, value: string][];
  /**
   * 工作区路径
   */
  workSpacePath: string;
  /**
   * 是否仅显示工作区文件路径
   */
  onlyShowWorkSpaceFilePath: boolean;
  /**
   * 转换前处理函数，可对源文件内容进行预处理
   * @param source - 源文件内容
   * @param filePath - 文件路径
   * @param option - 基础配置选项
   * @returns 处理后的源文件内容
   */
  beforeTransform: Transform
  /**
   * 转换后处理函数，可对转换后的文件内容进行后处理
   * @param source - 转换后的文件内容
   * @param filePath - 文件路径
   * @param option - 基础配置选项
   * @returns 处理后的文件内容
   */
  afterTransform: Transform
  
  /**
   * 初始化方法，指定初始化时执行的操作，可为字符串或未定义
   */
  initMethod: initMethod;
}

/** 工具箱类型 */
export type UtilsBox = {
  transform: (source: string, filePath: string, option: BaseOption) => string;
  [key: string]: any;
};
