import React, { FunctionComponent, memo } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Location } from '@reach/router'

import styles from './styles.module.scss'

import Sidebar from 'components/Sidebar'

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)

const Content: FunctionComponent<ContentProps> = ({
  children,
  sidebar = true,
}) => (
  <Container className={styles.container}>
    <Row className={styles.row}>
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
