const DOC_CONTENT_SELECTOR = '.VPDoc .vp-doc'
const LOCAL_SEARCH_SELECTOR = '.VPLocalSearchBox, .DocSearch-Modal'
const CUSTOM_BLOCK_SELECTOR = `${DOC_CONTENT_SELECTOR} .custom-block:not(.details)`
const DETAILS_SELECTOR = `${DOC_CONTENT_SELECTOR} details.custom-block.details`
const STICKY_ANCESTOR_SELECTOR = `${DOC_CONTENT_SELECTOR} .custom-block`

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

const STICKY_TITLE_BASE_Z_INDEX = 12

type StickyEntry = {
  container: HTMLElement
  title: HTMLElement
}

function getDirectTitle(container: Element, titleSelector: string) {
  return container.querySelector<HTMLElement>(titleSelector)
}

function collectStickyEntries() {
  const entries: StickyEntry[] = []

  for (const { containerSelector, titleSelector } of STICKY_CONTAINERS) {
    const containers = document.querySelectorAll<HTMLElement>(containerSelector)

    for (const container of containers) {
      const title = getDirectTitle(container, titleSelector)

      if (title) {
        entries.push({ container, title })
      }
    }
  }

  return entries
}

function getAncestorEntries(container: HTMLElement, entryMap: WeakMap<HTMLElement, StickyEntry>) {
  const ancestors: StickyEntry[] = []
  let ancestor = container.parentElement?.closest<HTMLElement>(STICKY_ANCESTOR_SELECTOR) ?? null

  while (ancestor) {
    const entry = entryMap.get(ancestor)

    if (entry) {
      ancestors.unshift(entry)
    }

    ancestor = ancestor.parentElement?.closest<HTMLElement>(STICKY_ANCESTOR_SELECTOR) ?? null
  }

  return ancestors
}

function getStickyTitleHeight(title: HTMLElement) {
  const titleStyle = window.getComputedStyle(title)

  if (titleStyle.position !== 'sticky') {
    return 0
  }

  return title.getBoundingClientRect().height || title.offsetHeight || 0
}

function resetStickyMetadata({ container, title }: StickyEntry) {
  container.dataset.stickyTitle = 'root'
  title.dataset.hasStackedChild = 'false'
  title.dataset.stickyState = 'idle'
  title.style.setProperty('--custom-block-title-stack-offset', '0px')
  title.style.setProperty('--custom-block-title-z-index', `${STICKY_TITLE_BASE_Z_INDEX}`)
}

function updateStickyMetadata(entry: StickyEntry, ancestors: StickyEntry[]) {
  const { container, title } = entry
  const depth = ancestors.length
  const stackOffset = ancestors.reduce((sum, ancestor) => sum + getStickyTitleHeight(ancestor.title), 0)

  container.dataset.stickyTitle = depth > 0 ? 'nested' : 'root'
  title.style.setProperty('--custom-block-title-stack-offset', `${stackOffset}px`)
  title.style.setProperty('--custom-block-title-z-index', `${Math.max(1, STICKY_TITLE_BASE_Z_INDEX - depth)}`)

  for (const ancestor of ancestors) {
    ancestor.title.dataset.hasStackedChild = 'true'
  }
}

function updateStickyState(container: HTMLElement, title: HTMLElement) {
  const titleStyle = window.getComputedStyle(title)

  if (titleStyle.position !== 'sticky') {
    title.dataset.stickyState = 'idle'
    return
  }

  const targetTop = parseFloat(titleStyle.top) || 0
  const titleRect = title.getBoundingClientRect()
  const hasLeftOriginalPosition = titleRect.top <= targetTop + 1

  title.dataset.stickyState = hasLeftOriginalPosition ? 'stuck' : 'idle'
}

function updateCustomBlockStickyTitles() {
  if (document.querySelector(LOCAL_SEARCH_SELECTOR)) {
    return
  }

  const entries = collectStickyEntries()
  const entryMap = new WeakMap<HTMLElement, StickyEntry>()

  for (const entry of entries) {
    entryMap.set(entry.container, entry)
    resetStickyMetadata(entry)
  }

  for (const entry of entries) {
    const ancestors = getAncestorEntries(entry.container, entryMap)
    updateStickyMetadata(entry, ancestors)
    updateStickyState(entry.container, entry.title)
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
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'class', 'data-animation-direction', 'data-is-animating']
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
