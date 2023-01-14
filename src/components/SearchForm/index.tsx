import type { FormEvent, FunctionComponent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Container, Nav, Popover, Row } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { navigate } from 'gatsby'
import { useIntl } from 'react-intl'

import { useSearch } from 'components/Search'

import messages from './messages'
import * as styles from './styles.module.scss'

const action = '/search'

const navigateToSearch = async (query: string | null, pathname: string): Promise<void> => {
  if (query) {
    const params = new URLSearchParams()
    params.append('q', query)

    return navigate(`${action}?${params.toString()}`, { replace: pathname === action })
  }

  if (pathname === action) {
    return navigate(action)
  }

  return Promise.resolve()
}

const SearchForm: FunctionComponent<SearchFormProps> = ({
  search,
  closeSearch,
}) => {
  const [ readOnly, setReadOnly ] = useState(true)
  const { formatMessage } = useIntl()
  const { query, setQuery } = useSearch()
  const { pathname } = useLocation()

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigateToSearch(query, pathname)
  }, [ query, pathname ])

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }, [ setQuery ])

  useEffect(() => {
    setReadOnly(false)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigateToSearch(query, pathname)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ query ])

  return (
    <>
      {search ? (
        <Container className={styles.mobileContainer}>
          <Container className={styles.mobile} role="search" as="form" action={action} onSubmit={onSubmit}>
            <Row className={styles.mobileRow} xs="auto">
              <input className={styles.mobileInput} type="search" autoFocus readOnly={readOnly} value={query ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
              <div className={styles.mobileCancelContainer} onClick={closeSearch}>
                {formatMessage(messages.cancel)}
              </div>
            </Row>
          </Container>
        </Container>
      ) : null}
      <Nav className={styles.desktop} role="search" as="form" action={action} onSubmit={onSubmit}>
        <input className={styles.desktopInput} type="search" readOnly={readOnly} value={query ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
        <noscript className={styles.unsupportedNotice}>
          <Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Popover>
        </noscript>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </Nav>
    </>
  )
}

interface SearchFormProps {
  search: boolean
  openSearch: () => void
  closeSearch: () => void
}

export default SearchForm
