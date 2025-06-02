'use strict'

import { action } from 'storybook/actions'
import '../src/styles/styles.scss'

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
      options: {
        page: {
          name: 'Page',
          value: 'var(--body-background)',
        },
        container: {
          name: 'Container',
          value: 'var(--containers-background)',
        },
      },
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
