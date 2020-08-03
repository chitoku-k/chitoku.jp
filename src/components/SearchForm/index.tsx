import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Navbar, Popover, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
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
  background-color: var(--search-background);
  color: var(--search-color);
  box-shadow: 0 3px 5px 1px var(--search-shadow) inset;
  ${media.md.down()} {
    width: 200px;
  }
  &::placeholder {
    color: var(--search-placeholder);
  }
  &:focus {
    outline: none;
  }
  &:focus ~ noscript {
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
  color: var(--nav-color);
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
  background-color: var(--search-background);
  color: var(--search-color);
  margin: 0 8px;
  padding: 3px 8px;
  flex-grow: 1;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled(FontAwesomeIcon)`
  color: var(--search-icon);
  position: absolute;
  left: 14px;
  top: calc(50% - 0.5em);
`

const UnsupportedNotice = styled.noscript`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  opacity: 0;
  transition: 0.3s opacity;
  z-index: 1;
  .popover {
    width: 100%;
    margin: 0;
    padding: 8px 12px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    > .arrow {
      border-bottom: none;
    }
  }
`

const SearchForm = connectSearchBox<SearchFormProps>(function SearchForm({
  search,
  closeSearch,
  refine,
}) {
  const { formatMessage } = useIntl()

  const [ text, setText ] = useState(null as string | null)
  const input = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement | React.Component>) => {
    e.preventDefault()
  }, [])

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }, [])

  useEffect(() => {
    refine(text)
  }, [ text, refine ])

  useEffect(() => {
    if (search && input.current) {
      input.current.focus()
    }
  }, [ input, search ])

  return (
    <>
      {search ? (
        <FormMobileContainer>
          <FormMobile role="search" forwardedAs="form" onSubmit={onSubmit}>
            <FormMobileRow>
              <FormMobileInput type="search" ref={input} value={text ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
              <FormMobileCancelContainer onClick={closeSearch}>
                {formatMessage(messages.cancel)}
              </FormMobileCancelContainer>
            </FormMobileRow>
          </FormMobile>
        </FormMobileContainer>
      ) : null}
      <FormDesktop role="search" forwardedAs="form" onSubmit={onSubmit}>
        <FormDesktopInput type="search" value={text ?? ''} placeholder={formatMessage(messages.search)} onChange={onChange} />
        <UnsupportedNotice>
          <Popover id="search-form-noscript" placement="bottom">
            {formatMessage(messages.enable_javascript)}
          </Popover>
        </UnsupportedNotice>
        <SearchIcon icon={faSearch} />
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
