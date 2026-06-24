import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import HomeLayout from './HomeLayout.vue'
import CourseLink from './CourseLink.vue'
import InlineMath from './InlineMath.vue'
import './style.css'
import { enableDetailsAnimation } from './details-animation'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('CourseLink', CourseLink)
    app.component('InlineMath', InlineMath)
    enableDetailsAnimation()
  }
} satisfies Theme
