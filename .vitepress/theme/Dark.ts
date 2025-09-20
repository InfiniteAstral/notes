import { nextTick, provide } from 'vue'

const enableTransitions = () => {
  return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

export const toggleDark = (isDark) => {
  provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }
    document.documentElement.style.setProperty('--darkX', x + 'px')
    document.documentElement.style.setProperty('--darkY', y + 'px')
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready
  })
}