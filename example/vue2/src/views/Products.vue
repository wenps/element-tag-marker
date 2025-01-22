<!--
 * @Date: 2025-01-22 11:03:08
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-22 11:03:13
 * @FilePath: /element-tag-marker/example/vue2/src/views/Products.vue
-->
<template>
    <div xx="1232"  class="products">
        <h1>产品服务</h1>
        <div xx="1232"  class="products-content">
            <div xx="1232"  class="product-card" v-for="(product, index) in products" :key="index">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data() {
        return {
            products: [
                {
                    name: '产品一',
                    description: '产品一的详细描述'
                },
                {
                    name: '产品二',
                    description: '产品二的详细描述'
                }
            ]
        }
    }
}
</script>

<style scoped>
.products {
    padding: 20px;
}

.products-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.product-card {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 
 <!-- element-tag-marker: /Users/xiaoshanwen/Desktop/me/element-tag-marker/example/vue2/src/views/Products.vue -->