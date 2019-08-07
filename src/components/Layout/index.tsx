import React, { FunctionComponent } from 'react'
import { IntlProvider } from 'react-intl'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'

import '../../styles/styles.scss'
import styles from './styles'
import messages from 'translations/ja.yml'

export const media = styles

const Wrapper = styled.div`
  ${media.greaterThan('normal-pc')`
    position: relative;
    min-height: 100%;
  `}
`

const Layout: FunctionComponent = ({
  children,
}) => (
  <IntlProvider locale="ja" messages={messages}>
    <InstantSearch
      apiKey={process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY as string}
      appId={process.env.GATSBY_ALGOLIA_APPID as string}
      indexName={process.env.GATSBY_ALGOLIA_INDEXNAME as string}>
      <Wrapper>
        {children}
      </Wrapper>
    </InstantSearch>
  </IntlProvider>
)

export default Layout
