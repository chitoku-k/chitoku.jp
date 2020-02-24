import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Navbar, Popover, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { useIntl } from 'react-intl'
import { WindowLocation, navigate } from '@reach/router'
import styled from 'styled-components'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-dom'

import { getSearchText } from 'components/SearchResult'
import { media } from 'components/Layout'
import messages from './messages'

const FormDesktop = styled(Navbar)`
  position: relative;
  ${media.lessThan('sp')`
    display: none;
  `}
`

const FormDesktopInput = styled.input`
  width: 250px;
  padding: 6px 12px 6px 35px;
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

const FormMobileContainer = styled(Container)`
  display: none;
  ${media.lessThan('sp')`
    display: block;
  `}
`

const FormMobileCancelContainer = styled.div`
  display: table-cell;
  text-align: center;
  color: white;
  margin-right: 8px;
`

const FormMobile = styled(Container)``

const FormMobileRow = styled(Row)`
  align-items: center;
`

const FormMobileInput = styled.input`
  border: none;
  border-radius: 4px;
  background: white;
  margin: 0 8px;
  padding: 3px 8px;
  flex-grow: 1;
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

const SearchForm = connectSearchBox<SearchFormProps>(function SearchForm({
  search,
  location,
  openSearch,
  closeSearch,
  refine,
}) {
  const { formatMessage } = useIntl()

  const [ text, setText ] = useState(null as string | null)
  const input = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement | React.Component>) => {
    e.preventDefault()
  }, [])

  const onFocus = useCallback(() => {
    openSearch()
    if (getSearchText(location) === false) {
      setText('')
    }
  }, [ location, openSearch ])

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }, [])

  /* eslint-disable @typescript-eslint/no-floating-promises */
  useEffect(() => {
    if (text !== null) {
      refine(text)
      navigate(`${location.pathname}?s=${text}`, { replace: true })
    } else {
      navigate(location.pathname, { replace: true })
    }
  }, [ text, location.pathname, refine ])
  /* eslint-enable @typescript-eslint/no-floating-promises */

  useEffect(() => {
    if (search) {
      if (input.current) {
        input.current.focus()
      }
    } else {
      setText(null)
    }
  }, [ input, search ])

  return (
    <>
      {search ? (
        <FormMobileContainer>
          <FormMobile role="search" as="form" onSubmit={onSubmit}>
            <FormMobileRow>
              <FormMobileInput type="search" ref={input} value={text ?? ''} placeholder={formatMessage(messages.search)}
                onFocus={onFocus} onChange={onChange} />
              <FormMobileCancelContainer onClick={closeSearch}>
                {formatMessage(messages.cancel)}
              </FormMobileCancelContainer>
            </FormMobileRow>
          </FormMobile>
        </FormMobileContainer>
      ) : null}
      <FormDesktop role="search" as="form" onSubmit={onSubmit}>
        <FormDesktopInput type="search" value={text ?? ''} placeholder={formatMessage(messages.search)}
          onFocus={onFocus} onChange={onChange} />
        <UnsupportedNotice className="notice">
          <Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Popover>
        </UnsupportedNotice>
        <SearchIcon name="search" />
      </FormDesktop>
    </>
  )
})

interface SearchFormProps extends SearchBoxProvided {
  search: boolean
  location: WindowLocation
  openSearch: () => void
  closeSearch: () => void
}

export default SearchForm
