import type { FunctionComponent } from 'react'
import { Container, Row } from 'react-bootstrap'

import * as styles from './styles.module.scss'
import Logo from '../../assets/logo.inline.svg'

import Link from 'components/Link'

const Header: FunctionComponent = () => (
  <Container className={styles.container} as="header">
    <Row>
      <h1 className={styles.title}>
        <Link className={styles.link} to="/">
          <Logo viewBox="0 0 330 33" width={400} height={40} />
        </Link>
      </h1>
    </Row>
  </Container>
)

export default Header
