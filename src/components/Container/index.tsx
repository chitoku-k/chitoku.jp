import React from 'react'
import { Col } from 'react-bootstrap'
import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'

import SearchResult from 'components/SearchResult'

const MainContentContainer = styled(Col)`
  position: static;
  padding: 0;
  flex: auto;
`

const Container = connectStateResults(function Container({
  searchState,
  children,
}) {
  return (
    <MainContentContainer>
      {searchState.query ? <SearchResult /> : children}
    </MainContentContainer>
  )
})

export default Container
