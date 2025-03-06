/*
 * @Date: 2025-01-21 14:48:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 17:11:28
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/utils/keyValue.ts
 */
import { option } from "src/option";
import { TagType } from "src/type";

/**
 * 获取挂载的标签和标签值，对应的生成函数elementTag 比如_c('el-button', {})
 * @param params 
 * @returns 
 */
export function getKeyValue(params:{
    path: string,
    elementTag: object
}): {tag: string, tagValue: string} | ([tag: string, value: string][]) {
    const { path, elementTag } = params;
    // 根据配置的标记类型生成标记值
    let tagValue = '';
    let tag = option.tagKey;
    switch(option.tagType) {
      case TagType.hash:
        // 使用哈希函数生成标记
        // todo: 为了实现 路径的唯一性，需要加上节点的相对位置，因此这个功能的实现需要拿到顶层路径，遍历符合的节点，给他加位置信息
        tagValue = setPrefix(option.hashFunction(path)) ;
        return { tag, tagValue }
      case TagType.path:
        // 使用文件路径作为标记
        // 如果只显示工作区文件路径，则替换掉工作区路径
        if(option.onlyShowWorkSpaceFilePath) {
          tagValue = setPrefix(path.replace(option.workSpacePath, ''))
        } else {
          tagValue = setPrefix(path);
        }
        return { tag, tagValue }
      case TagType.function:
        // 使用自定义函数生成标记
        const result = option.tagFunction(path, elementTag, option); // 注意看 tagFunction 的返回类型
        if(Array.isArray(result)) {
          return result
        } else {
          return result
        }
    }
   
}

function setPrefix(tagValue: string) {
    return option.tagPrefix ? `${option.tagPrefix}-${tagValue}` : tagValue
}