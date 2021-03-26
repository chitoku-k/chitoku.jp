import type { FunctionComponent } from 'react'
import { Col, Row } from 'react-bootstrap'

import * as styles from './styles.module.scss'
import type { ArticleFragment } from 'typings/graphql-types'

import ArticleAttribute from 'components/ArticleAttribute'
import CategoryIcon from 'components/CategoryIcon'
import Link from 'components/Link'

const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  article,
}) => (
  <Row>
    <Col className={styles.col} xs="auto">
      <CategoryIcon to={article.path} category={article.attributes.category} />
    </Col>
    <Col className={styles.col}>
      <Row className={styles.row}>
        <Link className={styles.link} to={article.path}>
          {article.attributes.title}
        </Link>
      </Row>
      <Row className={styles.row}>
        <ArticleAttribute article={article} />
      </Row>
    </Col>
  </Row>
)

interface ArticleCardProps {
  article: Omit<ArticleFragment, 'excerpted'>
}

export default ArticleCard
