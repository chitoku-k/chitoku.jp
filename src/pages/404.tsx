import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import { NotFoundItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
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
    <Content>
      <NotFound {...data} />
    </Content>
    <Footer />
  </Layout>
)

interface NotFoundPageProps extends PageProps {
  data: NotFoundItemQuery
}

export default NotFoundPage
