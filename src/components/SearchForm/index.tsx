import React, { useState, useEffect, useRef } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { navigate, WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-dom'

import { getSearchText } from 'components/SearchResult'
import messages from './messages'

const InputForm = styled.form`
  display: table-cell;
  width: 100%;
`

const CancelContainer = styled.div`
  display: table-cell;
`

const SearchForm = injectIntl(connectSearchBox<SearchFormProps>(function SearchForm({
  search,
  location,
  openSearch,
  closeSearch,
  refine,
  intl: {
    formatMessage,
  },
}) {
  const [ text, setText ] = useState(null as string | null)
  const input = useRef<HTMLInputElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement | React.Component>): void => {
    e.preventDefault()
  }

  const onFocus = (): void => {
    openSearch()
    if (getSearchText(location) === false) {
      setText('')
    }
  }

  const onBlur = (): void => {
  }

  useEffect(() => {
    if (text !== null) {
      refine(text)
      navigate(location.pathname + '?s=' + text, { replace: true })
    } else {
      navigate(location.pathname, { replace: true })
    }
  }, [ text ])

  useEffect(() => {
    if (search) {
      input.current && input.current.focus()
    } else {
      setText(null)
    }
  }, [ search ])

  return (
    <>
      {search ? (
        <div id="nav-search-form">
          <InputForm role="search" onSubmit={onSubmit}>
            <input type="search" ref={input} value={text || ''} placeholder={formatMessage(messages.search)}
              onFocus={onFocus} onBlur={onBlur} onChange={e => setText(e.currentTarget.value)} />
          </InputForm>
          <CancelContainer onClick={closeSearch}>
            <span id="search-cancel-link">{formatMessage(messages.cancel)}</span>
          </CancelContainer>
        </div>
      ) : null}
      <Bootstrap.Navbar.Form id="search-form" role="search" componentClass="form" pullRight onSubmit={onSubmit}>
        <input type="search" className="form-control" value={text || ''} placeholder={formatMessage(messages.search)}
          onFocus={onFocus} onBlur={onBlur} onChange={e => setText(e.currentTarget.value)} />
        <noscript className="notice">
          <Bootstrap.Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Bootstrap.Popover>
        </noscript>
        <FontAwesome name="search" />
      </Bootstrap.Navbar.Form>
    </>
  )
}))

interface SearchFormProps extends InjectedIntlProps, SearchBoxProvided {
  search: boolean
  location: WindowLocation
  openSearch: () => any
  closeSearch: () => any
}

export default SearchForm
