import type { FunctionComponent, ReactNode } from 'react'
import { Container as BootstrapContainer, Col, Row } from 'react-bootstrap'
import { Slice } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

const Container: FunctionComponent<ContainerProps> = ({
  children,
  sidebar,
}) => {
  const { href, pathname, search, hash } = useLocation()

  return (
    <BootstrapContainer className={styles.container}>
      <Row className={styles.row}>
        <Col className={clsx(styles.col, sidebar && styles.sidebar)}>
          {children}
        </Col>
        {sidebar
          ? <Slice alias="sidebar" location={{ href, pathname, search, hash }} />
          : null}
      </Row>
    </BootstrapContainer>
  )
}

interface ContainerProps {
  children?: ReactNode
  sidebar: boolean
}

export default Container
