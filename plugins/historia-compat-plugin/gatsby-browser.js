'use strict'

/* eslint-disable global-require */
exports.onClientEntry = () => {
  require('core-js/modules/web.dom-collections.for-each')
  require('whatwg-fetch')
}
