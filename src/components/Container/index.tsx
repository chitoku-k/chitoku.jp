import { memo } from 'react'
import { Container as BootstrapContainer, Col, Row } from 'react-bootstrap'
import { Location } from '@reach/router'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-dom'
import clsx from 'clsx'

import styles from './styles.module.scss'

import Sidebar from 'components/Sidebar'
import SearchResult from 'components/SearchResult'

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)

const Container = connectStateResults<ContainerProps>(function Container({
  searchState,
  children,
  sidebar = true,
}) {
  return (
    <BootstrapContainer className={styles.container}>
      <Row className={styles.row}>
        <Col className={clsx(styles.col, sidebar && styles.sidebar)}>
          {searchState.query ? <SearchResult /> : children}
        </Col>
        <Location>
          {({ location }) => sidebar ? <MemoizedSidebar location={location} /> : null}
        </Location>
      </Row>
    </BootstrapContainer>
  )
})

interface ContainerProps extends StateResultsProvided<unknown> {
  sidebar?: boolean
}

export default Container
