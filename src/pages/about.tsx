import { graphql } from 'gatsby'
import type { FunctionComponent } from 'react'

import About from 'components/About'
import type { ArticleAstNode } from 'components/Article'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'

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
  data: {
    about: GatsbyTypes.AboutItemQuery['about']
    introduction: {
      markdown: {
        htmlAst: ArticleAstNode
      }
    }
  }
}

const AboutPage: FunctionComponent<AboutPageProps> = ({
  data,
}) => (
  <Layout>
    <Header />
    <Navbar />
    <About {...data} />
    <Footer />
  </Layout>
)

export default AboutPage
