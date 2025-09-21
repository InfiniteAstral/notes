<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeContent from './HomeContent.vue'
import { useData } from 'vitepress'
import { toggleDark } from './Dark'

const { Layout } = DefaultTheme
const { isDark, theme, frontmatter } = useData()
toggleDark(isDark)
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <HomeContent v-if="frontmatter.layout === 'home'" />
    </template>
    <template #layout-bottom>
      <footer v-if="theme.footer && frontmatter.layout !== 'home'" class="VPFooter">
        <div class="container">
          <p class="copyright" v-html="theme.footer.copyright"></p>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.copyright :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.copyright :deep(a:hover) {
  color: var(--vp-c-text-1);
}
</style>