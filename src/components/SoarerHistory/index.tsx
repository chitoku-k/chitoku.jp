import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { SoarerHistoryItemQuery } from 'graphql-types'
import messages from './messages'

const DownloadVersion = styled.big`
  font-variant-numeric: tabular-nums;
`

const DownloadLink = styled(Button)`
  display: inline-block;
  margin-left: 15px;
  font-size: 90%;
  padding: 2px 8px;
  vertical-align: 2px;
`

const DownloadIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

const query = graphql`
  query SoarerHistoryItem {
    updates: allUpdatesYaml(
      sort: { fields: [ version ], order: DESC }
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

  if (items.some(x => x.update.file && typeof x.update.file.publicURL !== 'string')) {
    throw new Error('Invalid error')
  }

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {items.map(({ update }) => (
        <div key={update.version}>
          <DownloadVersion>{update.version}</DownloadVersion>
          {update.file ? (
            <DownloadLink variant="light" href={update.file.publicURL as string} download={update.file.base}>
              <DownloadIcon icon={faDownload} />
              {formatMessage(messages.download)}
            </DownloadLink>
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
      ))}
    </>
  )
  /* eslint-enable react/jsx-no-useless-fragment */
}

type SoarerHistoryQueryResult = SoarerHistoryItemQuery

export default SoarerHistory
