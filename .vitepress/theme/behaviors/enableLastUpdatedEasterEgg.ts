const EASTER_EGG_TEXT = '不管是谁看到楼主这个点还在写文章都会落泪的 QAQ'
const QUALIFY_START_HOUR = 0
const QUALIFY_END_HOUR = 8

const wiredElements = new WeakSet<HTMLElement>()
const TOOLTIP_EDGE_PADDING = 16
const TOOLTIP_MAX_WIDTH = 360

function usesTouchTooltipMode() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

function updateTooltipPlacement(container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const tooltipWidth = Math.min(TOOLTIP_MAX_WIDTH, viewportWidth - TOOLTIP_EDGE_PADDING * 2)
  const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2
  const centeredRight = rect.left + rect.width / 2 + tooltipWidth / 2

  if (centeredLeft < TOOLTIP_EDGE_PADDING) {
    container.dataset.easterEggPlacement = 'start'
    return
  }

  if (centeredRight > viewportWidth - TOOLTIP_EDGE_PADDING) {
    container.dataset.easterEggPlacement = 'end'
    return
  }

  container.dataset.easterEggPlacement = 'center'
}

function isEarlyMorningUpdate(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  if (hours < QUALIFY_START_HOUR || hours >= QUALIFY_END_HOUR) {
    return false
  }

  return hours > QUALIFY_START_HOUR || minutes > 0 || seconds > 0 || milliseconds > 0
}

function closeOpenTooltips(except?: HTMLElement) {
  const elements = document.querySelectorAll<HTMLElement>('.last-updated[data-easter-egg-enabled="true"]')

  for (const element of elements) {
    if (element !== except) {
      element.dataset.easterEggOpen = 'false'
    }
  }
}

function wireTooltipBehavior(container: HTMLElement) {
  if (wiredElements.has(container)) {
    return
  }

  wiredElements.add(container)
  container.addEventListener('click', (event) => {
    if (!usesTouchTooltipMode()) {
      return
    }

    event.stopPropagation()
    const nextState = container.dataset.easterEggOpen !== 'true'
    closeOpenTooltips(nextState ? container : undefined)
    container.dataset.easterEggOpen = nextState ? 'true' : 'false'
  })

  container.addEventListener('keydown', (event) => {
    if (!usesTouchTooltipMode()) {
      return
    }

    if (event.key === 'Escape') {
      container.dataset.easterEggOpen = 'false'
    }
  })

  container.addEventListener('blur', () => {
    if (usesTouchTooltipMode()) {
      container.dataset.easterEggOpen = 'false'
    }
  })
}

function patchLastUpdatedEasterEgg() {
  const containers = document.querySelectorAll<HTMLElement>('.last-updated')

  for (const container of containers) {
    const time = container.querySelector<HTMLTimeElement>('.VPLastUpdated time[datetime]')
    const rawDatetime = time?.dateTime
    const updatedAt = rawDatetime ? new Date(rawDatetime) : null
    const shouldEnable = updatedAt instanceof Date && !Number.isNaN(updatedAt.getTime()) && isEarlyMorningUpdate(updatedAt)

    if (!shouldEnable) {
      container.dataset.easterEggEnabled = 'false'
      container.dataset.easterEggOpen = 'false'
      container.dataset.easterEggInteraction = 'none'
      container.dataset.easterEggPlacement = 'center'
      container.removeAttribute('tabindex')
      container.removeAttribute('aria-label')
      continue
    }

    container.dataset.easterEggEnabled = 'true'
    container.dataset.easterEggOpen = container.dataset.easterEggOpen === 'true' ? 'true' : 'false'
    container.dataset.easterEggText = EASTER_EGG_TEXT
    container.dataset.easterEggInteraction = usesTouchTooltipMode() ? 'tap' : 'hover'
    updateTooltipPlacement(container)

    if (usesTouchTooltipMode()) {
      container.setAttribute('tabindex', '0')
    } else {
      container.removeAttribute('tabindex')
      container.dataset.easterEggOpen = 'false'
    }

    container.setAttribute('aria-label', EASTER_EGG_TEXT)
    wireTooltipBehavior(container)
  }
}

export function enableLastUpdatedEasterEgg() {
  if (typeof window === 'undefined') return

  const observer = new MutationObserver(() => {
    patchLastUpdatedEasterEgg()
  })

  const handleDocumentClick = (event: MouseEvent) => {
    if (!usesTouchTooltipMode()) {
      return
    }

    const target = event.target as HTMLElement | null

    if (!target?.closest('.last-updated[data-easter-egg-enabled="true"]')) {
      closeOpenTooltips()
    }
  }

  const setup = () => {
    patchLastUpdatedEasterEgg()

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })

    document.addEventListener('click', handleDocumentClick)
    window.addEventListener('resize', patchLastUpdatedEasterEgg)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
