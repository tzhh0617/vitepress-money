import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-money/',
  title: "Money",
  description: "Money Calculator",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'DevTools',
        items: [
          { text: '粘贴 HTML', link: '/paste-html' },
        ]
      },
      {
        text: 'Others',
        items: [
          { text: '流水计算器', link: '/money' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    plugins: [
      UnoCSS(),
    ],
  }
})
