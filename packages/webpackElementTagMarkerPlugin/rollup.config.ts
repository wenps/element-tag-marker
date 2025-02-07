/*
 * @Date: 2025-01-23 14:28:42
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-07 18:08:16
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/rollup.config.ts
 */
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'

function resolve(filePath: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    return path.resolve(__dirname, filePath)
}

const input = resolve('./src/index.ts')
const loaderInput = resolve('./src/customLoader/index.ts')

const buildConfig = defineConfig({
    input: input,
    output: [
        {
            file: resolve('./dist/index.mjs'),
            format: 'esm'
        },
        {
            file: resolve('./dist/index.cjs'),
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        })
    ]
})

const loaderBuildConfig = defineConfig({
    input: loaderInput,
    output: [
        {
            file: resolve('./dist/customLoader/index.mjs'),
            format: 'esm'
        },
        {
            file: resolve('./dist/customLoader/index.cjs'),
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        })
    ]
})

/**
 * @description: 类型配置
 * @return {*}
 */
const loaderDtsConfig = defineConfig({
    input: loaderInput,
    output: {
        file: resolve('./dist/customLoader/index.d.ts'),
        format: 'esm'
    },
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        }),
        dts()
    ]
})

/**
 * @description: 类型配置
 * @return {*}
 */
const dtsConfig = defineConfig({
    input: input,
    output: {
        file: resolve('./dist/index.d.ts'),
        format: 'esm'
    },
    plugins: [
        typescript({
            tsconfig: resolve('./tsconfig.json')
        }),
        dts()
    ]
})

export default [buildConfig, dtsConfig, loaderBuildConfig, loaderDtsConfig]
