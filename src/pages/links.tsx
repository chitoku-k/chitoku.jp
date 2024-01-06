import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import Links from 'components/Links'
export { Head } from 'components/Links'

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

type LinksPageProps = PageProps<Queries.LinksItemQuery>

export default LinksPage
