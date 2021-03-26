import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import type { HomeQuery } from 'graphql-types'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Home from 'components/Home'
import ArticleContainer from 'components/ArticleContainer'
import Metadata from 'components/Metadata'
import type { Page } from 'components/Pagination'
import Pagination, {
  PaginationContainer,
  getNextPagePath,
  getPreviousPagePath,
  hasNextPage,
  hasPreviousPage,
} from 'components/Pagination'

interface HomePageProps extends PageProps {
  pageContext: {
    page: Page
  }
  data: HomeQuery
}

const HomePagination: FunctionComponent<{ page: Page }> = ({
  page,
}) => hasPreviousPage(page) || hasNextPage(page) ? (
  <ArticleContainer>
    <PaginationContainer>
      <Pagination page={page} />
    </PaginationContainer>
  </ArticleContainer>
) : null

export const pageQuery = graphql`
  query home($ids: [ String! ]) {
    home: homeYaml {
      categories {
        ...Category
        description
      }
    }
    pages: allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { fields: [ frontmatter___created ], order: DESC }
    ) {
      items: edges {
        article: node {
          path
          attributes: frontmatter {
            title
            created
            category {
              ...Category
            }
            tags {
              ...Tag
            }
          }
        }
      }
    }
  }
`

const IndexPage: FunctionComponent<HomePageProps> = ({
  data,
  pageContext: {
    page,
  },
}) => (
  <Layout>
    <Metadata title={null}>
      {hasPreviousPage(page) ? (
        <link rel="prev" href={getPreviousPagePath(page)} />
      ) : null}
      {hasNextPage(page) ? (
        <link rel="next" href={getNextPagePath(page)} />
      ) : null}
    </Metadata>
    <Header />
    <Navbar />
    <Home {...data}>
      <HomePagination page={page} />
    </Home>
    <Footer />
  </Layout>
)

export default IndexPage
