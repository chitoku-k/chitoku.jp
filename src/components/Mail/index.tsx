import React, { FormEvent, FunctionComponent, useEffect, useState } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import messages from './messages'

const Required = styled.span`
  color: red;
`

const StatusArea = styled.div`
  margin-bottom: 10px;
`

const AcceptedIcon = styled(FontAwesome)`
  color: #009688;
  margin-right: 5px;
`

const ErrorIcon = styled(FontAwesome)`
  color: #e11011;
  margin-right: 5px;
`

const ProcessingIcon = styled(FontAwesome)`
  margin-right: 5px;
`

const Input = styled(Bootstrap.FormControl)`
  font-size: 16px;
  resize: vertical;
`

const Label: FunctionComponent<MailLabelProps> = ({
  children,
  required,
}) => {
  const { formatMessage } = useIntl()

  return (
    <label>
      {children}
      {required ? <Required>{formatMessage(messages.required)}</Required> : null}
    </label>
  )
}

type Status = '' | 'sending' | 'sent' | 'error'

const Mail: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  const [ token, setToken ] = useState('')
  const [ status, setStatus ] = useState('' as Status)
  const [ readOnly, setReadOnly ] = useState(false)

  const siteApi = process.env.GATSBY_MAIL_API as string
  const siteKey = process.env.GATSBY_MAIL_SITE_KEY as string

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    const form = new FormData()
    for (const name of ['name', 'email', 'subject', 'body']) {
      const elm = e.currentTarget.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
      form.append(name, elm.value)
    }
    form.append('g-recaptcha-response', token)

    e.preventDefault()
    e.stopPropagation()

    setStatus('sending')

    try {
      await fetch(siteApi, {
        method: 'POST',
        body: form,
      }).then(
        res => res.json(),
        res => res.json(),
      )
      setStatus('sent')
    } catch (e) {
      setStatus('error')
      throw e
    }
  }

  useEffect(() => {
    loadReCaptcha(siteKey)
  }, [])

  useEffect(() => {
    setReadOnly(status === 'sending' || status === 'sent')
  }, [ status ])

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)}>
        <body data-recaptcha="" />
      </Metadata>
      <ArticleContainer className="mail">
        <ArticleHeader title={formatMessage(messages.title)} />
        <Bootstrap.Alert bsStyle="info" className="text-center">
          {formatMessage(messages.contact_me_on_sns)}
          <br />
          <FormattedMessage {...messages.contact_me_from_about} values={{
            about: <Link to="/about">{formatMessage(messages.about)}</Link>,
          }} />
        </Bootstrap.Alert>
        <form onSubmit={onSubmit}>
          <Bootstrap.FormGroup>
            <Label required>{formatMessage(messages.name)}</Label>
            <Input name="name" size={40} required readOnly={readOnly} />
          </Bootstrap.FormGroup>
          <Bootstrap.FormGroup>
            <Label>{formatMessage(messages.mail)}</Label>
            <Input name="email" size={40} readOnly={readOnly} />
          </Bootstrap.FormGroup>
          <Bootstrap.FormGroup>
            <Label required>{formatMessage(messages.subject)}</Label>
            <Input name="subject" size={40} required readOnly={readOnly} />
          </Bootstrap.FormGroup>
          <Bootstrap.FormGroup>
            <Label required>{formatMessage(messages.message)}</Label>
            <Input name="body" componentClass="textarea" cols={40} rows={10} required readOnly={readOnly} />
          </Bootstrap.FormGroup>
          <ReCaptcha action="mail" sitekey={siteKey} verifyCallback={setToken} />
          <div className="text-center">
            {status === 'sent' ? (
              <StatusArea>
                <AcceptedIcon name="check" />
                {formatMessage(messages.submission_accepted)}
              </StatusArea>
            ) : status === 'sending' ? (
              <StatusArea>
                <ProcessingIcon name="circle-o-notch" spin />
                {formatMessage(messages.submission_processing)}
              </StatusArea>
            ) : (
              <>
                {status === 'error' ? (
                  <StatusArea>
                    <ErrorIcon name="remove" />
                    {formatMessage(messages.submission_error)}
                  </StatusArea>
                ) : null}
                <Bootstrap.Button type="submit" bsStyle="primary" disabled={!token}>
                  {formatMessage(messages.send)}
                </Bootstrap.Button>
              </>
            )}
          </div>
        </form>
      </ArticleContainer>
    </Container>
  )
}

interface MailLabelProps {
  required?: true
}

export default Mail
