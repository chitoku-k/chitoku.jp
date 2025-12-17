import type { FunctionComponent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'

import Link from 'components/Link'

const Footer: FunctionComponent = () => {
  const { formatMessage } = useIntl()
  const repositoryName = process.env.GATSBY_REPOSITORY_NAME
  const repositoryUrl = process.env.GATSBY_REPOSITORY_URL

  return (
    <footer className={styles.footer}>
      {repositoryName && repositoryUrl ? (
        <FormattedMessage
          {...messages.copyright}
          values={{
            link: <Link className={styles.link} to={repositoryUrl}>{repositoryName}</Link>,
            license: <Link className={styles.link} to="/licenses.txt">{formatMessage(messages.license)}</Link>,
          }}
        />
      ) : (
        <FormattedMessage
          {...messages.copyright}
          values={{
            link: null,
            license: <Link className={styles.link} to="/licenses.txt">{formatMessage(messages.license)}</Link>,
          }}
        />
      )}
    </footer>
  )
}

export default Footer
