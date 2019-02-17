import React from 'react'
import { injectIntl } from 'react-intl'

import messages from '../Metadata/messages'
import Logo from '../../assets/logo.svg'

export default injectIntl(function Header({
  intl: {
    formatMessage,
  },
}) {
  return (
    <header id="header-container" className="container">
      <div id="header-title" className="pull-left">
        <h1>
          <a href="/">
            <Logo viewBox="0 0 330 33" width={400} />
          </a>
        </h1>
      </div>
    </header>
  )
})
