import type { FunctionComponent } from 'react'
import React from 'react'
import { graphql } from 'gatsby'

import type { NotFoundItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
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
  data: NotFoundItemQuery
}

export default NotFoundPage
