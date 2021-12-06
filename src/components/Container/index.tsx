import { useLocation } from '@reach/router'
import clsx from 'clsx'
import { memo } from 'react'
import { Container as BootstrapContainer, Col, Row } from 'react-bootstrap'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-dom'

import * as styles from './styles.module.scss'

import SearchResult from 'components/SearchResult'
import Sidebar from 'components/Sidebar'

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)

const Container = connectStateResults<ContainerProps>(function Container({
  searchState,
  children,
  sidebar = true,
}) {
  const location = useLocation()

  return (
    <BootstrapContainer className={styles.container}>
      <Row className={styles.row}>
        <Col className={clsx(styles.col, sidebar && styles.sidebar)}>
          {searchState.query ? <SearchResult /> : children}
        </Col>
        {sidebar ? <MemoizedSidebar location={location} /> : null}
      </Row>
    </BootstrapContainer>
  )
})

interface ContainerProps extends StateResultsProvided<unknown> {
  sidebar?: boolean
}

export default Container
