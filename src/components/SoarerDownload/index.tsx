import type { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'
import icon from './icon.png'

import Link from 'components/Link'

const query = graphql`
  query SoarerDownloadItem {
    updates: allUpdatesYaml(
      sort: { version: DESC }
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
        item,
      ],
    },
  } = useStaticQuery<SoarerDownloadQueryResult>(query)

  if (!item) {
    return null
  }

  const { update } = item
  return (
    <>
      <div className={styles.container}>
        <img className={styles.icon} src={icon} />
        <h2 className={styles.title}>
          <span>Soarer for Windows </span><br />
          <span>ver {update.version}</span>
        </h2>
      </div>
      <div className={styles.description}>
        {update.file?.publicURL ? (
          <Link to={update.file.publicURL} download={update.file.base}>
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

type SoarerDownloadQueryResult = Queries.SoarerDownloadItemQuery

export default SoarerDownload
