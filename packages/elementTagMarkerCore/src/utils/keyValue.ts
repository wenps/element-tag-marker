/*
 * @Date: 2025-01-21 14:48:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 18:22:01
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/keyValue.ts
 */
import { option } from "src/option";
import { TagType } from "src/type";

/**
 * 获取挂载的标签和标签值
 * @param params 
 * @returns 
 */
export function getKeyValue(params:{
    path: string,
    elementTag: object
}) {
    const { path, elementTag } = params;
    // 根据配置的标记类型生成标记值
    let tagValue = '';
    let tag = option.tagKey;
    switch(option.tagType) {
      case TagType.hash:
        // 使用哈希函数生成标记
        tagValue = setPrefix(option.hashFunction(path)) ;
        return { tag, tagValue }
      case TagType.path:
        // 使用文件路径作为标记
        tagValue = setPrefix(path);
        return { tag, tagValue }
      case TagType.function:
        // 使用自定义函数生成标记
        const result = option.tagFunction(path, elementTag, option);
        if(Array.isArray(result)) {
          return result
        }
        return { tag, tagValue }
    }
   
}

function setPrefix(tagValue: string) {
    return option.tagPrefix ? `${option.tagPrefix}-${tagValue}` : tagValue
}