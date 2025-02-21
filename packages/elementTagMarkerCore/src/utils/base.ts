/*
 * @Date: 2025-02-21 10:42:48
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-21 10:42:50
 * @FilePath: /element-tag-marker/packages/elementTagMarkerCore/src/utils/base.ts
 */

// 导出一个深拷贝函数，用于克隆对象
export function cloneDeep<T>(value: T, cache: WeakMap<object, any> = new WeakMap()): T {
    // 处理基本类型和 null
    if (typeof value !== 'object' || value === null) {
        return value
    }

    // 处理循环引用
    if (cache.has(value)) {
        return cache.get(value)
    }

    // 处理特殊对象类型
    if (value instanceof Date) {
        return new Date(value) as T
    }

    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as T
    }

    // 初始化克隆容器
    const clone: any = Array.isArray(value) ? [] : {}

    // 缓存对象防止循环引用
    cache.set(value, clone)

    // 处理 Symbol 和普通键的枚举
    const keys = [
        ...Object.keys(value),
        ...Object.getOwnPropertySymbols(value).filter(sym => value.propertyIsEnumerable(sym))
    ]

    // 递归克隆属性
    for (const key of keys) {
        clone[key] = cloneDeep((value as any)[key], cache)
    }

    return clone as T
}
