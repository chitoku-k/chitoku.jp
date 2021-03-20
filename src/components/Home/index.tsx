import type { FunctionComponent } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import type { CategoryFragment, HomeItemQuery } from 'graphql-types'
import messages from './messages'

import Container from 'components/Container'
import ArticleCard from 'components/ArticleCard'
import ArticleContainer from 'components/ArticleContainer'
import CategoryIcon from 'components/CategoryIcon'
import Link from 'components/Link'
import Metadata from 'components/Metadata'
import SubHeader from 'components/SubHeader'

import * as styles from './styles.module.scss'

const isCategory = (category: CategoryFragment | null): category is CategoryFragment => Boolean(category)

const Home: FunctionComponent<HomeProps> = ({
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
      <Metadata title={null} />
      <ArticleContainer className={styles.container}>
        <SubHeader className={styles.header}>
          {formatMessage(messages.categories)}
        </SubHeader>
        <Row className={styles.row}>
          {home.categories.filter(isCategory).map(category => (
            <Col key={category.path} className={styles.col} xs={4}>
              <CategoryIcon to={category.path} category={category} />
              <Link className={styles.link} to={category.path}>
                {category.name}
              </Link>
            </Col>
          ))}
        </Row>
      </ArticleContainer>
      {items.map(({ article }) => (
        <ArticleContainer key={article.path}>
          <ArticleCard article={article} />
        </ArticleContainer>
      ))}
    </Container>
  )
}

type HomeProps = HomeItemQuery

export default Home
