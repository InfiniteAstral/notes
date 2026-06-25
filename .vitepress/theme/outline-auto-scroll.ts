import { getScrollOffset } from 'vitepress'

const DESKTOP_MIN_WIDTH = 1280
const TARGET_RATIO = 1 / 3
const TOP_TRIGGER_RATIO = 0.24
const BOTTOM_TRIGGER_RATIO = 0.46
const SCROLL_TOLERANCE = 16
const MANUAL_SCROLL_COOLDOWN = 1200
const AUTO_SCROLL_GUARD = 500

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeHash(value: string | null | undefined) {
  if (!value) return null

  const hashIndex = value.indexOf('#')
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : value

  if (!hash.startsWith('#')) return null

  try {
    return `#${decodeURIComponent(hash.slice(1))}`
  } catch {
    return hash
  }
}

function getAbsoluteTop(element: HTMLElement) {
  let offsetTop = 0
  let current: HTMLElement | null = element

  while (current !== document.body) {
    if (current === null) {
      return Number.NaN
    }

    offsetTop += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }

  return offsetTop
}

export function enableOutlineAutoScroll() {
  if (typeof window === 'undefined') return

  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`)
  let scheduled = false
  const manualScrollUntil = new WeakMap<HTMLElement, number>()
  const lastProgrammaticScrollAt = new WeakMap<HTMLElement, number>()

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const isDesktop = () => mediaQuery.matches

  const getAsideContainer = () =>
    document.querySelector<HTMLElement>('.VPDoc .aside-container')

  const getDropdownContainer = () =>
    document.querySelector<HTMLElement>('.VPLocalNavOutlineDropdown .items')

  const getOutlineHeadings = () => {
    const outlineLinks = document.querySelectorAll<HTMLAnchorElement>(
      '.VPDocAsideOutline .outline-link'
    )

    const headings = Array.from(outlineLinks)
      .map((link) => normalizeHash(link.getAttribute('href') ?? link.hash))
      .filter((hash): hash is string => hash !== null)
      .map((hash) => {
        const element = document.getElementById(hash.slice(1))

        return {
          hash,
          top: element ? getAbsoluteTop(element) : Number.NaN
        }
      })
      .filter((heading) => !Number.isNaN(heading.top))
      .sort((a, b) => a.top - b.top)

    if (headings.length > 0) {
      return headings
    }

    return Array.from(
      document.querySelectorAll<HTMLElement>('.VPDoc :where(h1,h2,h3,h4,h5,h6)')
    )
      .filter((heading) => heading.id)
      .map((heading) => ({
        hash: `#${heading.id}`,
        top: getAbsoluteTop(heading)
      }))
      .filter((heading) => !Number.isNaN(heading.top))
      .sort((a, b) => a.top - b.top)
  }

  const getActiveHash = () => {
    const headings = getOutlineHeadings()
    if (!headings.length) return null

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

    if (scrollY < 1) return null
    if (isBottom) return headings[headings.length - 1].hash

    let activeHash: string | null = null

    for (const { hash, top } of headings) {
      if (top > scrollY + getScrollOffset() + 4) {
        break
      }

      activeHash = hash
    }

    return activeHash
  }

  const findLinkByHash = (root: ParentNode, hash: string | null) => {
    if (!hash) return null

    const links = root.querySelectorAll<HTMLAnchorElement>('.outline-link')

    for (const link of links) {
      if (normalizeHash(link.getAttribute('href') ?? link.hash) === hash) {
        return link
      }
    }

    return null
  }

  const syncDropdownActiveState = (hash: string | null) => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      '.VPLocalNavOutlineDropdown .outline-link'
    )

    for (const link of links) {
      const isActive = normalizeHash(link.getAttribute('href') ?? link.hash) === hash
      link.classList.toggle('active', isActive)
    }
  }

  const markManualScrollIntent = (container: HTMLElement) => {
    manualScrollUntil.set(
      container,
      performance.now() + MANUAL_SCROLL_COOLDOWN
    )
  }

  const shouldSkipAutoScroll = (container: HTMLElement) =>
    performance.now() < (manualScrollUntil.get(container) ?? 0)

  const syncContainerPosition = (
    container: HTMLElement | null,
    activeLink: HTMLAnchorElement | null
  ) => {
    if (!container || !activeLink) return
    if (shouldSkipAutoScroll(container)) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = activeLink.getBoundingClientRect()
    const currentTop = activeRect.top - containerRect.top
    const currentBottom = activeRect.bottom - containerRect.top
    const triggerTop = container.clientHeight * TOP_TRIGGER_RATIO
    const triggerBottom = container.clientHeight * BOTTOM_TRIGGER_RATIO

    if (currentTop >= triggerTop && currentBottom <= triggerBottom) return

    const activeOffsetTop =
      activeRect.top - containerRect.top + container.scrollTop
    const targetScrollTop = clamp(
      activeOffsetTop - container.clientHeight * TARGET_RATIO,
      0,
      Math.max(container.scrollHeight - container.clientHeight, 0)
    )

    if (Math.abs(container.scrollTop - targetScrollTop) <= SCROLL_TOLERANCE) {
      return
    }

    lastProgrammaticScrollAt.set(container, performance.now())
    container.scrollTo({
      top: targetScrollTop,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    })
  }

  const syncOutlinePosition = () => {
    scheduled = false

    const activeHash = getActiveHash()
    const asideContainer = getAsideContainer()
    const dropdownContainer = getDropdownContainer()
    const asideOutline = document.querySelector('.VPDocAsideOutline')

    syncDropdownActiveState(activeHash)

    if (isDesktop()) {
      syncContainerPosition(
        asideContainer,
        asideOutline ? findLinkByHash(asideOutline, activeHash) : null
      )
      return
    }

    syncContainerPosition(
      dropdownContainer,
      dropdownContainer ? findLinkByHash(dropdownContainer, activeHash) : null
    )
  }

  const scheduleSync = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(syncOutlinePosition)
  }

  const onPossibleManualScroll = (event: Event) => {
    const target = event.target
    if (!(target instanceof Node)) return

    const containers = [getAsideContainer(), getDropdownContainer()]

    for (const container of containers) {
      if (container && (container === target || container.contains(target))) {
        markManualScrollIntent(container)
      }
    }
  }

  const onContainerScroll = (event: Event) => {
    const target = event.target
    if (!(target instanceof HTMLElement)) return

    const lastScrollAt = lastProgrammaticScrollAt.get(target) ?? 0
    if (performance.now() - lastScrollAt >= AUTO_SCROLL_GUARD) {
      onPossibleManualScroll(event)
    }
  }

  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.target instanceof HTMLElement &&
        (mutation.target.classList.contains('outline-link') ||
          mutation.target.closest('.VPDocAsideOutline'))
      ) {
        scheduleSync()
        return
      }

      if (mutation.type === 'childList') {
        scheduleSync()
        return
      }
    }
  })

  const setup = () => {
    document.addEventListener('wheel', onPossibleManualScroll, {
      passive: true
    })
    document.addEventListener('touchstart', onPossibleManualScroll, {
      passive: true
    })
    document.addEventListener('pointerdown', onPossibleManualScroll, {
      passive: true
    })
    document.addEventListener('scroll', onContainerScroll, {
      passive: true,
      capture: true
    })
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync, { passive: true })
    window.addEventListener('hashchange', scheduleSync, { passive: true })
    mediaQuery.addEventListener('change', scheduleSync)

    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    })

    scheduleSync()
    window.setTimeout(scheduleSync, 120)
    window.setTimeout(scheduleSync, 360)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
