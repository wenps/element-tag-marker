<!--
 * @Date: 2025-01-23 10:56:23
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 11:13:17
 * @FilePath: /element-tag-marker/example/vue3/src/views/About.vue
-->
<template>
    <div class="about">
        <h1 aa xx="1231">关于我们</h1>
        <div class="content">
            <div class="company-intro">
                <h2>公司简介</h2>
                <p>这里是公司的详细介绍，包括公司的发展历程、企业文化等内容。</p>
            </div>
            <div class="company-values">
                <h2>企业价值观</h2>
                <ul>
                    <li>创新</li>
                    <li>诚信</li>
                    <li>专业</li>
                    <li>共赢</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about {
    padding: 40px;
    
    h1 {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .content {
        max-width: 800px;
        margin: 0 auto;
        
        h2 {
            margin: 20px 0;
        }
        
        .company-intro {
            margin-bottom: 40px;
            
            p {
                line-height: 1.6;
                color: #666;
            }
        }
        
        .company-values {
            ul {
                list-style: none;
                padding: 0;
                
                li {
                    margin: 10px 0;
                    color: #666;
                }
            }
        }
    }
}
</style> 
 <!-- element-tag-marker: bwd5g129 -->