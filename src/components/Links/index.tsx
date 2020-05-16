import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'

import { LinksItemQuery } from 'graphql-types'
import messages from './messages'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

const LinksContainer = styled.ul`
  line-height: 1.8;
`

const Links: FunctionComponent<LinksProps> = ({ links }) => {
  const { formatMessage } = useIntl()

  if (!links) {
    throw new Error('Invalid data')
  }

  const { items } = links

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)}>
        <body className="links" />
      </Metadata>
      <ArticleContainer>
        <ArticleHeader title={formatMessage(messages.title)} />
        <LinksContainer>
          {items.map(({ name, url }) => (
            <li key={url}>
              <Link to={url} title={name}>{name}</Link>
            </li>
          ))}
        </LinksContainer>
      </ArticleContainer>
    </Container>
  )
}

export interface LinksLinkItem {
  name: string
  url: string
}

type LinksProps = LinksItemQuery

export default Links
