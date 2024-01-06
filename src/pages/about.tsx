import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import About from 'components/About'
export { Head } from 'components/About'

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

type AboutPageProps = PageProps<Queries.AboutItemQuery>

const AboutPage: FunctionComponent<AboutPageProps> = ({
  data,
}) => (
  <About {...data} />
)

export default AboutPage
