import { graphql, useStaticQuery } from 'gatsby'
import type { FunctionComponent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'

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
  const { formatMessage } = useIntl()
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
        license: <Link className={styles.link} to="/licenses.txt">{formatMessage(messages.license)}</Link>,
      }} />
    </footer>
  )
}

type FooterQueryResult = GatsbyTypes.FooterItemQuery

export default Footer
