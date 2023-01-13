import { isValidElement } from 'react'
import type { FunctionComponent, PropsWithChildren } from 'react'
import type { GatsbySSR } from 'gatsby'
import { BaseContext } from '@gatsbyjs/reach-router'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { SearchProvider } from 'components/Search'

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => isValidElement(children) ? children : null

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
      <BaseContext.Provider value={{ component: Wrapper, primary: false }}>
        {element}
      </BaseContext.Provider>
    </SearchProvider>
  </IntlProvider>
)
