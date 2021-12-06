import { graphql } from 'gatsby'
import type { FunctionComponent } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Layout from 'components/Layout'
import type { LinksLinkItem } from 'components/Links'
import Links from 'components/Links'
import Navbar from 'components/Navbar'

export const pageQuery = graphql`
  query LinksItem {
    links: linksYaml {
      items {
        name
        url
      }
    }
  }
`

const LinksPage: FunctionComponent<LinksPageProps> = ({
  data: {
    links,
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Links links={links} />
    <Footer />
  </Layout>
)

interface LinksPageProps extends PageProps {
  data: {
    links: {
      items: LinksLinkItem[]
    }
  }
}

export default LinksPage
