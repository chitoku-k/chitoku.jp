import { isValidElement } from 'react'
import type { FunctionComponent, JSX, PropsWithChildren } from 'react'
import type { GatsbyBrowser, GatsbySSR } from 'gatsby'

import type { RouterContextProps } from '@gatsbyjs/reach-router'
import { BaseContext } from '@gatsbyjs/reach-router'
import { IntlProvider } from 'react-intl'

import messages from 'translations/ja.yml'

import Layout from 'components/Layout'
import Container from 'components/Container'
import { SearchProvider } from 'components/Search'

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => isValidElement(children) ? children : null

const base: RouterContextProps = {
  basepath: '/',
  component: Wrapper,
  primary: false,
}

export const wrapPageElement: GatsbyBrowser<unknown, Context>['wrapPageElement'] & GatsbySSR<unknown, Context>['wrapPageElement'] = ({
  element,
  props: {
    pageContext: {
      sidebar,
    },
  },
}): JSX.Element => (
  <Layout>
    <Container sidebar={sidebar !== false}>
      {element}
    </Container>
  </Layout>
)

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] & GatsbySSR['wrapRootElement'] = ({
  element,
}): JSX.Element => (
  <IntlProvider locale="ja" messages={messages}>
    <SearchProvider>
      <BaseContext.Provider value={base}>
        {element}
      </BaseContext.Provider>
    </SearchProvider>
  </IntlProvider>
)
