import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
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
      sort: { fields: [ frontmatter___created ], order: DESC }
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
}) => (
  <Layout>
    <Metadata title={category ? category.name : tag ? tag.name : null} thumbnail={category?.thumbnail}>
      {hasPreviousPage(page) ? (
        <link rel="prev" href={getPreviousPagePath(page)} />
      ) : null}
      {hasNextPage(page) ? (
        <link rel="next" href={getNextPagePath(page)} />
      ) : null}
    </Metadata>
    <Header />
    <Navbar />
    <Container>
      {items.map(({ article }) => (
        <Article key={article.path} article={article} />
      ))}
      <TaxonomyPagination page={page} />
    </Container>
    <Footer />
  </Layout>
)

export default TaxonomyPage
