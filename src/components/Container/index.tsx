import React, { FunctionComponent } from 'react'
import { Location } from '@reach/router'
import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import { media } from 'components/Layout'
import SearchResult, { getSearchText } from 'components/SearchResult'

const MainContentContainer = styled(Col)`
  position: static;
  padding: 0;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  .sidebar & {
    flex: 0 0 70%;
    width: 70%;
    ${media.lessThan('tablet')`
      flex: 0 0 100%;
      width: auto;
    `}
  }
`

const Container: FunctionComponent = ({
  children,
}) => (
  <MainContentContainer md={9}>
    <Location>
      {({ location }) => {
        const search = getSearchText(location)
        return search ? <SearchResult text={search} /> : children
      }}
    </Location>
  </MainContentContainer>
)

export default Container
