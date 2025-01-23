/*
 * @Date: 2025-01-21 15:36:55
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 11:30:54
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/utils/file.ts
 */
import { option } from "src/option";
import { TagType } from "src/type";
import fs from 'fs'


/**
 * @description: 将标签标识符写入文件
 * @param {string} path - 文件路径
 */
export function writeTagToFile(path: string) {
    if (!option.writeToFile) {
        return;
    }

    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n');
    const lastLine = lines[lines.length - 1];

    // 根据选项生成标签值
    const tagValue = option.writeToFile === TagType.hash 
        ? option.hashFunction(path)
        : path;

    // 根据文件扩展名获取注释格式
    const getCommentFormat = (filePath: string) => {
        if (filePath.endsWith('.vue')) {
            return ` <!-- element-tag-marker: ${tagValue} -->`;
        }
        if (['.js', '.jsx', '.ts', '.tsx'].some(ext => filePath.endsWith(ext))) {
            return ` // element-tag-marker: ${tagValue}`;
        }
        return null;
    };

    const commentFormat = getCommentFormat(path);
    if (!commentFormat) {
        return;
    }

    // 如果需要则更新内容
    let newContent = content;
    if (!lastLine.includes('element-tag-marker:')) {
        newContent = content + '\n' + commentFormat;
    } else if (lastLine.trim().startsWith('//') || lastLine.trim().startsWith('<!--')) {
        lines.pop();
        newContent = lines.join('\n') + '\n' + commentFormat;
    } else {
        newContent = content + '\n' + commentFormat;
    }
    // 如果内容有变化则写入文件
    if (newContent !== content) {
        fs.writeFileSync(path, newContent);
    }
}