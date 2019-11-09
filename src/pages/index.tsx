import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import { HomeItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Home from 'components/Home'

export const pageQuery = graphql`
  query HomeItem {
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

const IndexPage: FunctionComponent<HomePageProps> = ({ data }) => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <Home {...data} />
    </Content>
    <Footer />
  </Layout>
)

interface HomePageProps extends PageProps {
  data: HomeItemQuery
}

export default IndexPage
