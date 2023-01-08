import type { FunctionComponent, ReactNode } from 'react'
import { useMemo } from 'react'
import { createContext, useState } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'

export const SearchContext = createContext<SearchState>({
  query: null,
  setQuery: () => {
    throw new Error('setQuery is not provided')
  },
})

const Search: FunctionComponent<SearchProps> = ({
  children,
}) => {
  const [ query, setQuery ] = useState<string | null>(null)
  const state = useMemo(() => ({ query, setQuery }), [ query ])

  const indexName = process.env.GATSBY_ALGOLIA_INDEXNAME
  if (!indexName) {
    throw new Error('Invalid env')
  }

  const appID = process.env.GATSBY_ALGOLIA_APPID ?? ''
  const apiKey = process.env.GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY ?? ''

  return (
    <SearchContext.Provider value={state}>
      <InstantSearch
        indexName={indexName}
        searchClient={algoliasearch(appID, apiKey)}>
        {children}
      </InstantSearch>
    </SearchContext.Provider>
  )
}

interface SearchState {
  query: string | null
  setQuery: (query: string | null) => void
}

interface SearchProps {
  children?: ReactNode
}

export default Search
