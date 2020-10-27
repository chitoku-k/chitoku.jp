import type { FunctionComponent } from 'react'
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import clsx from 'clsx'

import styles from './styles.module.scss'
import type { HomeItemQuery } from 'graphql-types'

import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import PspProgrammingIcon from '../../assets/pspprogramming.svg'
import SoarerIcon from '../../assets/soarer.svg'
import RecoTwIcon from '../../assets/recotw.svg'
import WindowsIcon from '../../assets/windows.svg'
import GadgetsIcon from '../../assets/psp-smartphone.svg'
import ProgrammingIcon from '../../assets/programming.svg'

const icons: HomeIcon = {
  PspProgrammingIcon,
  SoarerIcon,
  RecoTwIcon,
  WindowsIcon,
  GadgetsIcon,
  ProgrammingIcon,
}

const Home: FunctionComponent<HomeProps> = ({ home }) => {
  if (!home) {
    throw new Error('Invalid data')
  }

  const { items } = home

  return (
    <Container>
      <Metadata title={null} />
      <ArticleContainer>
        <Row>
          {items.map(({
            id,
            component,
            name,
            to,
            description,
          }) => {
            const Icon = icons[component]
            return (
              <Fragment key={name}>
                <Col className={styles.item} xs={6} md={4}>
                  <Link className={clsx(styles.link, styles[id])} to={to} title={name}>
                    <div className={styles.wrapper}>
                      <div className={styles.curtain} />
                      <Icon viewBox="0 0 175 175" />
                    </div>
                    <h2 className={styles.title}>{name}</h2>
                  </Link>
                  <p className={styles.description}>{description}</p>
                </Col>
              </Fragment>
            )
          })}
        </Row>
      </ArticleContainer>
    </Container>
  )
}

type HomeProps = HomeItemQuery

type HomeIcon = Record<string, React.ComponentType<React.SVGAttributes<Element>>>

export default Home
