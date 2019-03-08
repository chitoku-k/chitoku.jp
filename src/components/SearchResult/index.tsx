import React from 'react'
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl'
import { WindowLocation } from '@reach/router'
import { Hit, StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults, Hits, PoweredBy } from 'react-instantsearch-dom'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'
import addVoicedMarks from 'jaco/fn/addVoicedMarks'
import addSemivoicedMarks from 'jaco/fn/addSemivoicedMarks'

import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
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

const SearchResultContainer = styled(ArticleContainer)`
  .ais-Hits-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const SearchResultHeader = styled(ArticleHeader)`
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ais-PoweredBy {
      display: inline-flex;
      font-size: 10pt;
      font-weight: normal;
      align-items: center;
      .ais-PoweredBy-text {
        margin-right: 5px;
      }
    }
  }
`

const SearchHitContainer = styled.div`
  & + li {
    margin-top: 25px;
  }
  mark {
    padding: 0;
    background-color: inherit;
    color: inherit;
    font-weight: bold;
  }
  p {
    margin-top: 4px;
    font-size: 95%;
    line-height: 1.6;
  }
`

const SearchHitHeader = styled.h2`
  color: inherit;
  margin-bottom: 2px;
  font-weight: normal;
  font-size: 120%;
`

const SearchHitLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  &:hover h2 {
    text-decoration: underline;
  }
`

const SearchHitPath = styled.span`
  color: #4f7f4d;
`

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
    <SearchHitContainer>
      <SearchHitLink to={path}>
        <SearchHitHeader className="no-border">
          {highlight.title && highlight.title.matchLevel !== 'none' ? (
            <Highlighter searchWords={convertMatchedWords(highlight.title.matchedWords)} textToHighlight={title} />
          ) : title}
        </SearchHitHeader>
        {category ? (
          <SearchHitPath>{formatMessage(messages.breadcrumb_category, { category: category.name })}</SearchHitPath>
        ) : (
          <SearchHitPath>{formatMessage(messages.breadcrumb_path, { path })}</SearchHitPath>
        )}
      </SearchHitLink>
      <p>
        {highlight.excerpt && highlight.excerpt.matchLevel !== 'none' ? (
          <Highlighter searchWords={convertMatchedWords(highlight.excerpt.matchedWords)} textToHighlight={excerpt} />
        ) : excerpt}
      </p>
    </SearchHitContainer>
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
    <SearchResultContainer className="search-result">
      <SearchResultHeader title={
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
    </SearchResultContainer>
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
