const sidebar = require('./sidebar.js');

const meta = {
  title: 'Craig',
  description: 'The multi-track recording bot for Discord.',
  theme: '#00AAAA',
  url: 'https://craig.chat/',
  icon: '/icon-512x512.png'
}

const config = {
  title: meta.title,
  description: meta.description,
  main: 'layouts/Layout.vue',
  head: [
    // Plausible
    ['script', { defer: true, 'data-domain': 'craig.chat', src: 'https://m.techbs.io/js/script.js' }],

    // Manifest
    ['link', { rel: 'icon', href: meta.icon }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],

    // Icons
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: meta.theme }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '192x192', href: '/icon-192x192.png' }],
    ['link', { rel: 'icon', sizes: '512x512', href: '/icon-512x512.png' }],

    // Theme Color
    ['meta', { name: 'theme-color', content: meta.theme }],
    ['meta', { name: 'msapplication-TileColor', content: meta.theme }],

    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:url', content: meta.url }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }],
    ['meta', { name: 'twitter:image', content: meta.icon }],

    // OpenGraph
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:url', content: meta.url }],
    ['meta', { name: 'og:title', content: meta.title }],
    ['meta', { name: 'og:description', content: meta.description }],
    ['meta', { name: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'og:image', content: meta.icon }],
    ['meta', {
      name: 'og:keywords',
      content: [
        'Discord',
        'd i s c o r d',
        'discord bots',
        'discord bot',
        'bots discord',
        'multi-track',
        'craig bot',
        'discord recording',
        'discord recording bot',
        'discord recorder'
      ].join(',')
    }],
  ],
  plugins: [
    [
      'zooming',
      {
        selector: '.md-img',
        options: {
          bgColor: 'black',
          bgOpacity: 0.5,
          scaleBase: 0.8
        }
      }
    ],
    '@vuepress/pwa',
    '@vuepress/last-updated',
    'img-lazy',
    [
      '@adamdehaven/vuepress-plugin-custom-tooltip',
      {
        name: 'VueCustomTooltip',
        color: '#fff',
        background: '#000',
        borderRadius: 2,
        fontWeight: 400,
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://craig.chat'
      }
    ],
    [
      require('./plugins/redirect.js'),
      [
        { url: 'https://discord.com/oauth2/authorize?client_id=272937604339466240&permissions=68176896&scope=bot%20applications.commands',
          aliases: ['/invite/'] },
        { url: 'https://discord.com/oauth2/authorize?client_id=486698344429781028&permissions=68176896&scope=bot%20applications.commands',
          aliases: ['/invitegiarc/', '/giarcinvite/'] },
        { url: 'https://discord.gg/PEc4QBE45f',
          aliases: ['/support/', '/server/'] },
        { url: 'https://patreon.com/CraigRec',
          aliases: ['/patreon/'] },
        { url: 'https://github.com/CraigChat',
          aliases: ['/github/'] },
        { url: 'https://my.craig.chat/',
          aliases: ['/dashboard/'] }
      ]
    ],
    'jsonld',
    require('./plugins/discordcomponents.js')
  ],
  themeConfig: {
    search: false,
    nav: [
      { text: 'Documentation', link: '/docs/' },
      { text: 'Commands', link: '/commands/' },
      { text: 'Support Server', link: '/support/' },
      { text: 'Patreon', link: '/patreon/' },
      { text: 'Add to Discord', link: '/invite/', class: 'primary' },
    ],
    sidebar,
    nextLinks: true,
    prevlinks: true,
    editLinks: false,
    // change to a definitive transparent icon url
    logo: '/icon-512x512.png',
    smoothScroll: true,
    footer: {
      columns: [
        {
          title: 'Invites',
          rows: [{
            text: 'Craig Bot Invite',
            link: '/invite/'
          },
          {
            text: 'Giarc Bot Invite',
            link: '/invitegiarc/'
          },
          {
            text: 'Support Server',
            link: '/server/'
          }]
        },
        {
          title: 'Information',
          rows: [
            {
              text: 'Commands',
              link: '/commands/'
            },
            {
              text: 'Privacy Policy',
              link: '/privacy/'
            },
            // {
            //   text: 'Terms of Service',
            //   link: '/terms/'
            // }
          ]
        },
        {
          title: 'Botlists',
          rows: [{
            text: 'bots.gg',
            link: 'https://discord.bots.gg/bots/272937604339466240'
          },{
            text: 'top.gg',
            link: 'https://top.gg/bot/272937604339466240'
          },{
            text: 'discordlist.gg',
            link: 'https://discordlist.gg/bot/272937604339466240'
          }]
        },
        {
          title: 'More',
          rows: [
            {
              text: 'Patreon',
              link: '/patreon/'
            }
          ]
        }
      ],
      finePrint: 'Copyright © {year} TechBS LLC.'
    }
  }
}

for (const group of Object.values(config.themeConfig.sidebar)) {
	for (const section of group) {
		if (section.collapsable) continue;
		section.collapsable = false;
	}
}
module.exports = config;
