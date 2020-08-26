import { GatsbyBrowser } from 'gatsby'
import Prism from 'prismjs'

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  Prism.manual = true
}
