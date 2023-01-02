import type { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

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
  <NotFound {...data} />
)

interface NotFoundPageProps extends PageProps {
  data: Queries.NotFoundItemQuery
}

export default NotFoundPage
