import React, { FunctionComponent } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { graphql, StaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'
import icon from './icon.png'
import { SoarerHistoryItem } from 'components/SoarerHistory'

const query = graphql`
  query {
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

const SoarerDownloadContainer = styled.div`
  display: flex;
  align-items: center;
`

const SoarerDownloadIcon = styled.img`
  width: 48px;
  margin: 0 15px !important;
`

const SoarerDownloadTitle = styled.h2`
  margin: 0 !important;
  font-size: 24px !important;
`

const SoarerDownloadDescription = styled.div`
  margin-top: 10px;
  margin-left: 78px;
`

const SoarerDownload = injectIntl<SoarerDownloadProps>(function SoarerDownload({
  updates: {
    items: [
      { update },
    ],
  },
  intl: {
    formatMessage,
  },
}) {
  return (
    <>
      <SoarerDownloadContainer>
        <SoarerDownloadIcon src={icon} />
        <SoarerDownloadTitle className="no-border">
          <span>Soarer for Windows </span><br />
          <span>ver {update.version}</span>
        </SoarerDownloadTitle>
      </SoarerDownloadContainer>
      <SoarerDownloadDescription className="description">
        {update.file ? (
          <Bootstrap.Button bsStyle="primary" bsSize="large" href={update.file.publicURL} download={update.file.base}>
            <FontAwesome name="download" />
            {formatMessage(messages.download, {
              size: update.file.prettySize,
            })}
          </Bootstrap.Button>
        ) : null}
        <Bootstrap.Button bsStyle="default" bsSize="large" href="./history">
          {formatMessage(messages.history)}
        </Bootstrap.Button>
      </SoarerDownloadDescription>
    </>
  )
})

interface SoarerDownloadProps {
  updates: {
    items: {
      update: SoarerHistoryItem
    }[]
  }
}

const QueryableSoarerDownload: FunctionComponent = () => (
  <StaticQuery query={query}>
    {({ updates }: SoarerDownloadProps) => (
      <SoarerDownload updates={updates} />
    )}
  </StaticQuery>
)

export default QueryableSoarerDownload
