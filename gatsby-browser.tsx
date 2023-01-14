import type { GatsbyBrowser } from 'gatsby'

import Prism from 'prismjs'

export { wrapPageElement, wrapRootElement } from './gatsby-shared'

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  Prism.manual = true
}
