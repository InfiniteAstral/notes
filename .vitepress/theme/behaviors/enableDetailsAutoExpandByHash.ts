import { getScrollOffset } from 'vitepress'

const DETAILS_SELECTOR = 'details.custom-block.details'
const CUSTOM_BLOCK_SELECTOR = '.custom-block'
const CUSTOM_BLOCK_TITLE_SELECTOR = ':scope > .custom-block-title'
const DETAILS_SUMMARY_SELECTOR = ':scope > summary'

function isSamePageLink(link: HTMLAnchorElement) {
  const href = link.getAttribute('href')
  if (!href) return false

  const targetUrl = new URL(href, window.location.href)
  const currentUrl = new URL(window.location.href)

  return (
    targetUrl.origin === currentUrl.origin &&
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.search === currentUrl.search &&
    !!targetUrl.hash
  )
}

function normalizeHash(hash: string) {
  if (!hash.startsWith('#') || hash.length <= 1) return null

  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return hash.slice(1)
  }
}

function getHashTarget() {
  const normalizedHash = normalizeHash(window.location.hash)
  if (!normalizedHash) return null

  return document.getElementById(normalizedHash)
}

function getAncestorDetails(target: HTMLElement) {
  const ancestors: HTMLDetailsElement[] = []
  let current = target.closest<HTMLDetailsElement>(DETAILS_SELECTOR)

  while (current) {
    ancestors.unshift(current)
    current = current.parentElement?.closest<HTMLDetailsElement>(DETAILS_SELECTOR) ?? null
  }

  return ancestors
}

function openAncestorDetails(target: HTMLElement) {
  const ancestors = getAncestorDetails(target)
  let hasOpened = false

  for (const details of ancestors) {
    if (!details.open) {
      details.open = true
      hasOpened = true
    }
  }

  return hasOpened
}

function getStickyTitleElement(container: HTMLElement) {
  if (container.matches(DETAILS_SELECTOR)) {
    return container.querySelector<HTMLElement>(DETAILS_SUMMARY_SELECTOR)
  }

  return container.querySelector<HTMLElement>(CUSTOM_BLOCK_TITLE_SELECTOR)
}

function getStickyTitleCoverOffset(target: HTMLElement) {
  const containers: HTMLElement[] = []
  let current = target.closest<HTMLElement>(CUSTOM_BLOCK_SELECTOR)

  while (current) {
    containers.unshift(current)
    current = current.parentElement?.closest<HTMLElement>(CUSTOM_BLOCK_SELECTOR) ?? null
  }

  return containers.reduce((sum, container) => {
    const title = getStickyTitleElement(container)
    if (!title) return sum

    return sum + (title.getBoundingClientRect().height || title.offsetHeight || 0)
  }, 0)
}

function scrollToTarget(target: HTMLElement) {
  const stickyTitleCoverOffset = getStickyTitleCoverOffset(target)
  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    getScrollOffset() -
    stickyTitleCoverOffset

  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'auto'
  })
}

function expandDetailsForHashTarget() {
  const target = getHashTarget()
  if (!target) return

  openAncestorDetails(target)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToTarget(target)
    })
  })
}

export function enableDetailsAutoExpandByHash() {
  if (typeof window === 'undefined') return

  let rafId: number | null = null

  const scheduleExpand = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      rafId = null
      expandDetailsForHashTarget()
    })
  }

  const observer = new MutationObserver(() => {
    if (window.location.hash) {
      scheduleExpand()
    }
  })

  const setup = () => {
    scheduleExpand()

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })

    window.addEventListener('hashchange', scheduleExpand, { passive: true })
    document.addEventListener(
      'click',
      (event) => {
        if (!(event.target instanceof Element)) return

        const link = event.target.closest<HTMLAnchorElement>('a')
        if (!link || !isSamePageLink(link)) return

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scheduleExpand()
          })
        })
      },
      { capture: true, passive: true }
    )
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
