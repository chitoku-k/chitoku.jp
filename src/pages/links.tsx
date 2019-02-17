import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Links, { LinksLinkItem } from 'components/Links'

export const pageQuery = graphql`
  query {
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
    <Content>
      <Links links={links} />
    </Content>
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
