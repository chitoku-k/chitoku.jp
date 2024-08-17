import type { FormEvent, FunctionComponent, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Turnstile, { useTurnstile } from 'react-turnstile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

import messages from './messages'
import * as styles from './styles.module.scss'

import Metadata from 'components/Metadata'
import Link from 'components/Link'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

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

type Status = '' | 'error' | 'sending' | 'sent'

const send = async (form: FormData): Promise<void> => {
  const siteApi = process.env.GATSBY_MAIL_API
  if (!siteApi) {
    throw new Error('Invalid env')
  }

  const response = await fetch(siteApi, {
    method: 'POST',
    body: form,
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
}

const Mail: FunctionComponent = () => {
  const { formatMessage } = useIntl()
  const turnstile = useTurnstile()

  const [ token, setToken ] = useState('')
  const [ status, setStatus ] = useState('' as Status)
  const [ readOnly, setReadOnly ] = useState(false)

  const siteKey = process.env.GATSBY_MAIL_SITE_KEY

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget)

    e.preventDefault()
    e.stopPropagation()

    setStatus('sending')
    send(form)
      .then(
        () => setStatus('sent'),
        () => setStatus('error'),
      )
      .finally(() => {
        setToken('')
        turnstile.reset()
      })
  }, [ turnstile ])

  useEffect(() => {
    setReadOnly(status === 'sending' || status === 'sent')
  }, [ status ])

  return (
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
        <Form.Group className={styles.group}>
          <Label required title={formatMessage(messages.name)}>
            <Form.Control className={styles.input} inputMode="text" autoComplete="name" name="name" size="sm" required readOnly={readOnly} />
          </Label>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Label title={formatMessage(messages.mail)}>
            <Form.Control className={styles.input} inputMode="email" autoComplete="email" name="email" size="sm" readOnly={readOnly} />
          </Label>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Label required title={formatMessage(messages.subject)}>
            <Form.Control className={styles.input} inputMode="text" name="subject" size="sm" required readOnly={readOnly} />
          </Label>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Label required title={formatMessage(messages.message)}>
            <Form.Control className={styles.input} inputMode="text" name="body" as="textarea" cols={40} rows={10} required readOnly={readOnly} />
          </Label>
        </Form.Group>
        {siteKey ? (
          <Card className={styles.group}>
            <Card.Body className={styles.verification}>
              <Turnstile responseFieldName="g-recaptcha-response" action="mail" language="en" sitekey={siteKey} onVerify={setToken} refreshExpired="auto" />
            </Card.Body>
          </Card>
        ) : null}
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
  )
}

interface MailLabelProps {
  children?: ReactNode
  required?: true
  title: ReactNode
}

export const Head: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <Metadata title={formatMessage(messages.title)} />
  )
}

export default Mail
