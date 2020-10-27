import type { FormEvent, FunctionComponent, ReactNode } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, FormControl, FormGroup } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

import messages from './messages'
import styles from './styles.module.scss'

import Container from 'components/Container'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Metadata from 'components/Metadata'
import Link from 'components/Link'

const Label: FunctionComponent<MailLabelProps> = ({
  title,
  children,
  required,
}) => {
  const { formatMessage } = useIntl()

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        {title}
      </span>
      {required ? <span className={styles.required}>{formatMessage(messages.required)}</span> : null}
      {children}
    </div>
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
      const response = await fetch(siteApi, {
        method: 'POST',
        body: form,
      })
      if (!response.ok) {
        throw new Error(await response.text())
      }
      setStatus('sent')
    } catch (err: unknown) {
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
        <Alert className={styles.notice} variant="info">
          {formatMessage(messages.contact_me_on_sns)}
          <br />
          <FormattedMessage {...messages.contact_me_from_about} values={{
            about: <Link to="/about">{formatMessage(messages.about)}</Link>,
          }} />
        </Alert>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label required title={formatMessage(messages.name)}>
              <FormControl className={styles.input} name="name" size="sm" required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label title={formatMessage(messages.mail)}>
              <FormControl className={styles.input} name="email" size="sm" readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label required title={formatMessage(messages.subject)}>
              <FormControl className={styles.input} name="subject" size="sm" required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label required title={formatMessage(messages.message)}>
              <FormControl className={styles.input} name="body" as="textarea" cols={40} rows={10} required readOnly={readOnly} />
            </Label>
          </FormGroup>
          <ReCaptcha action="mail" sitekey={siteKey} verifyCallback={setToken} />
          <div className={styles.submission}>
            {status === 'sent' ? (
              <div className={styles.area}>
                <FontAwesomeIcon className={styles.accepted} icon={faCheck} />
                {formatMessage(messages.submission_accepted)}
              </div>
            ) : status === 'sending' ? (
              <div className={styles.area}>
                <FontAwesomeIcon className={styles.processing} icon={faCircleNotch} spin />
                {formatMessage(messages.submission_processing)}
              </div>
            ) : (
              <>
                {status === 'error' ? (
                  <div className={styles.area}>
                    <FontAwesomeIcon className={styles.error} icon={faTimes} />
                    {formatMessage(messages.submission_error)}
                  </div>
                ) : null}
                <Button type="submit" variant="primary" disabled={!token}>
                  {formatMessage(messages.send)}
                </Button>
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
  title: ReactNode
}

export default Mail
