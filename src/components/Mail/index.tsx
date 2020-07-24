import React, { FormEvent, FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react'
import { Alert, Button, FormControl, FormGroup } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'

import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'
import messages from './messages'

const ContactNotice = styled(Alert)`
  text-align: center;
`

const Required = styled.span`
  color: red;
`

const StatusArea = styled.div`
  margin-bottom: 10px;
`

const AcceptedIcon = styled(FontAwesomeIcon)`
  color: #009688;
  margin-right: 5px;
`

const ErrorIcon = styled(FontAwesomeIcon)`
  color: #e11011;
  margin-right: 5px;
`

const ProcessingIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

const Input = styled(FormControl)`
  font-size: 16px;
  resize: vertical;
`

const LabelWrapper = styled.label`
  display: block;
`

const LabelTitle = styled.span`
  display: inline-block;
  margin-bottom: 5px;
`

const SubmissionContainer = styled.div`
  text-align: center;
`

const Label: FunctionComponent<MailLabelProps> = ({
  title,
  children,
  required,
}) => {
  const { formatMessage } = useIntl()

  return (
    <LabelWrapper>
      <LabelTitle>
        {title}
      </LabelTitle>
      {required ? <Required>{formatMessage(messages.required)}</Required> : null}
      {children}
    </LabelWrapper>
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

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    const form = new FormData(e.currentTarget)
    form.append('g-recaptcha-response', token)

    e.preventDefault()
    e.stopPropagation()

    setStatus('sending')

    try {
      await fetch(siteApi, {
        method: 'POST',
        body: form,
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      throw err
    }
  }, [ siteApi, token ])

  useEffect(() => {
    loadReCaptcha(siteKey)
  }, [ siteKey ])

  useEffect(() => {
    setReadOnly(status === 'sending' || status === 'sent')
  }, [ status ])

  return (
    <Container>
      <Metadata title={formatMessage(messages.title)}>
        <body data-recaptcha="" />
      </Metadata>
      <ArticleContainer>
        <ArticleHeader title={formatMessage(messages.title)} />
        <ContactNotice variant="info">
          {formatMessage(messages.contact_me_on_sns)}
          <br />
          <FormattedMessage {...messages.contact_me_from_about} values={{
            about: <Link to="/about">{formatMessage(messages.about)}</Link>,
          }} />
        </ContactNotice>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label required title={formatMessage(messages.name)}>
              <Input name="name" size="sm" required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label title={formatMessage(messages.mail)}>
              <Input name="email" size="sm" readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label required title={formatMessage(messages.subject)}>
              <Input name="subject" size="sm" required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label required title={formatMessage(messages.message)}>
              <Input name="body" as="textarea" cols={40} rows={10} required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <ReCaptcha action="mail" sitekey={siteKey} verifyCallback={setToken} />
          <SubmissionContainer>
            {status === 'sent' ? (
              <StatusArea>
                <AcceptedIcon icon={faCheck} />
                {formatMessage(messages.submission_accepted)}
              </StatusArea>
            ) : status === 'sending' ? (
              <StatusArea>
                <ProcessingIcon icon={faCircleNotch} spin />
                {formatMessage(messages.submission_processing)}
              </StatusArea>
            ) : (
              <>
                {status === 'error' ? (
                  <StatusArea>
                    <ErrorIcon icon={faTimes} />
                    {formatMessage(messages.submission_error)}
                  </StatusArea>
                ) : null}
                <Button type="submit" variant="primary" disabled={!token}>
                  {formatMessage(messages.send)}
                </Button>
              </>
            )}
          </SubmissionContainer>
        </form>
      </ArticleContainer>
    </Container>
  )
}

interface MailLabelProps {
  required?: true
  title: ReactNode
}

export default Mail
