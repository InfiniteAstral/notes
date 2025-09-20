<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeContent from './HomeContent.vue'
import { useData } from 'vitepress'
import { toggleDark } from './Dark'

const { Layout } = DefaultTheme
const { isDark } = useData()
toggleDark(isDark)
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomeContent />
    </template>
  </Layout>
</template>