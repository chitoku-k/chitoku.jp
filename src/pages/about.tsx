import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import About, { AboutItem, AboutIntroductionItem } from 'components/About'

export const pageQuery = graphql`
  query {
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
  data: {
    about: AboutItem
    introduction: AboutIntroductionItem
  }
}

const AboutPage: FunctionComponent<AboutPageProps> = ({
  data: {
    about,
    introduction,
  },
}) => (
  <Layout>
    <Header />
    <Navbar />
    <Content>
      <About about={about} introduction={introduction} />
    </Content>
    <Footer />
  </Layout>
)

export default AboutPage
