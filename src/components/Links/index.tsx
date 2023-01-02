import type { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'

import Metadata from 'components/Metadata'
import Link from 'components/Link'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

const Links: FunctionComponent<LinksProps> = ({ links }) => {
  const { formatMessage } = useIntl()

  if (!links) {
    throw new Error('Invalid data')
  }

  const { items } = links

  return (
    <Metadata title={formatMessage(messages.title)}>
      <ArticleContainer>
        <ArticleHeader title={formatMessage(messages.title)} />
        <ul className={styles.container}>
          {items.map(({ name, url }) => (
            <li key={url}>
              <Link to={url} title={name}>{name}</Link>
            </li>
          ))}
        </ul>
      </ArticleContainer>
    </Metadata>
  )
}

export interface LinksLinkItem {
  name: string
  url: string
}

type LinksProps = Queries.LinksItemQuery

export default Links
