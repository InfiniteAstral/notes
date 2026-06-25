import type { DefaultTheme } from 'vitepress'

export interface SiteStats {
  totalWordCount: number
}

export interface ThemeConfig extends DefaultTheme.Config {
  siteStats: SiteStats
}
