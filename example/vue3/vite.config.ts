/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-01-23 16:34:33
 * @FilePath: /element-tag-marker/example/vue3/vite.config.ts
 */
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
    resolve: {
        // 设置目录别名
        alias: {
            // 键必须以斜线开始和结束
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            core: path.resolve(__dirname, './src/core'),
            assets: path.resolve(__dirname, './src/assets'),
            interface: path.resolve(__dirname, './src/interface'),
            plugins: path.resolve(__dirname, './src/plugins')
        }
    },
    plugins: [vuePlugin, viteElementTagMarkerPlugin({
        option: {
            writeToFile: 'hash',
            tagType: 'function',
            tagFunction: (path, _tag, option) => {
                return [['hash', option.hashFunction(path)], ['path', path]]
            }
        }
    })]
})
