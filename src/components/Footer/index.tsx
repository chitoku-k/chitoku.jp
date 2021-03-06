import type { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, useStaticQuery } from 'gatsby'

import messages from './messages'
import * as styles from './styles.module.scss'
import type { FooterItemQuery } from 'graphql-types'

import Link from 'components/Link'

const query = graphql`
  query FooterItem {
    commit: gitCommit(latest: { eq: true }) {
      hash
      message
      date
    }
  }
`

const Footer: FunctionComponent = () => {
  const { commit } = useStaticQuery<FooterQueryResult>(query)
  const repositoryName = process.env.GATSBY_REPOSITORY_NAME
  const repositoryTreeUrl = process.env.GATSBY_REPOSITORY_TREE_URL

  if (!commit) {
    throw new Error('Invalid data')
  }
  if (!repositoryName || !repositoryTreeUrl) {
    throw new Error('Invalid env')
  }

  return (
    <footer className={styles.footer}>
      <FormattedMessage {...messages.copyright} values={{
        link: <Link className={styles.link} to={`${repositoryTreeUrl}${commit.hash}`}>{repositoryName}</Link>,
      }} />
    </footer>
  )
}

type FooterQueryResult = FooterItemQuery

export default Footer
