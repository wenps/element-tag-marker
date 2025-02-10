/*
 * @Date: 2025-01-20 18:43:35
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 18:22:06
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/type/index.ts
 */

/** 标记类型 */
export enum TagType {
    hash = 'hash',
    path = 'path',
    function = 'function'
}
// 基础配置类型接口
export interface BaseOption {
    tagType: TagType;
    excludedPath: (string | RegExp)[];
    includePath: (string | RegExp)[];
    includeTag: string[];
    excludedTag: string[];
    hashFunction: (path: string) => string;
    tagKey: string;
    toProd: boolean;
    writeToFile: false | TagType.hash | TagType.path;
    describe: string;
    tagPrefix: string;
    projectName: string;
    tagFunction: (path: string, elementTag: object, option: BaseOption) => {tag: string, tagValue: string} | ([tag: string, value: string][]);
    workSpacePath: string,
    onlyShowWorkSpaceFilePath: boolean,
}
