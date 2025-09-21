import { defineConfig } from 'vitepress';
import AutoNav from "vite-plugin-vitepress-auto-nav";

import mathjax3 from 'markdown-it-mathjax3';
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";

const customElements = [
  'mjx-assistive-mml',
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
];

const currentYear = new Date().getFullYear();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "拾星絮语『笔记小站』",
  description: "拾星絮语的笔记小站，知识在此汇成高塔。",
  head: [['link', { rel: 'icon', href: 'https://static.owo.cab/favicon.ico' }]],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
  vite: {
    plugins: [
      MermaidPlugin(),
      AutoNav({
        compareFn: (a, b) => {
          const getTitle = (item) =>
            item.frontmatter?.h1 || item.options?.title || item.name;
          return getTitle(a).localeCompare(getTitle(b), 'zh');
        },
        useArticleTitle: true,
      }),
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
      md.use(mathjax3);
      md.use(MermaidMarkdown);
    },
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
          { text: '物理', link: '/物理' }
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
