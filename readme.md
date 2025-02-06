<!--
 * @Date: 2025-01-21 16:11:04
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-06 13:52:49
 * @FilePath: /element-tag-marker/readme.md
-->
# Element Tag Marker


## 简介

`Element Tag Marker` 是一个用于为前端项目中的元素添加标记的工具库。支持 Vue2/3、React，提供 Webpack 和 Vite 插件工具。

- 🚀 支持多种前端框架 (Vue, React)
- 📦 支持主流构建工具 (Vite)
- 🎨 支持多种标记类型 (hash, path, function)
- 🔧 支持自定义标记规则和过滤规则
- 📝 支持将标记写入源文件

---

## 功能

- 支持框架 😎：兼容 Vue2/3 和 React。
- 构建工具支持 🔧：适配 Webpack 和 Vite。
- 可自定义标签生成 🏷️：
    - 支持基于哈希算法或自定义函数生成标签，生成标签时支持传入路径参数以及自定义参数。
    - 支持自定义标签生成规则，允许通过配置包含或排除特定路径及标签。
- 项目标签区分 ✨：为标签添加工程化的独立前缀。
- 灵活的文件处理 📂：支持将标记值写入原始文件，便于后续跟踪。
---

## 安装

分别通过 npm 安装 Webpack 或 Vite 插件：

### Webpack 插件安装

通过 npm 安装：

```bash
npm install webpack-element-tag-marker-plugin --save-dev
```
或使用 Yarn：

```bash
yarn add webpack-element-tag-marker-plugin --dev
```

### Vite 插件安装

通过 npm 安装：

```bash
npm install vite-element-tag-marker-plugin --save-dev
```

或使用 Yarn：

```bash
yarn add vite-element-tag-marker-plugin --dev
```

## 参数配置
| 参数名称         | 类型                                        | 默认值                   | 必填 | 描述                                                                                                                                          |
|------------------|---------------------------------------------|--------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `tagType`        | `enum` (`hash` \| `path` \| `function`)     | `hash`           | ✔️       | 标记类型，支持三种类型：`hash`、`path`、`function`。插件会根据标记类型处理标记，生成的值为标签的键值。                                          |
| `tagKey`         | `string`                                   | `'tag'`                  | ✔️       | 标签的键名，用于在文件/元素属性中标识标签。                                                                                                 |
| `excludedPath`   | `(string \| RegExp)[]`                      | `[]`                     | ❌       | 需要排除的文件路径或正则表达式。例如：`node_modules`、`dist` 等。 默认不排除任何文件路径。                                                     |
| `includePath`    | `(string \| RegExp)[]`                      | `[/src\//]`              | ✔️       | 需要包含的文件路径匹配规则，可以为字符串或正则表达式。默认包含 `src` 目录下的所有文件。注意：webpack 插件包含范围需要注意，不能全量放开，如果要操作node_modules中的文件，需要精确不能操作 vue源码包的 打包文件 |
| `includeTag`     | `string[]`                                 | `[]`                     | ❌       | 需要包含的标签列表，留空时表示包含所有标签。                                                                                                 |
| `excludedTag`    | `string[]`                                 | `[]`                     | ❌       | 需要排除的标签列表，优先级高于 `includeTag`。                                                                                                |
| `hashFunction`   | `(path: string) => string`                 | `--`          | ❌       | 用于生成标签值的哈希函数，默认以路径字符串生成哈希值。函数接收路径参数并返回哈希值。                                                         |
| `toProd`         | `boolean`                                  | `false`                  | ❌       | 是否在生产环境中触发功能。                                                                                                                   |
| `writeToFile`    | `false \| hash \| path`                    | `false`                  | ❌       | 是否将标签值写入原文件，仅支持 `hash` 和 `path` 类型。当为 `hash` 或 `path` 时，插件将值转化为对应标识并写入到原文件中。                        |
| `tagPrefix`      | `string`                                   | `''`                     | ❌       | 标签前缀，用于区分不同项目中的标签，仅对 `hash` 和 `path` 两种类型生效。                                                                    |
| `tagFunction`    | `(path: string, elementTag: Record<string, any>, option) => {tag: string, tagValue: string} \| ([tag: string, value: string][])` | `() => [['', '']]` | ❌       | 标签生成函数，结合自身逻辑生成标签，可以返回一个 `{tag, tagValue}` 的对象或标签数组。函数接收文件路径、元素标签 AST 节点和完整配置项作为参数。 |
