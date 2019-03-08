import React from 'react'
import { injectIntl } from 'react-intl'

import messages from './messages'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

const Links = injectIntl<LinksProps>(({
  links: {
    items,
  },
  intl: {
    formatMessage,
  },
}) => (
  <Container>
    <Metadata title={formatMessage(messages.title)}>
      <body className="links" />
    </Metadata>
    <ArticleContainer>
      <ArticleHeader title={formatMessage(messages.title)} />
      <ul>
        {items.map(({ name, url }, index) => (
          <li key={index}>
            <Link to={url} title={name}>{name}</Link>
          </li>
        ))}
      </ul>
    </ArticleContainer>
  </Container>
))

export interface LinksLinkItem {
  name: string
  url: string
}

interface LinksProps {
  links: {
    items: LinksLinkItem[]
  }
}

export default Links
