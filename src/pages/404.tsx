import { graphql } from 'gatsby'
import type { FunctionComponent } from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'

export const pageQuery = graphql`
  query NotFoundItem {
    contacts: aboutYaml {
      items: contacts {
        service
        primary
        accounts {
          name
          url
        }
      }
    }
  }
`

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ data }) => (
  <Layout>
    <Header />
    <Navbar />
    <NotFound {...data} />
    <Footer />
  </Layout>
)

interface NotFoundPageProps extends PageProps {
  data: GatsbyTypes.NotFoundItemQuery
}

export default NotFoundPage
