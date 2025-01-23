<!--
 * @Date: 2025-01-23 10:56:18
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 10:56:52
 * @FilePath: /element-tag-marker/example/vue3/src/views/Contact.vue
-->
<template>
    <div class="contact">
        <h1>联系我们</h1>
        <div class="content">
            <div class="contact-info">
                <h2>联系方式</h2>
                <p>电话：123-456-7890</p>
                <p>邮箱：contact@company.com</p>
                <p>地址：某某市某某区某某街道123号</p>
            </div>
            <div class="contact-form">
                <h2>留言咨询</h2>
                <a-form :model="formState" layout="vertical">
                    <a-form-item label="姓名">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                    <a-form-item label="邮箱">
                        <a-input v-model:value="formState.email" />
                    </a-form-item>
                    <a-form-item label="留言内容">
                        <a-textarea v-model:value="formState.message" :rows="4" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="submitForm">提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    setup() {
        const formState = reactive({
            name: '',
            email: '',
            message: ''
        })

        const submitForm = () => {
            console.log('Form submitted:', formState)
        }

        return {
            formState,
            submitForm
        }
    }
})
</script>

<style lang="scss" scoped>
.contact {
    padding: 40px;
    
    h1 {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .content {
        max-width: 800px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        
        h2 {
            margin-bottom: 20px;
        }
        
        .contact-info {
            p {
                margin: 10px 0;
                color: #666;
            }
        }
        
        .contact-form {
            :deep(.ant-form-item) {
                margin-bottom: 20px;
            }
        }
    }
}
</style> 