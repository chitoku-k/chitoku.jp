import type { GatsbySSR } from 'gatsby'

export { wrapPageElement, wrapRootElement } from './gatsby-shared'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    lang: 'ja',
  })
}
