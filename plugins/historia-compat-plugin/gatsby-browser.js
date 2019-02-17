// https://www.gatsbyjs.org/docs/browser-support/
// https://www.npmjs.com/package/babel-preset-gatsby
exports.onClientEntry = () => {
  require('core-js/fn/array/flat-map')
  require('url-search-params-polyfill')
  require('whatwg-fetch')
}
