<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-11 09:56:13
 * @LastEditTime: 2025-01-23 10:54:14
 * @FilePath: /element-tag-marker/example/vue3/src/App.vue
-->
<template>
    <div class="main">
        <header>
            <div class="title">
                <img
                    class="icon"
                    @click="toHome"
                    src="https://www.antdv.com/assets/logo.1ef800a8.svg"
                />
                公司名称
            </div>
            <div class="operation">
                <router-link to="/" class="nav-item">首页</router-link>
                <router-link to="/products" class="nav-item">产品</router-link>
                <router-link to="/solutions" class="nav-item">解决方案</router-link>
                <router-link to="/about" class="nav-item">关于我们</router-link>
                <router-link to="/contact" class="nav-item">联系我们</router-link>
                <div class="language-selector">
                    <a-button @click="changeLang('zhcn')" class="mr10">中文</a-button>
                    <a-button @click="changeLang('en')" class="mr10">English</a-button>
                </div>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        toHome() {
            this.$router.push('/')
        },
        changeLang(value: string) {
            localStorage.setItem('lang', value)
            location.reload()
        }
    }
})
</script>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    
    header {
        width: 100%;
        height: 64px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        z-index: 10;
        background: #fff;
        
        .title {
            display: flex;
            align-items: center;
            padding-left: 60px;
            font-size: 20px;
            font-weight: 600;
            
            .icon {
                height: 32px;
                width: 32px;
                margin-right: 16px;
                cursor: pointer;
            }
        }
        
        .operation {
            height: inherit;
            display: flex;
            align-items: center;
            padding-right: 60px;
            
            .nav-item {
                padding: 0 20px;
                color: #333;
                text-decoration: none;
                font-size: 16px;
                
                &:hover {
                    color: #1890ff;
                }
            }
            
            .language-selector {
                margin-left: 20px;
                border-left: 1px solid #eee;
                padding-left: 20px;
            }
        }
    }
    
    main {
        flex: 1;
        overflow: auto;
    }
    
    .mr10 {
        margin-right: 10px;
    }
}
</style>

 <!-- element-tag-marker: rjyn8k21 -->