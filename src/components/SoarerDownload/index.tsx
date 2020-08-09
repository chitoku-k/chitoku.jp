import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import messages from './messages'
import styles from './styles.module.scss'
import icon from './icon.png'
import { SoarerDownloadItemQuery } from 'graphql-types'

import { ArticleWrapper } from 'components/Article'

const query = graphql`
  query SoarerDownloadItem {
    updates: allUpdatesYaml(
      sort: { fields: [ version ], order: DESC }
      limit: 1
    ) {
      items: edges {
        update: node {
          version
          date
          file {
            base
            publicURL
            prettySize
          }
        }
      }
    }
  }
`

const SoarerDownload: FunctionComponent<ArticleWrapper> = () => {
  const { formatMessage } = useIntl()

  const {
    updates: {
      items: [
        { update },
      ],
    },
  } = useStaticQuery<SoarerDownloadQueryResult>(query)

  if (update.file && typeof update.file.publicURL !== 'string') {
    throw new Error('Invalid data')
  }

  return (
    <>
      <div className={styles.container}>
        <img className={styles.icon} src={icon} />
        <h2 className={clsx(styles.title, 'no-border')}>
          <span>Soarer for Windows </span><br />
          <span>ver {update.version}</span>
        </h2>
      </div>
      <div className={styles.description}>
        {update.file ? (
          <Button as="a" variant="primary" size="lg" href={update.file.publicURL as string} download={update.file.base}>
            <FontAwesomeIcon icon={faDownload} />
            {formatMessage(messages.download, {
              size: update.file.prettySize,
            })}
          </Button>
        ) : null}
        <Button variant="light" size="lg" href="./history">
          {formatMessage(messages.history)}
        </Button>
      </div>
    </>
  )
}

type SoarerDownloadQueryResult = SoarerDownloadItemQuery

export default SoarerDownload
