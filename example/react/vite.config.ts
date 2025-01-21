/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 18:38:11
 * @FilePath: /element-tag-marker/example/react/vite.config.ts
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteElementTagMarkerPlugin from 'vite-element-tag-marker-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: '/',
        https: false
    },
    plugins: [
        react(),
        viteElementTagMarkerPlugin({
            option: {
                excludedTag: ['div'],
                writeToFile: 'path',
                tagType: 'path',
                tagFunction: (path, _tag, option) => {
                    return [['test', option.hashFunction(path)], ['test1', option.hashFunction(path)], ['test2', option.hashFunction(path)]]
                }
            }
        })
    ]
})
