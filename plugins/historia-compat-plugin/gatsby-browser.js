'use strict'

/* eslint-disable global-require */
exports.onClientEntry = () => {
  require('whatwg-fetch')
}
