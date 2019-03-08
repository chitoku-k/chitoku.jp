import React, { useState, useEffect, useRef } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { navigate, WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-dom'

import { getSearchText } from 'components/SearchResult'
import { media } from 'components/Layout'
import messages from './messages'

const FormDesktop = styled(Bootstrap.Navbar.Form)`
  position: relative;
  padding: 0;
  margin-right: 0;
  margin-top: 14px;
  ${media.lessThan('sp')`
    display: none;
  `}
`

const FormDesktopInput = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 250px;
  height: 34px;
  padding: 6px 12px 6px 35px;
  margin-right: 0;
  border: none;
  border-radius: 17px;
  box-shadow: 0 3px 5px 1px #d8d8d8 inset;
  ${media.lessThan('tablet')`
    width: 200px;
  `}
  &:focus {
    outline: none;
  }
  &:focus + noscript {
    opacity: 1;
  }
`

const FormMobileContainer = styled.div`
  height: 44px;
  padding: 8px 0;
  display: none;
  ${media.lessThan('sp')`
    display: block;
  `}
`

const FormMobileCancelContainer = styled.div`
  display: table-cell;
  text-align: center;
  color: white;
  padding-left: 12px;
`

const FormMobile = styled.form`
  display: table-cell;
  width: 100%;
`

const FormMobileInput = styled.input`
  border: none;
  border-radius: 4px;
  background: white;
  padding: 3px 8px;
  width: 100%;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled(FontAwesome)`
  color: #2f4255;
  position: absolute;
  left: 15px;
  top: 25%;
`

const UnsupportedNotice = styled.noscript`
  position: absolute;
  background: white;
  left: -15px;
  right: -15px;
  bottom: -8px;
  opacity: 0;
  transition: 0.3s opacity;
  z-index: 1;
  .popover {
    width: 100%;
    border: none;
    border-radius: 3px;
    > .arrow {
      border-bottom: none;
    }
  }
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
        <FormMobileContainer>
          <FormMobile role="search" onSubmit={onSubmit}>
            <FormMobileInput type="search" ref={input} value={text || ''} placeholder={formatMessage(messages.search)}
              onFocus={onFocus} onBlur={onBlur} onChange={e => setText(e.currentTarget.value)} />
          </FormMobile>
          <FormMobileCancelContainer onClick={closeSearch}>
            {formatMessage(messages.cancel)}
          </FormMobileCancelContainer>
        </FormMobileContainer>
      ) : null}
      <FormDesktop role="search" componentClass="form" pullRight onSubmit={onSubmit}>
        <FormDesktopInput type="search" value={text || ''} placeholder={formatMessage(messages.search)}
          onFocus={onFocus} onBlur={onBlur} onChange={e => setText(e.currentTarget.value)} />
        <UnsupportedNotice className="notice">
          <Bootstrap.Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Bootstrap.Popover>
        </UnsupportedNotice>
        <SearchIcon name="search" />
      </FormDesktop>
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
