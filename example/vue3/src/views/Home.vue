<!--
 * @Author: xiaoshanwen
 * @Date: 2023-08-09 11:48:25
 * @LastEditTime: 2025-01-23 10:56:37
 * @FilePath: /element-tag-marker/example/vue3/src/views/Home.vue
-->
<template>
    <div class="home">
        <div class="banner">
            <h1>欢迎来到我们的公司</h1>
            <p>为您提供最优质的服务和解决方案</p>
        </div>
        <div class="content">
            <h2>我们的优势</h2>
            <div class="advantages">
                <div class="advantage-item">
                    <h3>专业团队</h3>
                    <p>拥有多年行业经验的专业团队</p>
                </div>
                <div class="advantage-item">
                    <h3>创新技术</h3>
                    <p>持续创新，引领行业发展</p>
                </div>
                <div class="advantage-item">
                    <h3>优质服务</h3>
                    <p>24小时专业服务支持</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 验证是否会翻译注释
import { ref } from 'vue'
const a = '小山'
console.log(a)
const msg = ref('hello world')
</script>

<style lang="scss" scoped>
.home {
    .banner {
        height: 400px;
        background: #f0f2f5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        
        h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        p {
            font-size: 24px;
            color: #666;
        }
    }
    
    .content {
        padding: 60px;
        
        h2 {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .advantages {
            display: flex;
            justify-content: space-around;
            
            .advantage-item {
                text-align: center;
                padding: 20px;
                
                h3 {
                    margin-bottom: 10px;
                }
                
                p {
                    color: #666;
                }
            }
        }
    }
}
</style>

 <!-- element-tag-marker: ocmcz128 -->