import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

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
  data: GatsbyTypes.homeQuery
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
      sort: { frontmatter: { created: DESC } }
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
}) => {
  const prev = hasPreviousPage(page) ? getPreviousPagePath(page) : null
  const next = hasNextPage(page) ? getNextPagePath(page) : null

  return (
    <Layout>
      <Metadata title={null} prev={prev} next={next}>
        <Header />
        <Navbar />
        <Home {...data}>
          <HomePagination page={page} />
        </Home>
        <Footer />
      </Metadata>
    </Layout>
  )
}

export default IndexPage
