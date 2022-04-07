const mainSidebar = [
  {
    title: 'Getting Started',
    children: [
      '/docs/',
      '/commands/',
      '/docs/webapp/',
      '/primer/'
    ],
  },
  {
    title: 'Frequently Asked Questions',
    children: [
      ['/faq/', 'General'],
      ['/faq/autorecord/', 'Auto-record'],
      ['/faq/drive/', 'Google Drive']
    ]
  },
  {
    title: 'Additional Information',
    children: [
      '/privacy/',
      '/terms/',
    ]
  }
]

module.exports = {
  '/docs/': mainSidebar,
  '/commands/': mainSidebar,
  '/primer/': mainSidebar,
  '/faq/': mainSidebar
};
