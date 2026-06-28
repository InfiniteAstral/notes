const CUSTOM_BLOCK_SELECTOR = '.vp-doc .custom-block:not(.details)'
const DETAILS_SELECTOR = '.vp-doc details.custom-block.details'
const STICKY_ANCESTOR_SELECTOR = '.vp-doc .custom-block'

const STICKY_CONTAINERS = [
  {
    containerSelector: CUSTOM_BLOCK_SELECTOR,
    titleSelector: ':scope > .custom-block-title'
  },
  {
    containerSelector: DETAILS_SELECTOR,
    titleSelector: ':scope > summary'
  }
] as const

function getDirectTitle(container: Element, titleSelector: string) {
  return container.querySelector<HTMLElement>(titleSelector)
}

function updateStickyMetadata(container: HTMLElement, title: HTMLElement) {
  const ancestor = container.parentElement?.closest<HTMLElement>(STICKY_ANCESTOR_SELECTOR) ?? null
  const stickyMode = ancestor ? 'nested' : 'root'

  container.dataset.stickyTitle = stickyMode
  title.dataset.hasStackedChild = 'false'
  title.dataset.stickyState = 'idle'
  title.style.setProperty('--custom-block-title-stack-offset', '0px')
  title.style.setProperty('--custom-block-title-z-index', '12')
}

function updateStickyState(container: HTMLElement, title: HTMLElement) {
  const titleStyle = window.getComputedStyle(title)

  if (titleStyle.position !== 'sticky') {
    title.dataset.stickyState = 'idle'
    return
  }

  const targetTop = parseFloat(titleStyle.top) || 0
  const titleRect = title.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const isPinnedToTop = Math.abs(titleRect.top - targetTop) <= 1
  const canRemainPinned = containerRect.bottom - titleRect.height > targetTop + 1

  title.dataset.stickyState = isPinnedToTop && canRemainPinned ? 'stuck' : 'idle'
}

function updateCustomBlockStickyTitles() {
  for (const { containerSelector, titleSelector } of STICKY_CONTAINERS) {
    const containers = document.querySelectorAll<HTMLElement>(containerSelector)

    for (const container of containers) {
      const title = getDirectTitle(container, titleSelector)

      if (!title) {
        continue
      }

      updateStickyMetadata(container, title)
      updateStickyState(container, title)
    }
  }
}

export function enableCustomBlockStickyTitles() {
  if (typeof window === 'undefined') return

  let rafId: number | null = null

  const scheduleUpdate = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      rafId = null
      updateCustomBlockStickyTitles()
    })
  }

  const observer = new MutationObserver(() => {
    scheduleUpdate()
  })

  const setup = () => {
    scheduleUpdate()

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
