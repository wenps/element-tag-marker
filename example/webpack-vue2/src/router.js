/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-02-11 19:16:21
 * @FilePath: /element-tag-marker/example/webpack-vue2/src/router.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from './views/Home.vue';
import Products from './views/Products.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/products',
            name: 'products',
            component: Products,
        },
        {
            path: '/solutions',
            name: 'solutions',
            component: () => import('./views/Solutions.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('./views/Contact.vue'),
        },
    ],
});
 // element-tag-marker: sak6fc2b