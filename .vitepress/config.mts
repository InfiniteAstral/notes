import { defineConfigWithTheme } from 'vitepress';
import AutoNav from "vite-plugin-vitepress-auto-nav";
import katex from 'katex';
import markdownItKatex from '@vscode/markdown-it-katex';
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { getReadingStatsFromFile, getTotalWordCount } from './utils/reading-stats';
import type { ThemeConfig } from './theme-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const getItemsSetting = () => {
  const settings: Record<string, { collapsed: boolean }> = {};
  const walk = (dir: string, relativeDir: string = '') => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (['node_modules', '.git', '.vitepress', 'dist', 'public', '.github'].includes(file)) continue;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const relativePath = path.join(relativeDir, file);
        const key = relativePath.split(path.sep).join('/');
        settings[key] = { collapsed: true };
        walk(filePath, relativePath);
      }
    }
  };
  walk(rootDir);
  return settings;
};

const itemsSetting = getItemsSetting();

const currentYear = new Date().getFullYear();
const totalWordCount = getTotalWordCount(rootDir);

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "拾星阁",
  description: "知识在此汇成高塔",
  head: [
    ['link', { rel: 'icon', href: 'https://static.owo.cab/favicon.ico' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'supported-color-schemes', content: 'light dark' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#1b1b1f' }],
  ],
  lang: 'zh-CN',
  appearance: true,
  transformPageData: (pageData) => {
    if (!pageData.filePath.endsWith('.md')) return;
    if (pageData.frontmatter?.layout === 'home') return;

    const absolutePath = path.resolve(rootDir, pageData.filePath);
    const stats = getReadingStatsFromFile(absolutePath);

    if (!stats) return;

    return {
      frontmatter: {
        ...pageData.frontmatter,
        wordCount: stats.wordCount,
        readingTime: stats.readingTime,
      },
    };
  },
  vite: {
    plugins: [
      MermaidPlugin() as any,
      AutoNav({
        itemsSetting,
        compareFn: (a, b) => {
          const getTitle = (item: any) =>
            item.frontmatter?.h1 || item.options?.title || item.name;
          return getTitle(a).localeCompare(getTitle(b), 'zh', { numeric: true });
        },
        useArticleTitle: true,
      }) as any,
    ],
    optimizeDeps: {
      include: ["mermaid"],
    },
    ssr: {
      noExternal: ["mermaid"],
    },
  },
  markdown: {
    config: (md) => {
      md.use((markdownItKatex as any).default ?? markdownItKatex, {
        katex,
        throwOnError: false,
        errorColor: '#cc0000',
        strict: 'ignore',
      });
      md.use(MermaidMarkdown);
    },
    lineNumbers: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "注意",
      infoLabel: "相关信息",
      detailsLabel: "详细信息"
    }
  },
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        },
        detailedView: true,
      },
    },
    sidebarMenuLabel: '菜单',
    outline: {
      level: [2, 5],
      label: '文章导航',
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '数学', link: '/数学' },
      { text: '计算机科学', link: '/计算机科学' },
      { text: '物理', link: '/物理' },
      { text: '其他', link: '/其他' },
    ],
    sidebar: [
      {
        text: 'Notes',
        items: [
          { text: '数学', link: '/数学' },
          { text: '计算机科学', link: '/计算机科学' },
          { text: '物理', link: '/物理' },
          { text: '其他', link: '/其他' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/InfiniteAstral/notes' }
    ],
    footer: {
      copyright: `© ${currentYear} InfiniteAstral · <a href="https://github.com/InfiniteAstral/notes" target="_blank" rel="noopener noreferrer">GitHub</a>`
    },
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        forceLocale: true,
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '主题模式',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    returnToTopLabel: '返回顶部',
    siteStats: {
      totalWordCount,
    },
  }
});
