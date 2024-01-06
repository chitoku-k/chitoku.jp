import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import NotFound from 'components/NotFound'
export { Head } from 'components/NotFound'

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
  <NotFound {...data} />
)

type NotFoundPageProps = PageProps<Queries.NotFoundItemQuery>

export default NotFoundPage
