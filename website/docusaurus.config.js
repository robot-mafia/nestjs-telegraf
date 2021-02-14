module.exports = {
  title: 'NestJS Telegraf',
  tagline: 'Powerful Nest module for easy and fast creation Telegram bots',
  url: 'https://nestjs-telegraf.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'bukhalo', // Usually your GitHub org/user name.
  projectName: 'nestjs-telegraf', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'NestJS Telegraf',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/bukhalo/nestjs-telegraf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/bukhalo/nestjs-telegraf/discussions',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/nestjs_telegraf',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/bukhalo/nestjs-telegraf/issues',
            },
            {
              label: 'Examples',
              to: 'https://github.com/bukhalo/nestjs-telegraf/tree/master/sample/',
            }
          ],
        },
      ],
      copyright: `Copyright © 2019 - ${new Date().getFullYear()}, <a target="_blank" href="https://bukhalo.com">Alexander Bukhalo</a> & <a target="_blank" href="mailto:arthur.asimov.z0@gmail.com">Arthur Asimov</a>.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/bukhalo/nestjs-telegraf/edit/master/website/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/bukhalo/nestjs-telegraf/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
