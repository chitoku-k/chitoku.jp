import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import type { HomeItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
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
    <Home {...data} />
    <Footer />
  </Layout>
)

interface HomePageProps extends PageProps {
  data: HomeItemQuery
}

export default IndexPage
