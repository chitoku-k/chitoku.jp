import React, { ReactNode, DetailedHTMLProps, HTMLAttributes, FunctionComponent } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { IntlProvider, addLocaleData } from 'react-intl'
import { InstantSearch } from 'react-instantsearch-dom'
import { Location } from '@reach/router'
import ja from 'react-intl/locale-data/ja'

import '../../styles/styles.scss'
import SearchResult, { getSearchText } from 'components/SearchResult'
import messages from 'translations/ja.yml'

addLocaleData([...ja])

export const Container: FunctionComponent = ({
  children,
}) => (
  <Bootstrap.Col id="main-content-container" md={9}>
    <Location>
      {({ location }) => {
        const search = getSearchText(location)
        return search ? (
          <SearchResult text={search} />
        ) : (
          children
        )
      }}
    </Location>
  </Bootstrap.Col>
)

export const ArticleContainer: FunctionComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  children,
  className,
}) => (
  <article className={['main-content', className].filter(x => x).join(' ')}>
    {children}
  </article>
)

export const ArticleHeader: FunctionComponent<ArticleHeaderProps> = ({
  children,
  title,
}) => (
  <div className="main-content-header">
    <h1>{title}</h1>
    {children}
  </div>
)

const Layout: FunctionComponent = ({
  children,
}) => (
  <IntlProvider locale="ja" messages={messages}>
    <InstantSearch
      apiKey={process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY as string}
      appId={process.env.GATSBY_ALGOLIA_APPID as string}
      indexName={process.env.GATSBY_ALGOLIA_INDEXNAME as string}>
      {children}
    </InstantSearch>
  </IntlProvider>
)

interface ArticleHeaderProps {
  title: ReactNode
}

export default Layout
