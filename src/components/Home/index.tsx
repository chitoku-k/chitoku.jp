import type { FunctionComponent } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import type { CategoryFragment, HomeQuery } from 'graphql-types'
import messages from './messages'

import Container from 'components/Container'
import ArticleCard from 'components/ArticleCard'
import ArticleContainer from 'components/ArticleContainer'
import CategoryIcon from 'components/CategoryIcon'
import Link from 'components/Link'
import SubHeader from 'components/SubHeader'

import * as styles from './styles.module.scss'

const isCategory = (category: CategoryFragment | null): category is CategoryFragment => Boolean(category)

const Home: FunctionComponent<HomeProps> = ({
  children,
  home,
  pages: {
    items,
  },
}) => {
  const { formatMessage } = useIntl()

  if (!home?.categories) {
    throw new Error('Invalid data')
  }

  return (
    <Container>
      <ArticleContainer className={styles.container}>
        <SubHeader className={styles.header}>
          {formatMessage(messages.categories)}
        </SubHeader>
        <Row className={styles.row}>
          {home.categories.filter(isCategory).map(category => (
            <Col key={category.path} className={styles.col} xs={2} md={4}>
              <Row className={styles.category}>
                <Col className={styles.icon} xs={12} md="auto">
                  <CategoryIcon to={category.path} category={category} />
                </Col>
                <Col className={styles.name}>
                  <Link className={styles.link} to={category.path}>
                    {category.name}
                  </Link>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </ArticleContainer>
      {items.map(({ article }) => (
        <ArticleContainer key={article.path}>
          <ArticleCard article={article} />
        </ArticleContainer>
      ))}
      {children}
    </Container>
  )
}

type HomeProps = HomeQuery

export default Home
