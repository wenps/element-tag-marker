/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-02-10 18:31:28
 * @FilePath: /element-tag-marker/example/vue2/vite.config.ts
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import viteElementTagMarkerPlugin from 'vite-element-tag-marker-plugin'

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
    plugins: [
        vue(),
        viteElementTagMarkerPlugin({
            option: {
                writeToFile: 'hash',
                tagType: 'path',
                onlyShowWorkSpaceFilePath: true,
            }
        })
    ]
})
