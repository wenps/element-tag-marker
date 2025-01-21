/*
 * @Date: 2025-01-21 15:36:55
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 15:37:24
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/file.ts
 */
import { option } from "src/option";
import { TagType } from "src/type";

/**
 * @description: 将tag标识写入文件
 * @param {string} path
 * @return {*}
 */
export function writeTagToFile(path: string) {
    if(option.writeToFile){
        const fs = require('fs');
        const content = fs.readFileSync(path, 'utf-8');
        let newContent = content;

        // 生成标识值
        let tagValue = '';
        switch(option.writeToFile){
          case TagType.hash:
            tagValue = option.hashFunction(path);
            break;
          case TagType.path:
            tagValue = path;
            break;
        }

        // 处理不同文件类型的注释和标签格式
        if(path.endsWith('.vue') || path.endsWith('.js') || path.endsWith('.jsx') || path.endsWith('.ts') || path.endsWith('.tsx')) {
          // 获取文件内容的最后一行
          const lines = content.split('\n');
          const lastLine = lines[lines.length - 1];
          
          // 检查最后一行是否已有tag标识
          if(!lastLine.includes('tag')) {
            // 如果没有tag标识，则添加到最后一行
            newContent = content.replace(
              /(['"])tag\1\s*:\s*(['"])[^'"]*\2/,
              `$1tag$1: $2${tagValue}$2`
            );
          }
        }

        // 如果内容有变化则写入文件
        if(newContent !== content) {
          fs.writeFileSync(path, newContent, 'utf-8');
        }
      }
}