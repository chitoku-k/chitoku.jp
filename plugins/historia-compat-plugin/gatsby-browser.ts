import type { GatsbyBrowser } from 'gatsby'

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  require('@webcomponents/shadydom')
  require('core-js/modules/web.dom-collections.for-each')
  require('element-matches')
  require('whatwg-fetch')
}
