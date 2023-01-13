import { isValidElement } from 'react'
import type { FunctionComponent, PropsWithChildren } from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { BaseContext } from '@gatsbyjs/reach-router'

import Prism from 'prismjs'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { SearchProvider } from 'components/Search'

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => isValidElement(children) ? children : null

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  Prism.manual = true
}

export const wrapPageElement: GatsbyBrowser<unknown, Context>['wrapPageElement'] = ({
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

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <IntlProvider locale="ja" messages={messages}>
    <SearchProvider>
      <BaseContext.Provider value={{ component: Wrapper, primary: false }}>
        {element}
      </BaseContext.Provider>
    </SearchProvider>
  </IntlProvider>
)
