import React, { FunctionComponent, memo } from 'react'
import { Container as BootstrapContainer, Row as BootstrapRow } from 'react-bootstrap'
import styled from 'styled-components'
import { Location } from '@reach/router'

import { media } from 'components/Layout'
import Sidebar from 'components/Sidebar'

const Container = styled(BootstrapContainer)`
  ${media.greaterThan('normal-pc')`
    padding-bottom: 60px;
  `}
  ${media.lessThan('tablet')`
    padding: 15px;
    &.sidebar {
      padding: 15px;
    }
  `}
`

const Row = styled(BootstrapRow)`
  align-items: flex-start;
`

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)

const Content: FunctionComponent<ContentProps> = ({
  children,
  sidebar = true,
}) => (
  <Container className={sidebar ? 'sidebar' : ''}>
    <Row>
      {children}
      <Location>
        {({ location }) => sidebar ? <MemoizedSidebar location={location} /> : null}
      </Location>
    </Row>
  </Container>
)

interface ContentProps {
  sidebar?: boolean
}

export default Content
