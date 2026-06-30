const GOOGLE_FONT_LINK_ID = 'noto-sans-sc-google-font'
const GOOGLE_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'

const FONT_TEST_TEXT = '中文标点AaBb1234567890，。：；（）《》'
const FONT_TEST_SIZE = '72px'
const FALLBACK_FONT_FAMILIES = ['monospace', 'sans-serif', 'serif'] as const

function measureFontWidth(fontFamily: string) {
  const probe = document.createElement('span')
  probe.textContent = FONT_TEST_TEXT
  probe.setAttribute('aria-hidden', 'true')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.pointerEvents = 'none'
  probe.style.whiteSpace = 'nowrap'
  probe.style.fontSize = FONT_TEST_SIZE
  probe.style.fontFamily = fontFamily
  probe.style.fontWeight = '400'
  probe.style.fontStyle = 'normal'
  probe.style.letterSpacing = '0'

  document.body.append(probe)
  const width = probe.getBoundingClientRect().width
  probe.remove()

  return width
}

function hasLocalNotoSansSc() {
  if (typeof document === 'undefined') return false
  if (!document.body) return false

  return FALLBACK_FONT_FAMILIES.some((fallback) => {
    const fallbackWidth = measureFontWidth(fallback)
    const targetWidth = measureFontWidth(`"Noto Sans SC", ${fallback}`)

    return targetWidth !== fallbackWidth
  })
}

function injectGoogleFontLink() {
  if (document.getElementById(GOOGLE_FONT_LINK_ID)) return

  const link = document.createElement('link')
  link.id = GOOGLE_FONT_LINK_ID
  link.rel = 'stylesheet'
  link.href = GOOGLE_FONT_HREF
  document.head.append(link)
}

export function enableNotoSansScFallback() {
  if (typeof window === 'undefined') return
  if (hasLocalNotoSansSc()) return

  const setup = () => {
    if (hasLocalNotoSansSc()) return
    injectGoogleFontLink()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true })
    return
  }

  setup()
}
