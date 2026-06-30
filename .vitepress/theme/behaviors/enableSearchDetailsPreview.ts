const SEARCH_DETAILS_SELECTOR = '.VPLocalSearchBox .excerpt .vp-doc details.custom-block.details'

function openSearchPreviewDetails() {
  const detailsList = document.querySelectorAll<HTMLDetailsElement>(SEARCH_DETAILS_SELECTOR)

  for (const details of detailsList) {
    details.open = true
  }
}

export function enableSearchDetailsPreview() {
  if (typeof window === 'undefined') return

  let rafId: number | null = null

  const scheduleOpen = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      rafId = null
      openSearchPreviewDetails()
    })
  }

  const observer = new MutationObserver(() => {
    scheduleOpen()
  })

  const setup = () => {
    scheduleOpen()

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open']
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
