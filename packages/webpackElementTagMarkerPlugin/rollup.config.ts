/*
 * @Date: 2025-01-23 14:28:42
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-06 15:01:06
 * @FilePath: /element-tag-marker/packages/webpackElementTagMarkerPlugin/rollup.config.ts
 */
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import path from 'node:path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'

// 基础路径解析
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths)

// 公共配置项
const BASE_TS_CONFIG = {
  tsconfig: resolve('tsconfig.json')
}

// 构建目标列表
const BUILD_TARGETS = [
  { 
    name: 'main',
    input: './src/index.ts',
    outputDir: './dist',
    needsDts: true
  },
  {
    name: 'customLoader',
    input: './src/customLoader/index.ts',
    outputDir: './dist/customLoader',
    needsDts: true
  },
  {
    name: 'initLoader',
    input: './src/initLoader/index.ts',
    outputDir: './dist/initLoader',
    needsDts: true
  }
]

// 通用构建配置工厂函数
const createBuildConfig = (
  input: string,
  outputDir: string,
  format: 'esm' | 'cjs' = 'esm'
) => defineConfig({
  input: resolve(input),
  output: {
    file: resolve(`${outputDir}/index.${format === 'esm' ? 'mjs' : 'cjs'}`),
    format
  },
  plugins: [typescript(BASE_TS_CONFIG)]
})

// DTS 配置工厂函数
const createDtsConfig = (input: string, outputFile: string) => defineConfig({
  input: resolve(input),
  output: {
    file: resolve(outputFile),
    format: 'esm'
  },
  plugins: [
    typescript(BASE_TS_CONFIG),
    dts()
  ]
})

// 生成所有构建配置
const buildConfigs = BUILD_TARGETS.flatMap(target => [
  // 主构建配置
  createBuildConfig(target.input, target.outputDir, 'esm'),
  createBuildConfig(target.input, target.outputDir, 'cjs'),
  // DTS 配置
  ...(target.needsDts ? [
    createDtsConfig(
      target.input,
      `${target.outputDir}/index.d.ts`
    )
  ] : [])
])

export default buildConfigs
