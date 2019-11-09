import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import { AboutItemQuery } from 'graphql-types'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import About from 'components/About'

export const pageQuery = graphql`
  query AboutItem {
    about: aboutYaml {
      title
      name
      occupation
      icon {
        name
        url
        src
      }
      interests {
        type
        items {
          name
          url
        }
      }
      contacts {
        service
        primary
        accounts {
          name
          url
        }
      }
    }
    introduction: file(relativePath: { eq: "posts/about.md" }) {
      markdown: childMarkdownRemark {
        htmlAst
      }
    }
  }
`

interface AboutPageProps extends PageProps {
  data: AboutItemQuery
}

const AboutPage: FunctionComponent<AboutPageProps> = ({
  data,
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <About {...data} />
    </Content>
    <Footer />
  </Layout>
)

export default AboutPage
