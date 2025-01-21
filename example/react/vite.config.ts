/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 15:56:38
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
                tagType: 'path'
            }
        })
    ]
})
