/*
 * @Date: 2025-01-21 15:36:55
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 17:39:00
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCorePlugin/src/utils/file.ts
 */
import { option } from "src/option";
import { TagType } from "src/type";
import fs from 'fs'

/**
 * @description: Write tag identifier to file
 * @param {string} path - File path
 */
export function writeTagToFile(path: string) {
    if (!option.writeToFile) {
        return;
    }

    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n');
    const lastLine = lines[lines.length - 1];

    // Generate tag value based on option
    const tagValue = option.writeToFile === TagType.hash 
        ? option.hashFunction(path)
        : path;

    // Get comment format based on file extension
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

    // Update content if needed
    let newContent = content;
    if (!lastLine.includes('element-tag-marker:')) {
        newContent = content + '\n' + commentFormat;
    } else if (lastLine.trim().startsWith('//') || lastLine.trim().startsWith('<!--')) {
        lines.pop();
        newContent = lines.join('\n') + '\n' + commentFormat;
    } else {
        newContent = content + '\n' + commentFormat;
    }
    // Write to file if content changed
    if (newContent !== content) {
        fs.writeFileSync(path, newContent);
    }
}