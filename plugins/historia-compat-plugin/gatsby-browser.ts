import type { GatsbyBrowser } from 'gatsby'

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  // In order for @webcomponents/shadydom to take effect in IE, event-target-polyfill has to be removed beforehand.
  // See: https://github.com/webcomponents/polyfills/blob/%40webcomponents/shadydom%401.9.0/packages/shadydom/src/patch-native.js#L127
  if (window.EventTarget.prototype.constructor.name !== 'EventTarget') {
    (window.EventTarget as unknown) = undefined
  }

  require('@webcomponents/shadydom')
  require('core-js/modules/web.dom-collections.for-each')
  require('element-matches')
  require('whatwg-fetch')
}
