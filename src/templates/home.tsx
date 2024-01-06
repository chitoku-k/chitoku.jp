import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

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

type HomePageProps = PageProps<Queries.homeQuery, { page: Page }>

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
}) => (
  <Home {...data}>
    <HomePagination page={page} />
  </Home>
)

export const Head: FunctionComponent<HomePageProps> = ({
  pageContext: {
    page,
  },
}) => {
  const prev = hasPreviousPage(page) ? getPreviousPagePath(page) : null
  const next = hasNextPage(page) ? getNextPagePath(page) : null

  return (
    <Metadata title={null} prev={prev} next={next} />
  )
}

export default IndexPage
