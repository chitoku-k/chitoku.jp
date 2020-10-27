import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import type { LatestItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Latest from 'components/Latest'

export const pageQuery = graphql`
  query LatestItem {
    latest: allMarkdownRemark(
      filter: { frontmatter: { created: { ne: null } } }
      sort: { order: DESC, fields: [ frontmatter___created ] }
      limit: 10
    ) {
      items: edges {
        article: node {
          attributes: frontmatter {
            title
            created
          }
          excerptAst(pruneLength: 1000)
          excerpted
          ...Article
        }
      }
    }
  }
`

const LatestPage: FunctionComponent<LatestPageProps> = ({
  data: {
    latest: {
      items,
    },
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Latest items={items} />
    <Footer />
  </Layout>
)

interface LatestPageProps extends PageProps {
  data: LatestItemQuery
}

export default LatestPage
