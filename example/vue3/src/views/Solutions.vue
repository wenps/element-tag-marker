<!--
 * @Date: 2025-01-23 10:56:27
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 10:56:46
 * @FilePath: /element-tag-marker/example/vue3/src/views/Solutions.vue
-->
<template>
    <div class="solutions">
        <h1>解决方案</h1>
        <div class="solution-list">
            <div class="solution-item" v-for="(solution, index) in solutions" :key="index">
                <h3>{{ solution.name }}</h3>
                <p>{{ solution.description }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            solutions: [
                { name: '解决方案一', description: '解决方案一的详细描述' },
                { name: '解决方案二', description: '解决方案二的详细描述' },
                { name: '解决方案三', description: '解决方案三的详细描述' }
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.solutions {
    padding: 40px;
    
    h1 {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .solution-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        
        .solution-item {
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
 <!-- element-tag-marker: u0q4os2d -->