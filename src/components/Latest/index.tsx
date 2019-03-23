import React from 'react'
import { injectIntl } from 'react-intl'

import messages from './messages'
import Metadata from 'components/Metadata'
import Container from 'components/Container'
import Article, { ArticleItem } from 'components/Article'

const Latest = injectIntl<LatestProps>(({
  items,
  intl: {
    formatMessage,
  },
}) => (
  <Container>
    <Metadata title={formatMessage(messages.title)} />
    {items.map(({ article }, index) => (
      <Article key={index} article={article} />
    ))}
  </Container>
))

export interface LatestProps {
  items: {
    article: ArticleItem
  }[]
}

export default Latest
