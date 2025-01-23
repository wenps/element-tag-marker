/*
 * @Author: xiaoshanwen
 * @Date: 2025-01-23 11:00:00
 * @LastEditTime: 2025-01-23 10:59:24
 * @FilePath: /element-tag-marker/example/vue3/src/router/index.ts
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('../views/Products.vue')
        },
        {
            path: '/solutions',
            name: 'solutions',
            component: () => import('../views/Solutions.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/Contact.vue')
        }
    ]
})

export default router

 // element-tag-marker: u3820c29