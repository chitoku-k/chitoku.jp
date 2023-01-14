import type { FunctionComponent, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParam } from 'react-use'
import { FormattedMessage, useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Highlight, InstantSearch, PoweredBy, Snippet, useHits, useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web'
import type { BaseHit } from 'instantsearch.js'
import algoliasearch from 'algoliasearch/lite'

import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import type { ArticleCategoryItem, ArticleTagItem } from 'components/Article'
import Metadata from 'components/Metadata'
import Link from 'components/Link'

import messages from './messages'
import * as styles from './styles.module.scss'

const appID = process.env.GATSBY_ALGOLIA_APPID ?? ''
const apiKey = process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY ?? ''
const searchClient = algoliasearch(appID, apiKey)

const SearchContext = createContext<SearchState>({
  query: null,
  setQuery: () => {
    throw new Error('setQuery is not provided')
  },
})

export const useSearch = (): SearchState => useContext(SearchContext)

const Hits: FunctionComponent<HitsProps> = ({
  query,
  url,
}) => {
  const { formatMessage } = useIntl()
  const { status } = useInstantSearch()
  const { refine } = useSearchBox()
  const { hits, results } = useHits<SearchDocument>()

  useEffect(() => {
    refine(query)
  }, [ refine, query ])

  if (status === 'stalled') {
    return <FontAwesomeIcon className={styles.status} icon={faCircleNotch} spin />
  }

  if (!results?.query) {
    return null
  }

  if (!results.nbHits) {
    return (
      <div className={styles.noHits}>
        <FormattedMessage {...messages.not_found} values={{
          text: <strong>{results.query}</strong>,
        }} />
        <br />
        <FormattedMessage {...messages.not_found_hints} />
      </div>
    )
  }

  return (
    <>
      {hits.map(hit => (
        <div key={hit.objectID} className={styles.hitContainer}>
          <Link className={styles.hitLink} to={hit.path}>
            <h2 className={styles.hitHeader}>
              <Highlight attribute="title" hit={hit} />
            </h2>
            <span className={styles.hitPath}>
              {hit.category
                ? formatMessage(messages.breadcrumb_category, { url, category: hit.category.name })
                : formatMessage(messages.breadcrumb_path, { url, path: hit.path })}
            </span>
          </Link>
          <p>
            <Snippet attribute="excerpt" hit={hit} />
          </p>
        </div>
      ))}
    </>
  )
}

const Search: FunctionComponent<SearchProps> = ({
  site,
}) => {
  const { formatMessage } = useIntl()
  const { query } = useSearch()

  if (!site) {
    throw new Error('Invalid data')
  }

  const indexName = process.env.GATSBY_ALGOLIA_INDEXNAME
  if (!indexName) {
    throw new Error('Invalid env')
  }

  const {
    siteMetadata: {
      siteUrl: url,
    },
  } = site

  const title = query
    ? formatMessage(messages.title_text, { text: query })
    : formatMessage(messages.title)

  return (
    <Metadata title={title}>
      <ArticleContainer>
        <ArticleHeader className={styles.resultHeader} title={
          <>
            {title}
            <PoweredBy classNames={{ logo: styles.logo }} />
          </>
        } />
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          {query
            ? <Hits query={query} url={url} />
            : formatMessage(messages.how_to_search)}
        </InstantSearch>
      </ArticleContainer>
    </Metadata>
  )
}

export const SearchProvider: FunctionComponent<SearchProviderProps> = ({
  children,
}) => {
  const [ query, setQuery ] = useState<string | null>(useSearchParam('q'))
  const state = useMemo(() => ({ query, setQuery }), [ query ])

  return (
    <SearchContext.Provider value={state}>
      {children}
    </SearchContext.Provider>
  )
}

interface SearchState {
  query: string | null
  setQuery: (query: string | null) => void
}

interface SearchDocument extends BaseHit {
  headings: string[]
  path: string
  title: string
  excerpt: string
  category: ArticleCategoryItem | null
  created: string | null
  tags: ArticleTagItem | null
}

interface SearchProviderProps {
  children?: ReactNode
}

type SearchProps = Queries.SearchItemQuery

interface HitsProps {
  query: string
  url: string
}

export default Search
