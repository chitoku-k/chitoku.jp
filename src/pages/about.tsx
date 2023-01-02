import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import type { ArticleAstNode } from 'components/Article'
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
  data: {
    about: Queries.AboutItemQuery['about']
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
  <About {...data} />
)

export default AboutPage
