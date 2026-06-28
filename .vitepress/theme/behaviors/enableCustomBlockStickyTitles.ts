const SELECTOR = '.vp-doc .custom-block:not(.details)'
const TITLE_SELECTOR = ':scope > .custom-block-title'

function getDirectTitle(container: Element) {
  return container.querySelector<HTMLElement>(TITLE_SELECTOR)
}

function updateCustomBlockStickyTitles() {
  const containers = document.querySelectorAll<HTMLElement>(SELECTOR)

  for (const container of containers) {
    const title = getDirectTitle(container)

    if (!title) {
      continue
    }

    let ancestor = container.parentElement?.closest<HTMLElement>(SELECTOR) ?? null
    const stickyMode = ancestor ? 'nested' : 'root'

    container.dataset.stickyTitle = stickyMode
    title.dataset.hasStackedChild = 'false'
    title.style.setProperty('--custom-block-title-stack-offset', '0px')
    title.style.setProperty('--custom-block-title-z-index', '12')
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

    window.addEventListener('resize', scheduleUpdate)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
