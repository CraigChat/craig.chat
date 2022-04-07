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
    children: []
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
  '/primer/': mainSidebar
};
