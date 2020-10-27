import type { FunctionComponent } from 'react'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

const Search: FunctionComponent = ({
  children,
}) => (
  <InstantSearch
    indexName={process.env.GATSBY_ALGOLIA_INDEXNAME as string}
    searchClient={algoliasearch(
      process.env.GATSBY_ALGOLIA_APPID as string,
      process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY as string,
    )}>
    {children}
  </InstantSearch>
)

export default Search
