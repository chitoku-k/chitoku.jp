import React, { FunctionComponent, memo } from 'react'
import styled from 'styled-components'
import { Location } from '@reach/router'

import { media } from 'components/Layout'
import Sidebar, { SidebarProps } from 'components/Sidebar'

const Container = styled.div`
  padding: 0;
  ${media.greaterThan('small-pc')`
    padding: 0 15px;
  `}
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

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)

const Content: FunctionComponent<ContentProps> = ({
  children,
  sidebar = true,
}) => (
  <Container className={[
    'container',
    sidebar ? 'sidebar' : '',
  ].filter(x => x).join(' ')}>
    {children}
    <Location>
      {({ location }) => (
        <MemoizedSidebar location={location} />
      )}
    </Location>
  </Container>
)

interface ContentProps {
  sidebar?: boolean
}

export default Content
