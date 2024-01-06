import type { FunctionComponent } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import Search from 'components/Search'
export { Head } from 'components/Search'

export const pageQuery = graphql`
  query SearchItem {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const SearchPage: FunctionComponent<SearchPageProps> = ({
  data,
}) => (
  <Search {...data} />
)

type SearchPageProps = PageProps<Queries.SearchItemQuery>

export default SearchPage
