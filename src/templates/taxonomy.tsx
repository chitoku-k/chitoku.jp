import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import Article from 'components/Article'
import ArticleContainer from 'components/ArticleContainer'
import Metadata from 'components/Metadata'
import type { ArticleCategoryItem, ArticleTagItem } from 'components/Article'
import type { Page } from 'components/Pagination'
import Pagination, {
  PaginationContainer,
  getNextPagePath,
  getPreviousPagePath,
  hasNextPage,
  hasPreviousPage,
} from 'components/Pagination'

interface TaxonomyContext {
  category: ArticleCategoryItem | null
  tag: ArticleTagItem | null
  page: Page
}

type TaxonomyPageProps = PageProps<Queries.itemsQuery, TaxonomyContext>

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
    page,
  },
}) => (
  <>
    {items.map(({ article }) => (
      <Article key={article.path} article={article} prev={null} next={null} />
    ))}
    <TaxonomyPagination page={page} />
  </>
)

export const Head: FunctionComponent<TaxonomyPageProps> = ({
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
    <Metadata title={title} thumbnail={category?.thumbnail} prev={prev} next={next} />
  )
}

export default TaxonomyPage
