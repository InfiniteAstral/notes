import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import CourseLink from './CourseLink.vue'
import './style.css'
import { enableDetailsAnimation } from './details-animation'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('CourseLink', CourseLink)
    enableDetailsAnimation()
  }
} satisfies Theme