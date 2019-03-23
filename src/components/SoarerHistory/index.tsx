import React, { FunctionComponent } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { graphql, useStaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'

const DownloadVersion = styled.big`
  font-variant-numeric: tabular-nums;
`

const DownloadLink = styled(Bootstrap.Button)`
  display: inline-block;
  margin-left: 15px;
  font-size: 90%;
  padding: 2px 8px;
  vertical-align: 2px;
`

const DownloadIcon = styled(FontAwesome)`
  margin-right: 5px;
`

const query = graphql`
  query {
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

const SoarerHistory = injectIntl<SoarerHistoryQueryResult>(function SoarerHistory({
  intl: {
    formatMessage,
    formatDate,
  },
}) {
  const {
    updates: {
      items,
    },
  } = useStaticQuery(query) as SoarerHistoryQueryResult

  return (
    <>
      {items.map(({ update }) => (
        <div key={update.version}>
          <DownloadVersion>{update.version}</DownloadVersion>
          {update.file ? (
            <DownloadLink bsStyle="default" href={update.file.publicURL} download={update.file.base}>
              <DownloadIcon name="download" />
              {formatMessage(messages.download)}
            </DownloadLink>
          ) : null}
          <br />
          <small>
            {formatDate(update.date, {
              year: 'numeric',
              month: 'narrow',
              day: 'numeric',
            })}
          </small>
          <ul>
            {update.history.map((content, index) => (
              <li key={index}>
                {content.title}
                {content.message ? (
                  <ul>
                    <li>{content.message}</li>
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
})

interface SoarerHistoryQueryResult {
  updates: {
    items: {
      update: SoarerHistoryItem
    }[]
  }
}

export interface SoarerHistoryItem {
  version: string
  date: string
  file?: {
    base: string
    size: number
    publicURL: string
    prettySize: string
  } | null
  history: {
    title: string
    message: string | null
  }[]
}

export default SoarerHistory
