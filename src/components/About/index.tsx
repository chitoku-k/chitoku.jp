import React, { FunctionComponent, useMemo } from 'react'
import { Table as BootstrapTable, Col, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import RehypeReact from 'rehype-react'
import styled from 'styled-components'

import { AboutItemQuery } from 'graphql-types'
import { media } from 'components/Layout'
import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import messages from './messages'

const AboutContainer = styled(ArticleContainer)`
  p {
    font-size: inherit;
    padding: 0;
    margin-bottom: 0;
  }
  div {
    ${media.md.down()} {
      padding: 0;
    }
  }
  p,
  div,
  li {
    font-size: 11pt;
    line-height: 1.8;
  }
  img {
    ${media.md.down()} {
      margin-bottom: 20px;
    }
    ${media.sm.down()} {
      max-width: 50% !important;
    }
  }
  td {
    ${media.md.down()} {
      padding-right: 0;
    }
  }
`

const IconContainer = styled.div`
  margin-bottom: 0.8em;
  text-align: center;
`

const Icon = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 0.4em;
  width: 96px;
  height: 96px;
`

const Table = styled(BootstrapTable)`
  border-bottom-color: var(--table-border);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  margin: 0;
  width: auto;
  > tbody > tr {
    > th,
    > td {
      white-space: normal;
    }
  }
`

const About: FunctionComponent<AboutProps> = ({
  about,
  introduction,
}) => {
  const { formatMessage } = useIntl()
  const content = useMemo(() => {
    const { Compiler: compiler } = new RehypeReact({
      createElement: React.createElement,
      components: {
        'historia-link': Link,
      },
    })

    return compiler(introduction?.markdown?.htmlAst)
  }, [ introduction?.markdown?.htmlAst ])

  if (!about) {
    throw new Error('Invalid data')
  }

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)} />
      <AboutContainer>
        <ArticleHeader title={formatMessage(messages.title)} />
        <Row>
          <Col sm={2}>
            <IconContainer>
              <Icon src={about.icon.src} />
              <br />
              <small>
                <FormattedMessage {...messages.icon} values={{
                  name: <Link to={about.icon.url}>{about.icon.name}</Link>,
                }} />
              </small>
            </IconContainer>
          </Col>
          <Col sm={10}>
            <Table>
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
                  <td>{content}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </AboutContainer>
    </Container>
  )
}

type AboutProps = AboutItemQuery

export default About
