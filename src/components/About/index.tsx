import React from 'react'
import * as Bootstrap from 'react-bootstrap'
import { injectIntl, FormattedMessage } from 'react-intl'
import ImageZoom from 'react-medium-image-zoom'
import RehypeReact from 'rehype-react'
import styled from 'styled-components'

import { Container, ArticleContainer, ArticleHeader } from 'components/Layout'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import messages from './messages'

const IconContainer = styled.div`
  margin-bottom: .8em;
`

const Table = styled.table`
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`

const About = injectIntl<AboutProps>(function About({
  about,
  introduction,
  intl: {
    formatMessage,
  },
}) {
  const { Compiler } = new RehypeReact({
    createElement: React.createElement,
    components: {
      'historia-link': Link,
    },
  })

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)} />
      <ArticleContainer className="about">
        <ArticleHeader title={formatMessage(messages.title)} />
        <Bootstrap.Col sm={2}>
          <IconContainer className="text-center">
            <ImageZoom image={{
              src: about.icon.src,
              alt: '',
              style: {
                maxWidth: '100%',
                borderRadius: '4px',
                marginBottom: '.4em',
              },
            }} />
            <br />
            <small>
              <FormattedMessage {...messages.icon} values={{
                name: <Link to={about.icon.url}>{about.icon.name}</Link>,
              }} />
            </small>
          </IconContainer>
        </Bootstrap.Col>
        <Bootstrap.Col sm={10}>
          <Table className="table">
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
                        {items.map((item, index) => (
                          <li key={index}>
                            {item.url ? (
                              <Link to={item.url}>{item.name}</Link>
                            ) : (
                              item.name
                            )}
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
              {about.contacts.map((contact, index) => (
                <tr key={index}>
                  <th>{contact.service}</th>
                  <td>
                    {contact.accounts.map((account, index) => (
                      <div key={index}>
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
                <td>{Compiler(introduction.markdown.htmlAst)}</td>
              </tr>
            </tbody>
          </Table>
        </Bootstrap.Col>
        <Bootstrap.Clearfix />
      </ArticleContainer>
    </Container>
  )
})

interface AboutProps {
  about: AboutItem
  introduction: AboutIntroductionItem
}

interface AboutLink {
  name: string
  url: string | null
}

export interface AboutContactItem {
  service: string
  primary: true | null
  accounts: AboutLink[]
}

export interface AboutItem {
  title: string
  name: string
  occupation: string
  icon: {
    name: string
    url: string
    src: string
  }
  interests: {
    type: string
    items: AboutLink[]
  }[]
  contacts: AboutContactItem[]
}

export interface AboutIntroductionItem {
  markdown: {
    htmlAst: {}
  }
}

export default About
