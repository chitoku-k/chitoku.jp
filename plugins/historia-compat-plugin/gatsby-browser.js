/* eslint-disable global-require */
// https://www.gatsbyjs.org/docs/browser-support/
// https://www.npmjs.com/package/babel-preset-gatsby
exports.onClientEntry = () => {
  require('core-js/fn/array/flat-map')
  require('core-js/fn/array/from')
  require('core-js/modules/es6.symbol')
  require('url-search-params-polyfill')
  require('whatwg-fetch')
}
