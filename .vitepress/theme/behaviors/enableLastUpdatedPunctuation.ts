function patchLastUpdatedPunctuation() {
  const elements = document.querySelectorAll<HTMLElement>('.VPLastUpdated')

  for (const element of elements) {
    const firstNode = element.firstChild

    if (!(firstNode instanceof Text)) continue

    const text = firstNode.textContent ?? ''
    const patched = text.replace(/:\s*$/, '：')

    if (patched !== text) {
      firstNode.textContent = patched
    }
  }
}

export function enableLastUpdatedPunctuation() {
  if (typeof window === 'undefined') return

  const observer = new MutationObserver(() => {
    patchLastUpdatedPunctuation()
  })

  const setup = () => {
    patchLastUpdatedPunctuation()

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
