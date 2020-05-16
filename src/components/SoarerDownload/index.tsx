import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'

import { SoarerDownloadItemQuery } from 'graphql-types'
import messages from './messages'
import icon from './icon.png'
import { ArticleWrapper } from 'components/Article'
import { media } from 'components/Layout'

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

const SoarerDownloadContainer = styled.div`
  display: flex;
  align-items: center;
`

const SoarerDownloadIcon = styled.img`
  width: 48px;
  margin: 0 15px !important;
  ${media.sm.down()} {
    margin-left: 0 !important;
  }
`

const SoarerDownloadTitle = styled.h2`
  margin: 0 !important;
  font-size: 24px !important;
  br {
    display: none;
  }
  ${media.sm.down()} {
    font-size: 120% !important;
    line-height: 1.2;
    br {
      display: inline;
    }
  }
`

const SoarerDownloadDescription = styled.div`
  margin-top: 10px;
  margin-left: 78px;
  .btn,
  .btn .fa {
    margin-right: 8px;
  }
  ${media.sm.down()} {
    margin-top: 20px;
    margin-left: 0;
    .btn {
      font-size: 100%;
      margin-bottom: 5px;
      padding: 7px 14px;
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
      <SoarerDownloadContainer>
        <SoarerDownloadIcon src={icon} />
        <SoarerDownloadTitle className="no-border">
          <span>Soarer for Windows </span><br />
          <span>ver {update.version}</span>
        </SoarerDownloadTitle>
      </SoarerDownloadContainer>
      <SoarerDownloadDescription className="description">
        {update.file ? (
          <Button<'a'> variant="primary" size="lg" href={update.file.publicURL as string} download={update.file.base}>
            <FontAwesome name="download" />
            {formatMessage(messages.download, {
              size: update.file.prettySize,
            })}
          </Button>
        ) : null}
        <Button variant="light" size="lg" href="./history">
          {formatMessage(messages.history)}
        </Button>
      </SoarerDownloadDescription>
    </>
  )
}

type SoarerDownloadQueryResult = SoarerDownloadItemQuery

export default SoarerDownload
