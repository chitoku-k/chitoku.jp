'use strict'

module.exports.parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(?:background|color)$/iu,
      date: /Date$/u,
    },
  },
}
