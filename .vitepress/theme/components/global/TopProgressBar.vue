<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Router } from 'vitepress'
import { useRouter } from 'vitepress'

const START_PROGRESS = 30
const TRICKLE_LIMIT = 80
const TRICKLE_INTERVAL = 200
const MIN_VISIBLE = 250
const FADE_OUT = 220
const SAFETY_TIMEOUT = 8000

const router = useRouter()

const visible = ref(false)
const progress = ref(0)

let active = false
let startedAt = 0
let trickleTimer: number | undefined
let safetyTimer: number | undefined
let hideTimer: number | undefined
let resetTimer: number | undefined
let previousHooks: Pick<
  Router,
  'onBeforePageLoad' | 'onAfterPageLoad' | 'onAfterRouteChange'
> = {}

const clearTimers = () => {
  if (trickleTimer !== undefined) window.clearInterval(trickleTimer)
  if (safetyTimer !== undefined) window.clearTimeout(safetyTimer)
  if (hideTimer !== undefined) window.clearTimeout(hideTimer)
  if (resetTimer !== undefined) window.clearTimeout(resetTimer)
  trickleTimer = safetyTimer = hideTimer = resetTimer = undefined
}

const complete = () => {
  if (!active) return

  active = false
  clearTimers()
  progress.value = 100

  const elapsed = performance.now() - startedAt
  const delay = Math.max(0, MIN_VISIBLE - elapsed)

  hideTimer = window.setTimeout(() => {
    visible.value = false
    resetTimer = window.setTimeout(() => {
      progress.value = 0
    }, FADE_OUT)
  }, delay)
}

const start = () => {
  if (active) return

  active = true
  startedAt = performance.now()
  clearTimers()

  if (!visible.value) {
    progress.value = 0
    visible.value = true

    // 先渲染 0 宽度，再推进到起始值，保证宽度有过渡而不是瞬间出现
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (active) progress.value = START_PROGRESS
      })
    })
  }

  trickleTimer = window.setInterval(() => {
    const remaining = TRICKLE_LIMIT - progress.value
    if (remaining <= 0) return
    progress.value += remaining * 0.12
  }, TRICKLE_INTERVAL)

  // 页面组件加载失败等极端情况下不会触发完成钩子，超时后强制收起
  safetyTimer = window.setTimeout(complete, SAFETY_TIMEOUT)
}

onMounted(() => {
  previousHooks = {
    onBeforePageLoad: router.onBeforePageLoad,
    onAfterPageLoad: router.onAfterPageLoad,
    onAfterRouteChange: router.onAfterRouteChange,
  }

  router.onBeforePageLoad = async (to) => {
    start()
    const result = await previousHooks.onBeforePageLoad?.(to)
    if (result === false) complete()
    return result
  }

  router.onAfterPageLoad = async (to) => {
    await previousHooks.onAfterPageLoad?.(to)
    complete()
  }

  router.onAfterRouteChange = async (to) => {
    await previousHooks.onAfterRouteChange?.(to)
    complete()
  }
})

onUnmounted(() => {
  clearTimers()
  router.onBeforePageLoad = previousHooks.onBeforePageLoad
  router.onAfterPageLoad = previousHooks.onAfterPageLoad
  router.onAfterRouteChange = previousHooks.onAfterRouteChange
})
</script>

<template>
  <div
    class="TopProgressBar"
    :class="{ 'is-visible': visible }"
    aria-hidden="true"
  >
    <div class="TopProgressBar__bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped>
.TopProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* 高于 nav(30)、layout-top(40)、backdrop(50)、sidebar(60)、footer(10) */
  z-index: 100;
  height: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease-out;
}

.TopProgressBar.is-visible {
  opacity: 1;
}

.TopProgressBar__bar {
  height: 100%;
  background-image: linear-gradient(
    90deg,
    var(--vp-c-brand-2),
    var(--vp-c-brand-1)
  );
  /* box-shadow: 0 0 8px var(--vp-c-brand-1); */
  transition: width 240ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .TopProgressBar {
    transition: none;
  }

  .TopProgressBar__bar {
    transition: width 100ms linear;
  }
}
</style>
