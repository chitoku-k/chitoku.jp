import React from 'react'
import { injectIntl } from 'react-intl'

import messages from './messages'

export default injectIntl(function Footer({
  intl: {
    formatMessage,
  },
}) {
  return (
    <footer className="text-center">{formatMessage(messages.copyright)}</footer>
  )
})
