<!--
 * @Date: 2025-01-23 13:44:33
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 13:46:45
 * @FilePath: /element-tag-marker/example/webpack-vue2/src/App.vue
-->
<template>
  <div class="app">
    <nav class="navbar">
      <div class="logo">CreativeCo</div>
      <div class="nav-links">
        <a href="#home">首页</a>
        <a href="#products">产品</a>
        <a href="#about">关于</a>
        <a href="#contact">联系我们</a>
      </div>
    </nav>

    <section class="hero" id="home">
      <h1>创意无限可能</h1>
      <p>用创意改变世界，让设计更有价值</p>
      <button class="cta-button" @click="learnMore">了解更多</button>
    </section>

    <section class="products" id="products">
      <h2>我们的产品</h2>
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      products: [
        {
          id: 1,
          name: '创意设计服务',
          description: '专业的品牌设计与视觉创意服务',
          image: '/product1.jpg'
        },
        {
          id: 2,
          name: '数字营销',
          description: '全方位的数字营销解决方案',
          image: '/product2.jpg'
        }
      ]
    }
  },
  methods: {
    learnMore() {
      console.log('了解更多');
    }
  }
}
</script>

<style src="./App.css"></style> 