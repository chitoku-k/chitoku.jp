import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Home, { HomeLinkItem } from 'components/Home'

export const pageQuery = graphql`
  query {
    home: homeYaml {
      items {
        id
        component
        name
        to
        description
      }
    }
  }
`

const IndexPage: FunctionComponent<HomePageProps> = ({
  data: {
    home,
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <Home home={home} />
    </Content>
    <Footer />
  </Layout>
)

interface HomePageProps extends PageProps {
  data: {
    home: {
      items: HomeLinkItem[]
    }
  }
}

export default IndexPage
