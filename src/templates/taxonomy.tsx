import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout, { ArticleContainer, Container } from 'components/Layout'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Article, { ArticleItem, ArticleCategoryItem, ArticleTagItem } from 'components/Article'
import Pagination, {
  Page,
  PaginationContainer,
  hasPreviousPage,
  hasNextPage,
  getPreviousPagePath,
  getNextPagePath,
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
          excerptAst
        }
      }
    }
  }
`

const TaxonomyPagination = ({ page }: { page: Page }) => (
  hasPreviousPage(page) || hasNextPage(page) ? (
    <ArticleContainer>
      <PaginationContainer>
        <Pagination page={page} />
      </PaginationContainer>
    </ArticleContainer>
  ) : null
)

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
    <Metadata title={category ? category.name : tag ? tag.name : null}>
      {hasPreviousPage(page) ? (
        <link rel="prev" href={getPreviousPagePath(page)} />
      ) : null}
      {hasNextPage(page) ? (
        <link rel="next" href={getNextPagePath(page)} />
      ) : null}
    </Metadata>
    <Header />
    <Navbar />
    <Content>
      <Container>
        {items.map(({ article }, index) => (
          <Article key={index} article={article} excerpted={true} />
        ))}
        <TaxonomyPagination page={page} />
      </Container>
    </Content>
    <Footer />
  </Layout>
)

export default TaxonomyPage
