const GOOGLE_FONT_LINK_ID = 'noto-sans-sc-google-font'
const GOOGLE_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'

function hasLocalNotoSansSc() {
  if (typeof document === 'undefined') return false
  if (!('fonts' in document) || typeof document.fonts.check !== 'function') {
    return false
  }

  return document.fonts.check('16px "Noto Sans SC"', '测')
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
