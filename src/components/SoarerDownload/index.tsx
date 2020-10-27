import type { FunctionComponent } from 'react'
import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import messages from './messages'
import styles from './styles.module.scss'
import icon from './icon.png'
import type { SoarerDownloadItemQuery } from 'graphql-types'

import Link from 'components/Link'

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

const SoarerDownload: FunctionComponent = () => {
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
          <Link to={update.file.publicURL as string} download={update.file.base}>
            <Button variant="primary" size="lg">
              <FontAwesomeIcon icon={faDownload} />
              {formatMessage(messages.download, {
                size: update.file.prettySize,
              })}
            </Button>
          </Link>
        ) : null}
        <Link to="/softwares/soarer/history">
          <Button variant="light" size="lg">
            {formatMessage(messages.history)}
          </Button>
        </Link>
      </div>
    </>
  )
}

type SoarerDownloadQueryResult = SoarerDownloadItemQuery

export default SoarerDownload
