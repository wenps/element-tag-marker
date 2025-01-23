/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2025-01-23 10:52:05
 * @FilePath: /element-tag-marker/example/vue3/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd).use(router).mount('#app')
function ae(aa) {
    return aa
}
ae('12小时')

 // element-tag-marker: qwz4q121