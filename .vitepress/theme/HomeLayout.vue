<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeContent from './HomeContent.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomeContent />
    </template>
  </Layout>
</template>