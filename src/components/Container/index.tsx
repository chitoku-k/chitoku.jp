import type { FunctionComponent, ReactNode } from 'react'
import { memo } from 'react'
import { Container as BootstrapContainer, Col, Row } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

import Sidebar from 'components/Sidebar'

const MemoizedSidebar = memo(Sidebar, (prev, next) => prev.location.pathname === next.location.pathname)
MemoizedSidebar.displayName = 'MemoizedSidebar'

const Container: FunctionComponent<ContainerProps> = ({
  children,
  sidebar,
}) => {
  const location = useLocation()

  return (
    <BootstrapContainer className={styles.container}>
      <Row className={styles.row}>
        <Col className={clsx(styles.col, sidebar && styles.sidebar)}>
          {children}
        </Col>
        {sidebar ? <MemoizedSidebar location={location} /> : null}
      </Row>
    </BootstrapContainer>
  )
}

interface ContainerProps {
  children?: ReactNode
  sidebar: boolean
}

export default Container
