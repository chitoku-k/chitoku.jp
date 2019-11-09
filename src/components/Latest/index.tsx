import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

import { LatestItemQuery } from 'graphql-types'
import messages from './messages'
import Metadata from 'components/Metadata'
import Container from 'components/Container'
import Article from 'components/Article'

const Latest: FunctionComponent<LatestProps> = ({
  items,
}) => {
  const { formatMessage } = useIntl()

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)} />
      {items.map(({ article }) => (
        <Article key={article.path} article={article} />
      ))}
    </Container>
  )
}

type LatestProps = LatestItemQuery['latest']

export default Latest
