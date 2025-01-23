<!--
 * @Date: 2025-01-23 13:44:37
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 13:46:39
 * @FilePath: /element-tag-marker/example/webpack-vue3/src/App.vue
-->
<template>
  <div class="app">
    <nav class="navbar">
      <div class="logo">FutureTech</div>
      <div class="nav-links">
        <a v-for="link in navLinks" 
           :key="link.id" 
           :href="link.href"
           @click="scrollToSection(link.href)">
          {{ link.text }}
        </a>
      </div>
    </nav>

    <section class="hero" id="home">
      <h1>{{ heroTitle }}</h1>
      <p>{{ heroSubtitle }}</p>
      <button class="cta-button" @click="handleCTA">
        {{ ctaText }}
      </button>
    </section>

    <section class="features" id="features">
      <h2>核心优势</h2>
      <div class="feature-grid">
        <div v-for="feature in features" 
             :key="feature.id" 
             class="feature-card">
          <i :class="feature.icon"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import './App.css'

export default defineComponent({
  name: 'App',
  setup() {
    const navLinks = ref([
      { id: 1, text: '首页', href: '#home' },
      { id: 2, text: '特性', href: '#features' },
      { id: 3, text: '关于', href: '#about' },
      { id: 4, text: '联系我们', href: '#contact' }
    ])

    const features = ref([
      {
        id: 1,
        title: '人工智能',
        description: '领先的AI技术应用',
        icon: 'ai-icon'
      },
      {
        id: 2,
        title: '区块链',
        description: '安全可靠的区块链解决方案',
        icon: 'blockchain-icon'
      }
    ])

    const heroTitle = ref('未来科技，现在开始')
    const heroSubtitle = ref('用科技改变世界，创造美好未来')
    const ctaText = ref('开始探索')

    const handleCTA = () => {
      console.log('CTA clicked')
    }

    const scrollToSection = (href: string) => {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }

    return {
      navLinks,
      features,
      heroTitle,
      heroSubtitle,
      ctaText,
      handleCTA,
      scrollToSection
    }
  }
})
</script> 