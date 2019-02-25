import React from 'react'
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl'
import { WindowLocation } from '@reach/router'
import { Hit, StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults, Hits, PoweredBy } from 'react-instantsearch-dom'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'
import addVoicedMarks from 'jaco/lib/fn/addVoicedMarks'
import addSemivoicedMarks from 'jaco/lib/fn/addSemivoicedMarks'

import { ArticleContainer, ArticleHeader } from 'components/Layout'
import { ArticleCategoryItem, ArticleTagItem } from 'components/Article'
import Link from 'components/Link'
import messages from './messages'

export const getSearchText = (location: WindowLocation | Location): string | boolean => {
  const params = new URLSearchParams(location.search.slice(1))
  return params.get('s') || params.has('s')
}

const convertMatchedWords = (matchedWords: string[]): string[] => {
  return [
    ...new Set([
      ...matchedWords,
      ...matchedWords.map(x => [
        addVoicedMarks(x),
        addSemivoicedMarks(x),
      ]).flatMap(x => x),
    ]),
  ]
}

const NoHits = styled.div`
  line-height: 1.8;
`

const SearchHit = injectIntl<SearchHitProps<SearchDocument>>(function SearchHit({
  hit: {
    _highlightResult: highlight,
    title,
    path,
    excerpt,
    category,
  },
  intl: {
    formatMessage,
  },
}) {
  return (
    <div>
      <Link to={path}>
        <h2 className="no-border">
          {highlight.title && highlight.title.matchLevel !== 'none' ? (
            <Highlighter searchWords={convertMatchedWords(highlight.title.matchedWords)} textToHighlight={title} />
          ) : title}
        </h2>
        {category ? (
          <span className="path">{formatMessage(messages.breadcrumb_category, { category: category.name })}</span>
        ) : (
          <span className="path">{formatMessage(messages.breadcrumb_path, { path })}</span>
        )}
      </Link>
      <p>
        {highlight.excerpt && highlight.excerpt.matchLevel !== 'none' ? (
          <Highlighter searchWords={convertMatchedWords(highlight.excerpt.matchedWords)} textToHighlight={excerpt} />
        ) : excerpt}
      </p>
    </div>
  )
})

const SearchResult = injectIntl(connectStateResults<SearchResultProps, SearchDocument>(function SearchResult({
  searchState: {
    query: text,
  },
  searchResults,
  intl: {
    formatMessage,
  },
}) {
  return (
    <ArticleContainer className="search-result">
      <ArticleHeader title={
        <>
          {text ? formatMessage(messages.title_text, { text }) : formatMessage(messages.title)}
          <PoweredBy />
        </>
      } />
      {text ? (
        searchResults && searchResults.nbHits ? (
          <Hits hitComponent={SearchHit} />
        ) : (
          <NoHits>
            <FormattedMessage {...messages.not_found} values={{
              text: <strong>{text}</strong>,
            }} />
            <br />
            <FormattedMessage {...messages.not_found_hints} />
          </NoHits>
        )
      ) : (
        formatMessage(messages.how_to_search)
      )}
    </ArticleContainer>
  )
}))

interface SearchDocument {
  headings: string[]
  path: string
  title: string
  excerpt: string
  category: ArticleCategoryItem | null
  created: string | null
  tags: ArticleTagItem | null
}

interface SearchHitProps<T> {
  hit: Hit<T>
}

interface SearchResultProps extends InjectedIntlProps, StateResultsProvided<SearchDocument>  {
  text: string | boolean
}

export default SearchResult
