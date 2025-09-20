import type { FunctionComponent, ReactNode } from 'react'
import type { MessageDescriptor } from 'react-intl'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLocation } from '@gatsbyjs/reach-router'

import messages from './messages'
import * as styles from './styles.module.scss'

import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'

const Contact: FunctionComponent<ContactProps> = ({
  message,
  service: {
    service,
    accounts,
  },
}) => (
  <FormattedMessage
    {...message}
    values={{
      service,
      account: (
        <span>
          {accounts
            .map(({ url, name }) => url ? <Link to={url} key={url}>{name}</Link> : name)
            .reduce<ReactNode[]>((prev, curr) => prev.length ? [ prev, ', ', curr ] : [ curr ], [])}
        </span>
      ),
    }}
  />
)

interface ContactProps {
  message: MessageDescriptor
  service: Queries.AboutYamlContacts
}

const NotFound: FunctionComponent<NotFoundProps> = ({ contacts }) => {
  const { formatMessage } = useIntl()
  const location = useLocation()

  if (!contacts) {
    throw new Error('Invalid data')
  }

  return (
    <ArticleContainer>
      <ArticleHeader title={formatMessage(messages.title)} />
      <p>
        {formatMessage(messages.description)}
        <br />
        <FormattedMessage
          {...messages.requested}
          values={{
            url: <code>{location.href}</code>,
          }}
        />
      </p>
      <p>
        {formatMessage(messages.try)}
      </p>
      <ul className={styles.tryList}>
        <li>
          <FormattedMessage
            {...messages.go_to_home}
            values={{
              home: <a href="/">{formatMessage(messages.home)}</a>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            {...messages.complain_to_administrator}
            values={{
              administrator: <a href="/mail">{formatMessage(messages.administrator)}</a>,
            }}
          />
        </li>
        <li>
          {formatMessage(messages.give_up)}
        </li>
        {contacts.items.filter(service => service.primary).map(service => (
          <li key={service.service}>
            <Contact message={messages.follow_me_on} service={service} />
          </li>
        ))}
      </ul>
    </ArticleContainer>
  )
}

export const Head: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <Metadata title={formatMessage(messages.title)} />
  )
}

type NotFoundProps = Queries.NotFoundItemQuery

export default NotFound
