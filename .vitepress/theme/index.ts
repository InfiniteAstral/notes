import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import HomeLayout from './layouts/HomeLayout.vue'
import CourseLink from './components/global/CourseLink.vue'
import InlineMath from './components/global/InlineMath.vue'
import './styles/index.css'
import { enableDetailsAutoExpandByHash } from './behaviors/enableDetailsAutoExpandByHash'
import { enableCustomBlockStickyTitles } from './behaviors/enableCustomBlockStickyTitles'
import { enableDetailsAnimation } from './behaviors/enableDetailsAnimation'
import { enableLastUpdatedEasterEgg } from './behaviors/enableLastUpdatedEasterEgg'
import { enableLastUpdatedPunctuation } from './behaviors/enableLastUpdatedPunctuation'
import { enableNotoSansScFallback } from './behaviors/enableNotoSansScFallback'
import { enableOutlineAutoScroll } from './behaviors/enableOutlineAutoScroll'
import { enableSearchDetailsPreview } from './behaviors/enableSearchDetailsPreview'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('CourseLink', CourseLink)
    app.component('InlineMath', InlineMath)
    enableNotoSansScFallback()
    enableDetailsAutoExpandByHash()
    enableSearchDetailsPreview()
    enableCustomBlockStickyTitles()
    enableDetailsAnimation()
    enableLastUpdatedEasterEgg()
    enableLastUpdatedPunctuation()
    enableOutlineAutoScroll()
  }
} satisfies Theme
