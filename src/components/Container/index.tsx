import React, { FunctionComponent } from 'react'
import { Location } from '@reach/router'
import * as Bootstrap from 'react-bootstrap'
import styled from 'styled-components'

import { media } from 'components/Layout'
import SearchResult, { getSearchText } from 'components/SearchResult'

const MainContentContainer = styled(Bootstrap.Col)`
  padding: 0;
  width: 100%;
  .sidebar & {
    width: 70%;
    ${media.lessThan('tablet')`
      padding: 0;
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
        return search ? (
          <SearchResult text={search} />
        ) : (
          children
        )
      }}
    </Location>
  </MainContentContainer>
)

export default Container
