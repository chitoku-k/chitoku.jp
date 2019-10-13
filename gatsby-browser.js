'use strict'

const twemoji = require('twemoji').default

exports.onRouteUpdate = () => {
  twemoji.parse(document.getElementById('___gatsby'))
}
