import type { GatsbySSR } from 'gatsby'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Search from 'components/Search'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    lang: 'ja',
  })
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => (
  <Layout {...props}>
    <Header />
    <Navbar />
    {element}
    <Footer />
  </Layout>
)

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <IntlProvider locale="ja" messages={messages}>
    <Search>
      {element}
    </Search>
  </IntlProvider>
)
