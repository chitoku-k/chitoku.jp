'use strict'

const { action } = require('@storybook/addon-actions')
require('../src/styles/styles.scss')

// Overrides Link behavior.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
global.__BASE_PATH__ = '/'
global.___navigate = pathname => action('Navigate')(pathname)

const preview = {
  parameters: {
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
  },
}

export default preview
