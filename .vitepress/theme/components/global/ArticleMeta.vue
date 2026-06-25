<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const stats = computed(() => {
  const wordCount = Number(frontmatter.value.wordCount)
  const readingTime = Number(frontmatter.value.readingTime)

  if (!Number.isFinite(wordCount) || !Number.isFinite(readingTime)) return null
  if (frontmatter.value.articleMeta === false || page.value.isNotFound) return null

  return {
    wordCount: wordCount.toLocaleString('zh-CN'),
    readingTime,
  }
})
</script>

<template>
  <p v-if="stats" class="article-meta">
    本页共 {{ stats.wordCount }} 字，阅读需要约 {{ stats.readingTime }} 分钟
  </p>
</template>

<style scoped>
.article-meta {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}
</style>
