'use strict'

module.exports.parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'page',
    values: [
      {
        name: 'page',
        value: 'var(--body-background)',
      },
      {
        name: 'container',
        value: 'var(--containers-background)',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(?:background|color)$/iu,
      date: /Date$/u,
    },
  },
}
