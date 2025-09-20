<script setup>
import { ref, onMounted } from 'vue'

const contributorsSvg = ref('')
const contributorsContainer = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            const response = await fetch('https://api.owo.cab/gh-contributors?owner=InfiniteAstral&repo=notes')
            if (response.ok) {
              contributorsSvg.value = await response.text()
            }
          } catch (error) {
            // Handle error if needed
          }
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '0px',
      threshold: 0.1
    }
  )

  if (contributorsContainer.value) {
    observer.observe(contributorsContainer.value)
  }
})
</script>

<template>
  <div class="home-content">
    <!-- <h2>欢迎来到拾星絮语的笔记小站</h2> -->
    <p class="important-para">这里是<strong>拾星絮语的笔记小站</strong>，一个记录学习点滴、分享知识心得的笔记站点。</p>
    <p>建立这个网站的初衷，是希望能够系统地整理自己的学习笔记，将零散的知识串联起来，形成一个更加完整的知识体系。同时，也希望这些笔记能够对任何来到这里的人有所帮助，哪怕只是解决了一个小小的疑惑，或是激发了一点学习的兴趣。</p>
    <p class="important-para">
      <strong>
        驻足小站，愿以知识为灯，照亮你我求索之路；
        <br />
        采撷智慧，愿以星光为伴，共赴学海远航之梦。
      </strong>
    </p>
    <p>也愿这个小站能够不断成长，内容日益丰明，成为一个真正有价值的知识宝库。</p>
  </div>
  <div ref="contributorsContainer" class="contributors-container">
    <h2>本站的贡献者</h2>
    <div v-if="contributorsSvg" v-html="contributorsSvg" class="contributors-svg"></div>
    <div v-else class="skeleton-loader">
      <div class="skeleton-avatars">
        <div v-for="n in 2" :key="n" class="skeleton-avatar"></div>
      </div>
      <div class="skeleton-names">
        <div v-for="n in 2" :key="n" class="skeleton-name"></div>
      </div>
    </div>
  </div>
  <div class="category-container">
    <h2>学科分类</h2>
  </div>
</template>

<style scoped>
.home-content,
.category-container,
.contributors-container {
  max-width: 960px;
  margin: 0px auto;
  padding: 0 32px 32px;
  text-align: center;

  .important-para {
    color: var(--vp-c-text-1);
  }
}

.category-container {
  padding: 0;
}

.contributors-container {
  background-color: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  text-align: center;

  h2 {
    margin: 0;
  }

  .contributors-svg {
    display: flex;
    min-height: 150px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.skeleton-loader {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  gap: 5px;
}

.skeleton-avatars {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.skeleton-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-names {
  display: flex;
  flex-direction: row;
  gap: 48px;
}

.skeleton-name {
  width: 48px;
  height: 10px;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
  position: relative;
  overflow: hidden;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-placeholder {
  display: flex;
  min-height: 150px;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-2);
}

.contributors-container :deep(rect[fill="white"]) {
  fill: var(--vp-c-bg);
}

h2 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
}

p {
  font-size: 16px;
  line-height: 28px;
  text-align: left;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}
</style>