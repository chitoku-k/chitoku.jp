import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Container from 'components/Container'
import Article from 'components/Article'
import ArticleContainer from 'components/ArticleContainer'
import Metadata from 'components/Metadata'
import type { ArticleCategoryItem, ArticleItem, ArticleTagItem } from 'components/Article'
import type { Page } from 'components/Pagination'
import Pagination, {
  PaginationContainer,
  getNextPagePath,
  getPreviousPagePath,
  hasNextPage,
  hasPreviousPage,
} from 'components/Pagination'

interface TaxonomyPageProps extends PageProps {
  pageContext: {
    category: ArticleCategoryItem | null
    tag: ArticleTagItem | null
    page: Page
  }
  data: {
    articles: {
      items: {
        article: ArticleItem
      }[]
    }
  }
}

export const pageQuery = graphql`
  query items($ids: [ String! ]) {
    articles: allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { frontmatter: { created: DESC } }
    ) {
      items: edges {
        article: node {
          ...Article
          excerptAst(pruneLength: 1000)
        }
      }
    }
  }
`

const TaxonomyPagination: FunctionComponent<{ page: Page }> = ({
  page,
}) => hasPreviousPage(page) || hasNextPage(page) ? (
  <ArticleContainer>
    <PaginationContainer>
      <Pagination page={page} />
    </PaginationContainer>
  </ArticleContainer>
) : null

const TaxonomyPage: FunctionComponent<TaxonomyPageProps> = ({
  data: {
    articles: {
      items,
    },
  },
  pageContext: {
    category,
    tag,
    page,
  },
}) => {
  const title = category?.name ?? tag?.name ?? null
  const prev = hasPreviousPage(page) ? getPreviousPagePath(page) : null
  const next = hasNextPage(page) ? getNextPagePath(page) : null

  return (
    <Metadata title={title} thumbnail={category?.thumbnail} prev={prev} next={next}>
      <Container>
        {items.map(({ article }) => (
          <Article key={article.path} article={article} prev={null} next={null} />
        ))}
        <TaxonomyPagination page={page} />
      </Container>
    </Metadata>
  )
}

export default TaxonomyPage
