import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NestJS Telegraf",
  description: "NestJS Telegraf documentation",
  srcDir: './docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
      { text: 'API (typedoc)', link: 'https://nestjs-telegraf-api.pages.dev/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/' },
          { text: 'Getting updates', link: '/getting-updates' },
          { text: 'Telegraf methods', link: '/telegraf-methods' },
          { text: 'Async configuration', link: '/async-configuration' }
        ]
      },
      {
        text: 'Extras',
        items: [
          { text: 'Bot injection', link: '/extras/bot-injection' },
          { text: 'Middlewares', link: '/extras/middlewares' },
          { text: 'Multiple Bots', link: '/extras/multiple-bots' },
          { text: 'Standalone applications', link: '/extras/standalone-applications' }
        ]
      },
      {
        text: 'Migrating',
        items: [
          { text: 'From v1 to v2', link: '/migrating/from-v1-to-v2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/0x467/nestjs-telegraf' }
    ]
  }
})
