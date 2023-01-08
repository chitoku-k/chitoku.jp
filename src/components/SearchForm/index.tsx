import { useCallback, useContext, useEffect, useRef } from 'react'
import { Container, Nav, Popover, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'
import type { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-dom'

import { SearchContext } from 'components/Search'

import messages from './messages'
import * as styles from './styles.module.scss'

const SearchForm = connectSearchBox<SearchFormProps>(function SearchForm({
  search,
  closeSearch,
  refine,
}) {
  const { formatMessage } = useIntl()

  const { query, setQuery } = useContext(SearchContext)
  const input = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refine(query)
  }, [ query, refine ])

  useEffect(() => {
    if (search && input.current) {
      input.current.focus()
    }
  }, [ input, search ])

  return (
    <>
      {search ? (
        <Container className={styles.mobileContainer}>
          <Container className={styles.mobile} role="search" as="form" onSubmit={onSubmit}>
            <Row className={styles.mobileRow} xs="auto">
              <input className={styles.mobileInput} type="search" ref={input} value={query ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
              <div className={styles.mobileCancelContainer} onClick={closeSearch}>
                {formatMessage(messages.cancel)}
              </div>
            </Row>
          </Container>
        </Container>
      ) : null}
      <Nav className={styles.desktop} role="search" as="form" onSubmit={onSubmit}>
        <input className={styles.desktopInput} type="search" value={query ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
        <noscript className={styles.unsupportedNotice}>
          <Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Popover>
        </noscript>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </Nav>
    </>
  )
})

interface SearchFormProps extends SearchBoxProvided {
  search: boolean
  openSearch: () => void
  closeSearch: () => void
}

export default SearchForm
