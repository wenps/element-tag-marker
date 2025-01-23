<!--
 * @Date: 2025-01-23 10:56:31
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 10:56:43
 * @FilePath: /element-tag-marker/example/vue3/src/views/Products.vue
-->
<template>
    <div class="products">
        <h1>我们的产品</h1>
        <div class="product-list">
            <div class="product-item" v-for="(product, index) in products" :key="index">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            products: [
                { name: '产品一', description: '产品一的详细描述' },
                { name: '产品二', description: '产品二的详细描述' },
                { name: '产品三', description: '产品三的详细描述' }
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.products {
    padding: 40px;
    
    h1 {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .product-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        
        .product-item {
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 4px;
            
            h3 {
                margin-bottom: 10px;
            }
            
            p {
                color: #666;
            }
        }
    }
}
</style> 
 <!-- element-tag-marker: lwtkni2c -->