import React from 'react'
import { Col } from 'react-bootstrap'
import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'

import { media } from 'components/Layout'
import SearchResult from 'components/SearchResult'

const MainContentContainer = styled(Col)`
  position: static;
  padding: 0;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  .sidebar & {
    flex: 0 0 70%;
    max-width: 70%;
    width: 70%;
    ${media.lessThan('tablet')`
      flex: 0 0 100%;
      max-width: 100%;
      width: 100%;
    `}
  }
`

const Container = connectStateResults(function Container({
  searchState,
  children,
}) {
  return (
    <MainContentContainer md={9}>
      {searchState.query ? <SearchResult /> : children}
    </MainContentContainer>
  )
})

export default Container
