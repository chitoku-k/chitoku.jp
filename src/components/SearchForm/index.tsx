import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Navbar, Popover, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { connectSearchBox } from 'react-instantsearch-dom'

import { media } from 'components/Layout'
import messages from './messages'

const FormDesktop = styled(Navbar)`
  position: relative;
  padding: 0;
  ${media.sm.down()} {
    display: none;
  }
`

const FormDesktopInput = styled.input`
  width: 250px;
  padding: 6px 12px 6px 35px;
  min-height: 32px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 3px 5px 1px #d8d8d8 inset;
  ${media.md.down()} {
    width: 200px;
  }
  &:focus {
    outline: none;
  }
  &:focus + noscript {
    opacity: 1;
  }
`

const FormMobileContainer = styled(Container)`
  display: none;
  ${media.sm.down()} {
    display: block;
  }
`

const FormMobileCancelContainer = styled.div`
  display: table-cell;
  text-align: center;
  color: white;
  margin-right: 8px;
`

const FormMobile = styled(Container)`
  padding: 0;
`

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
  }, [ openSearch ])

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }, [])

  useEffect(() => {
    refine(text)
  }, [ text, refine ])

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
  openSearch: () => void
  closeSearch: () => void
}

export default SearchForm
