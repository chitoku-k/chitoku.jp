import type { GatsbySSR } from 'gatsby'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { SearchProvider } from 'components/Search'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    lang: 'ja',
  })
}

export const wrapPageElement: GatsbySSR<unknown, Context>['wrapPageElement'] = ({
  element,
  props: {
    pageContext: {
      sidebar,
    },
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Container sidebar={sidebar !== false}>
      {element}
    </Container>
    <Footer />
  </Layout>
)

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <IntlProvider locale="ja" messages={messages}>
    <SearchProvider>
      {element}
    </SearchProvider>
  </IntlProvider>
)
