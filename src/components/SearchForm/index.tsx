import type { FormEvent, FunctionComponent } from 'react'
import { useCallback } from 'react'
import { Container, Nav, Popover, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { navigate } from 'gatsby'
import { useIntl } from 'react-intl'

import { useSearch } from 'components/Search'

import messages from './messages'
import * as styles from './styles.module.scss'

const action = '/search'

const SearchForm: FunctionComponent<SearchFormProps> = ({
  search,
  closeSearch,
}) => {
  const { formatMessage } = useIntl()
  const { query, setQuery } = useSearch()

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query) {
      return
    }

    const params = new URLSearchParams()
    params.append('q', query)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate(`${action}?${params.toString()}`)
  }, [ query ])

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }, [ setQuery ])

  return (
    <>
      {search ? (
        <Container className={styles.mobileContainer}>
          <Container className={styles.mobile} role="search" as="form" action={action} onSubmit={onSubmit}>
            <Row className={styles.mobileRow} xs="auto">
              <input className={styles.mobileInput} type="search" autoFocus value={query ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
              <div className={styles.mobileCancelContainer} onClick={closeSearch}>
                {formatMessage(messages.cancel)}
              </div>
            </Row>
          </Container>
        </Container>
      ) : null}
      <Nav className={styles.desktop} role="search" as="form" action={action} onSubmit={onSubmit}>
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
}

interface SearchFormProps {
  search: boolean
  openSearch: () => void
  closeSearch: () => void
}

export default SearchForm
