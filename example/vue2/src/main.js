/*
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-01-20 18:33:27
 * @FilePath: /element-tag-marker/example/vue2/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

 // element-tag-marker: vrnrxk21