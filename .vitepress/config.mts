import { defineConfig } from 'vitepress';
import AutoNav from "vite-plugin-vitepress-auto-nav";
import katex from 'katex';
import markdownItKatex from '@vscode/markdown-it-katex';
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "拾星阁",
  description: "知识在此汇成高塔",
  head: [['link', { rel: 'icon', href: 'https://static.owo.cab/favicon.ico' }]],
  lang: 'zh-CN',
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
    outline: {
      level: [2, 4]
    },
    nav: [
      { text: 'Home', link: '/' },
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
    }
  }
});
