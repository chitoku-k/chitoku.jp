import type { FunctionComponent } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import type { Root } from 'hast'

import messages from './messages'
import * as styles from './styles.module.scss'

import ArticleBody from 'components/ArticleBody'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'

const About: FunctionComponent<AboutProps> = ({
  about,
  introduction,
}) => {
  const { formatMessage } = useIntl()
  if (!about) {
    throw new Error('Invalid data')
  }

  return (
    <ArticleContainer className={styles.container}>
      <ArticleHeader title={formatMessage(messages.title)} />
      <Row>
        <Col md={3} lg={2}>
          <div className={styles.iconContainer}>
            <img className={styles.icon} src={about.icon.src} />
            <br />
            <small>
              <FormattedMessage
                {...messages.icon}
                values={{
                  name: <Link to={about.icon.url}>{about.icon.name}</Link>,
                }}
              />
            </small>
          </div>
        </Col>
        <Col md={9} lg={10}>
          <Table className={styles.table}>
            <tbody>
              <tr>
                <th>{formatMessage(messages.name)}</th>
                <td>{about.name}</td>
              </tr>
              <tr>
                <th>{formatMessage(messages.occupation)}</th>
                <td>{about.occupation}</td>
              </tr>
              <tr>
                <th>{formatMessage(messages.interests)}</th>
                <td>
                  {about.interests.map(({ type, items }) => (
                    <div key={type}>
                      {type}
                      <ul>
                        {items.map(item => (
                          <li key={item.name}>
                            {item.url ? (
                              <Link to={item.url}>{item.name}</Link>
                            ) : item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <th>{formatMessage(messages.mail)}</th>
                <td>
                  <Link to="/mail">{formatMessage(messages.mail)}</Link>
                </td>
              </tr>
              {about.contacts.map(contact => (
                <tr key={contact.service}>
                  <th>{contact.service}</th>
                  <td>
                    {contact.accounts.map(account => (
                      <div key={account.name}>
                        {account.url ? (
                          <Link to={account.url}>{account.name}</Link>
                        ) : null}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
              <tr>
                <th>{formatMessage(messages.introduction)}</th>
                <td>
                  <ArticleBody ast={(introduction?.markdown?.htmlAst ?? null) as unknown as Root} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </ArticleContainer>
  )
}

export const Head: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <Metadata title={formatMessage(messages.title)} />
  )
}

type AboutProps = Queries.AboutItemQuery

export default About
