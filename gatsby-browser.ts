import { GatsbyBrowser } from 'gatsby'
import Prism from 'prismjs'
import twemoji from 'twemoji'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
  const el = document.getElementById('___gatsby')
  if (el) {
    twemoji.parse(el)
  }
}

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  Prism.manual = true
}

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  // Hotfix: https://github.com/weirdpattern/gatsby-remark-embed-gist/pull/34
  const el = document.createElement('link')
  el.rel = 'stylesheet'
  el.href = 'https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css'
  document.getElementsByTagName('head')[0].appendChild(el)
}
