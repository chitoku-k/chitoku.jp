import type { FunctionComponent } from 'react'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import type { Hit, StateResultsProvided } from 'react-instantsearch-core'
import { Hits, PoweredBy, connectStateResults } from 'react-instantsearch-dom'
import Highlighter from 'react-highlight-words'

import messages from './messages'
import styles from './styles.module.scss'

import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import type { ArticleCategoryItem, ArticleTagItem } from 'components/Article'
import Link from 'components/Link'

const SearchHit: FunctionComponent<SearchHitProps<SearchDocument>> = ({
  hit: {
    _highlightResult: highlight,
    title,
    path,
    excerpt,
    category,
  },
}) => {
  const { formatMessage } = useIntl()

  return (
    <div className={styles.hitContainer}>
      <Link className={styles.hitLink} to={path}>
        <h2 className={styles.hitHeader}>
          {highlight.title && highlight.title.matchLevel !== 'none' ? (
            <Highlighter searchWords={highlight.title.matchedWords} textToHighlight={title} />
          ) : title}
        </h2>
        <span className={styles.hitPath}>
          {category
            ? formatMessage(messages.breadcrumb_category, { category: category.name })
            : formatMessage(messages.breadcrumb_path, { path })}
        </span>
      </Link>
      <p>
        {highlight.excerpt && highlight.excerpt.matchLevel !== 'none' ? (
          <Highlighter searchWords={highlight.excerpt.matchedWords} textToHighlight={excerpt} />
        ) : excerpt}
      </p>
    </div>
  )
}

const SearchResult = connectStateResults<SearchResultProps>(function SearchResult({
  searchState: {
    query: text,
  },
  searchResults,
}) {
  const { formatMessage } = useIntl()

  return (
    <ArticleContainer className={styles.resultContainer}>
      <ArticleHeader className={styles.resultHeader} title={
        <>
          {text ? formatMessage(messages.title_text, { text }) : formatMessage(messages.title)}
          <PoweredBy />
        </>
      } />
      {text
        ? searchResults.nbHits
          ? (
            <Hits hitComponent={SearchHit} />
          ) : (
            <div className={styles.noHits}>
              <FormattedMessage {...messages.not_found} values={{
                text: <strong>{text}</strong>,
              }} />
              <br />
              <FormattedMessage {...messages.not_found_hints} />
            </div>
          )
        : formatMessage(messages.how_to_search)}
    </ArticleContainer>
  )
})

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

type SearchResultProps = StateResultsProvided<SearchDocument>

export default SearchResult
