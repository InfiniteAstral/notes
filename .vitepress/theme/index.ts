import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import HomeLayout from './layouts/HomeLayout.vue'
import CourseLink from './components/global/CourseLink.vue'
import InlineMath from './components/global/InlineMath.vue'
import './styles/index.css'
import { enableDetailsAnimation } from './behaviors/enableDetailsAnimation'
import { enableLastUpdatedPunctuation } from './behaviors/enableLastUpdatedPunctuation'
import { enableOutlineAutoScroll } from './behaviors/enableOutlineAutoScroll'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('CourseLink', CourseLink)
    app.component('InlineMath', InlineMath)
    enableDetailsAnimation()
    enableLastUpdatedPunctuation()
    enableOutlineAutoScroll()
  }
} satisfies Theme
