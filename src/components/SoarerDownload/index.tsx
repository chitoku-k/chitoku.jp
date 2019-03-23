import React from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { graphql, useStaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'
import icon from './icon.png'
import { media } from 'components/Layout'
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
  ${media.lessThan('sp')`
    margin-left: 0 !important;
  `}
`

const SoarerDownloadTitle = styled.h2`
  margin: 0 !important;
  font-size: 24px !important;
  br {
    display: none;
  }
  ${media.lessThan('sp')`
    font-size: 120% !important;
    line-height: 1.2;
    br {
      display: inline;
    }
  `}
`

const SoarerDownloadDescription = styled.div`
  margin-top: 10px;
  margin-left: 78px;
  .btn,
  .btn .fa {
    margin-right: 8px;
  }
  ${media.lessThan('sp')`
    margin-top: 20px;
    margin-left: 0;
    .btn {
      font-size: 100%;
      margin-bottom: 5px;
      padding: 7px 14px;
    }
  `}
`

const SoarerDownload = injectIntl<SoarerDownloadQueryResult>(function SoarerDownload({
  intl: {
    formatMessage,
  },
}) {
  const {
    updates: {
      items: [
        { update },
      ],
    },
  } = useStaticQuery(query) as SoarerDownloadQueryResult

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

interface SoarerDownloadQueryResult {
  updates: {
    items: {
      update: SoarerHistoryItem
    }[]
  }
}

export default SoarerDownload
