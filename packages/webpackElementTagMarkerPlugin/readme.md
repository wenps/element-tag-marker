# 🌟 Element Tag Marker

## 🌐 Language

- 🇨🇳 [Chinese](readme_cn.md)
- 🇬🇧 [English](readme.md)

## 📖 Introduction

`Element Tag Marker` is a utility library for adding tags to elements in front-end projects. It supports Vue2/3 and React, and provides Webpack and Vite plugins.

- 🚀 **Supports Multiple Front-end Frameworks**: Vue, React
- 📦 **Supports Main Build Tools**: Webpack, Vite
- 🎨 **Supports Multiple Tag Types**: hash, path, function
- 🔧 **Supports Custom Tag Rules and Filter Rules**
- 📝 **Supports Writing Tags to Source Files**
- ♻️ **Provides Caching Strategy to Optimize Development Experience**

🎯 **Goal**: To provide a simple, efficient, and maintainable tagging solution for front-end developers.

🔗 **GitHub Address**: [https://github.com/wenps/element-tag-marker](https://github.com/wenps/element-tag-marker)

🚀 **Don’t forget to Star us 🌟!**

---

## 🌟 Features

- **Framework Support** 😎: Compatible with Vue2/3 and React.
- **Build Tool Support** 🔧: Compatible with Webpack and Vite.
- **Customizable Tag Generation** 🏷️:
  - Supports generating tags based on hash algorithms or custom functions. Tags can include path parameters and custom parameters.
  - Supports custom tag generation rules, allowing configuration to include or exclude specific paths and tags.
- **Project Tag Differentiation** ✨: Adds project-specific prefixes to tags.
- **Flexible File Handling** 📂: Supports writing tag values to original files for easy tracking.

---

## 🎯 Why Do You Need It?

If you want to improve development efficiency and reduce wasted time on debugging and maintenance, then **Element Tag Marker** is the solution tailored for you.

### Imagine These Scenarios:

1. **🔍 Quickly Locate Issues**:  
   When project code grows larger, it becomes extremely difficult to locate specific code snippets. With Element Tag Marker, you can add unique tags to elements, making it possible to reverse-lookup the code file by its tag. Within seconds, you can pinpoint the target code without wasting time digging through directories.

2. **📌 Clear Module Maintenance**:  
   By adding tags to specific modules, you can not only mark their origin but also indicate under which environments they are applied, such as "Development Mode Logic" or "Production Mode Core Logic".  
   If code coupling issues arise, tags allow you to instantly identify the module's source and responsibility, making it easier to decouple and reducing the risk of incorrect modifications.

3. **⚡ Accelerate Debugging**:  
   In large collaborative projects, debugging different modules can be time-consuming and challenging. With precise tags, you can quickly associate debug tool outputs with specific code files and locations. This significantly speeds up the debugging process, making each bug fix or problem resolution faster and more accurate. ✨

---

## 📦 Installation

Install the Webpack or Vite plugin via npm:

### Webpack Plugin Installation

Install via npm:

```bash
npm install webpack-element-tag-marker-plugin --save-dev
```

Or use Yarn:

```bash
yarn add webpack-element-tag-marker-plugin --dev
```

### Vite Plugin Installation

Install via npm:

```bash
npm install vite-element-tag-marker-plugin --save-dev
```

Or use Yarn:

```bash
yarn add vite-element-tag-marker-plugin --dev
```

---

## 🔢 Parameter Configuration
| Parameter Name   | Type                                                      | Default Value           | Required | Description                                                                                                                                   |
|------------------|-----------------------------------------------------------|-------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `tagType`        | `enum` (`hash` \| `path` \| `function`)                   | `hash`                  | ✔️       | Type of the tag, supports three types: `hash`, `path`, `function`. The plugin will generate the tag value based on the specified type.        |
| `tagKey`         | `string`                                                  | `'tag'`                 | ✔️       | The key of the tag, used to identify the tag in the file/element attribute.                                                                   |
| `excludedPath`   | `(string \| RegExp)[]`                                    | `[]`                    | ❌       | Files or paths to exclude, can be strings or regular expressions, e.g., `node_modules`, `dist`, etc. Defaults to not excluding any paths.     |
| `includePath`    | `(string \| RegExp)[]`                                    | `[/src\//]`             | ✔️       | Files or paths to include, can be strings or regular expressions. Defaults to including all files under the `src` directory. Note: In webpack, the inclusion range should be carefully controlled and not broadly open. If you need to operate files in `node_modules`, ensure accuracy and avoid operating on the packed files of the `vue` source package.
| `includeTag`     | `string[]`                                                | `[]`                    | ❌       | List of tags to include, when empty, it includes all tags.                                                                                    |
| `excludedTag`    | `string[]`                                                | `[]`                    | ❌       | List of tags to exclude, takes precedence over `includeTag`.                                                                                  |
| `hashFunction`   | `(path: string) => string`                                | `--`                    | ❌       | Function to generate the hash value for the tag. By default, it generates a hash based on the file path string. It accepts a path parameter and returns a hash value. |
| `toProd`         | `boolean`                                                 | `false`                 | ❌       | Whether to trigger the functionality in production environments.                                                                              |
| `writeToFile`    | `false \| hash \| path`                                   | `false`                 | ❌       | Whether to write the tag value into the original file. Only supported for `hash` and `path` types. For `hash` or `path`, the plugin converts the value into the respective identifier and writes it into the original file. |
| `tagPrefix`      | `string`                                                  | `''`                    | ❌       | Tag prefix used to differentiate tags from different projects, only effective for `hash` and `path` types.                                    |
| `tagFunction`    | `(path: string, elementTag: Record<string, any>, option) => {tag: string, tagValue: string} \| ([tag: string, value: string][])` | `() => [['', '']]` | ❌       | The tag generation function, generating tags based on custom logic, can return an object `{tag, tagValue}` or an array of tags. The function accepts file path, element tag AST node, and the complete configuration item as parameters. |
| `onlyShowWorkSpaceFilePath`      | `boolean`                                                  | `false`                    | ❌       | Whether to display only the specific file paths within the workspace directory.                                    |

---

## 🛠️ Configuration Examples

### Webpack Configuration (Vue2 Example)

```javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackElementTagMarkerPlugin = require('webpack-element-tag-marker-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpackElementTagMarkerPlugin({
      tagKey: 'data-tag',
      tagType: 'hash',
      writeToFile: 'hash',
      includePath: ['/src/'],
      excludedPath: ['/node_modules/', '/dist/'],
      toProd: true,
    })
  ],
  devServer: {
    port: 3000,
    hot: true
  }
};
```

### Vite Configuration (Vue3 Example)

```typescript
import path from 'path'
import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import viteElementTagMarkerPlugin from 'vite-element-tag-marker-plugin'

const vuePlugin = createVuePlugin({
  include: [/\.vue$/],
  template: {
    compilerOptions: {
      hoistStatic: false,
      cacheHandlers: false
    }
  }
})

export default defineConfig({
  plugins: [vuePlugin, viteElementTagMarkerPlugin({
    tagKey: 'data-tag',
    tagType: 'function',
    tagFunction: (path, _tag, option) => {
      return [['hash', option.hashFunction(path)], ['path', path]]
    },
    writeToFile: 'hash',
    includePath: ['/src/'],
    excludedPath: ['/node_modules/', '/dist/'],
    toProd: true,
  })]
})
```

---

## ⚙️ Mechanism

- **Parsing and Processing**: This plugin uses Babel to process the parsed code of each front-end framework to implement new features. By observing the compiled code, attributes can be added at the right place to achieve tag functionality. This applies to both Vue2/3 and React projects built with Webpack and Vite.
  
- **Using WriteToFile**: You can write the current file's tag into the original file. By searching for tags within the project, you can quickly locate the corresponding file (the primary purpose of this plugin).

- **Caching**: The plugin maintains a code mapping table. When the file is unchanged, it directly reads the cache to enhance the development experience.

---

## 📋 Notes

- **Vue3 Developer Tips**: In Vue3, optimizations may skip static node compilation. Currently, the plugin only processes JavaScript, so you need to force the compilation.
  
- **React Support**: React support might not be fully mature as I have limited experience with React projects. If you encounter any issues, feel free to raise questions.

- **Environment Detection**: The Vite plugin detects production mode with `process.env.NODE_ENV === "production"`, and the Webpack plugin does it with `compiler.options.mode === "production"`. Ensure that the production mode detection of your current project is aligned, as this will affect the `toProd` property.

---

## 📚 Examples

### **Vue2 Vite Example**

  ![](../../exampleIMG/vue2Vite.gif)

  This example is configured with hash tags. The default value of the tag is the hash generated from the filename of the current code.

### **Vue3 Vite Example**

  ![](../../exampleIMG/vue3Vite.gif)

  This example is configured with function tags. The custom function is implemented as follows:
  ```javascript
  tagFunction: (path, _tag, option) => {
      return [['hash', option.hashFunction(path)], ['path', path]]
  }
  ```
  Thus, both path and hash tags exist simultaneously.

### **React Webpack Example**

  ![](../../exampleIMG/reactWebpack.gif)

  This example is configured with hash tags. The default value of the tag is the hash generated from the filename of the current code.

### **Vue2 Webpack Example**

  ![](../../exampleIMG/vue2Webpack.gif)

  This example is configured with path tags. The default value of the tag is the actual path of the current file.

---

Welcome to use and provide feedback! If you have any questions or suggestions, feel free to submit an Issue or Pull Request! 😊✨

Don’t forget to 🌟 Star us on GitHub!