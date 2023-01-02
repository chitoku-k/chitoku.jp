import type { GatsbyBrowser } from 'gatsby'
import Prism from 'prismjs'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Search from 'components/Search'

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  Prism.manual = true
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => (
  <Layout {...props}>
    <Header />
    <Navbar />
    {element}
    <Footer />
  </Layout>
)

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <IntlProvider locale="ja" messages={messages}>
    <Search>
      {element}
    </Search>
  </IntlProvider>
)
