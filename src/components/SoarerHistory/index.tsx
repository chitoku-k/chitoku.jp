import type { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'

const query = graphql`
  query SoarerHistoryItem {
    updates: allUpdatesYaml(
      sort: { version: DESC }
    ) {
      items: edges {
        update: node {
          version
          date
          file {
            base
            publicURL
          }
          history {
            title
            message
          }
        }
      }
    }
  }
`

const SoarerHistory: FunctionComponent = () => {
  const { formatMessage, formatDate } = useIntl()
  const {
    updates: {
      items,
    },
  } = useStaticQuery<SoarerHistoryQueryResult>(query)

  return items.map(({ update }) => (
    <div key={update.version}>
      <big className={styles.version}>{update.version}</big>
      {update.file?.publicURL ? (
        <Button as="a" className={styles.button} variant="light" href={update.file.publicURL} download={update.file.base}>
          <FontAwesomeIcon className={styles.icon} icon={faDownload} />
          {formatMessage(messages.download)}
        </Button>
      ) : null}
      <br />
      <small>
        {formatDate(new Date(update.date), {
          year: 'numeric',
          month: 'narrow',
          day: 'numeric',
        })}
      </small>
      <ul>
        {update.history.map(({ title, message }) => (
          <li key={title}>
            {title}
            {message ? (
              <ul>
                <li>{message}</li>
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  ))
}

type SoarerHistoryQueryResult = Queries.SoarerHistoryItemQuery

export default SoarerHistory
