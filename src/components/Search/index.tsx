import type { FunctionComponent, ReactNode } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

const Search: FunctionComponent<SearchProps> = ({
  children,
}) => {
  const indexName = process.env.GATSBY_ALGOLIA_INDEXNAME
  const appID = process.env.GATSBY_ALGOLIA_APPID
  const apiKey = process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY

  if (!indexName || !appID || !apiKey) {
    throw new Error('Invalid env')
  }

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={algoliasearch(appID, apiKey)}>
      {children}
    </InstantSearch>
  )
}

interface SearchProps {
  children?: ReactNode
}

export default Search
