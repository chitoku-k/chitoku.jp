import React, { FunctionComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import { AboutContactItem } from 'components/About'
import NotFound from 'components/NotFound'

export const pageQuery = graphql`
  query {
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

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  data: {
    contacts,
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <NotFound contacts={contacts.items} />
    </Content>
    <Footer />
  </Layout>
)

interface NotFoundPageProps extends PageProps {
  data: {
    contacts: {
      items: AboutContactItem[]
    }
  }
}

export default NotFoundPage
