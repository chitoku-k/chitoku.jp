import React, { FunctionComponent, ReactNode } from 'react'
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl'
import { Location } from '@reach/router'
import styled from 'styled-components'

import { AboutYamlContacts, NotFoundItemQuery } from 'graphql-types'
import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import messages from './messages'

const TryList = styled.ul`
  line-height: 2.2 !important;
`

const Contact: FunctionComponent<ContactProps> = ({
  message,
  service: {
    service,
    accounts,
  },
}) => (
  <FormattedMessage {...message} values={{
    service,
    account: (
      <span>
        {accounts
          .map(({ url, name }) => url ? <Link to={url} key={url}>{name}</Link> : name)
          .reduce<ReactNode[]>((prev, curr) => prev.length ? [ prev, ', ', curr ] : [ curr ], [])}
      </span>
    ),
  }} />
)

interface ContactProps {
  message: MessageDescriptor
  service: AboutYamlContacts
}

const NotFound: FunctionComponent<NotFoundProps> = ({ contacts }) => {
  const { formatMessage } = useIntl()

  if (!contacts) {
    throw new Error('Invalid data')
  }

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)}>
        <body className="404" />
      </Metadata>
      <ArticleContainer>
        <ArticleHeader title={formatMessage(messages.title)} />
        <p>
          {formatMessage(messages.description)}
          <br />
          <Location>
            {({ location }) => (
              <FormattedMessage {...messages.requested} values={{
                url: <code>{location.href}</code>,
              }} />
            )}
          </Location>
        </p>
        <p>
          {formatMessage(messages.try)}
        </p>
        <TryList>
          <li>
            <FormattedMessage {...messages.go_to_home} values={{
              home: <a href="/">{formatMessage(messages.home)}</a>,
            }} />
          </li>
          <li>
            <FormattedMessage {...messages.complain_to_administrator} values={{
              administrator: <a href="/mail">{formatMessage(messages.administrator)}</a>,
            }} />
          </li>
          <li>
            {formatMessage(messages.give_up)}
          </li>
          {contacts.items.filter(service => service.primary).map(service => (
            <li key={service.service}>
              <Contact message={messages.follow_me_on} service={service} />
            </li>
          ))}
        </TryList>
      </ArticleContainer>
    </Container>
  )
}

type NotFoundProps = NotFoundItemQuery

export default NotFound
