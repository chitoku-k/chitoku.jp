import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { media } from 'components/Layout'
import Sidebar from 'components/Sidebar'

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

const Content: FunctionComponent<ContentProps> = ({
  children,
  sidebar = true,
}) => (
  <Container className={[
    'container',
    sidebar ? 'sidebar' : '',
  ].filter(x => x).join(' ')}>
    {children}
    {sidebar ? (
      <Sidebar />
    ) : null}
  </Container>
)

interface ContentProps {
  sidebar?: boolean
}

export default Content
