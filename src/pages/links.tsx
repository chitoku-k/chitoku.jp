import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import type { LinksLinkItem } from 'components/Links'
import Links from 'components/Links'

export const pageQuery = graphql`
  query LinksItem {
    links: linksYaml {
      items {
        name
        url
      }
    }
  }
`

const LinksPage: FunctionComponent<LinksPageProps> = ({
  data,
}) => (
  <Links {...data} />
)

interface LinksPageProps extends PageProps {
  data: {
    links: {
      items: LinksLinkItem[]
    }
  }
}

export default LinksPage
