import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, useStaticQuery } from 'gatsby'

import messages from './messages'
import styles from './styles.module.scss'
import { FooterItemQuery } from 'graphql-types'

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
  const repositoryName = process.env.GATSBY_REPOSITORY_NAME as string
  const repositoryTreeUrl = process.env.GATSBY_REPOSITORY_TREE_URL as string

  if (!commit) {
    throw new Error('Invalid data')
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
