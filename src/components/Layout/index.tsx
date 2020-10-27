import type { FunctionComponent } from 'react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import '../../styles/styles.scss'
import messages from 'translations/ja.yml'
import styles from './styles.module.scss'

import Search from 'components/Search'

const Layout: FunctionComponent = ({
  children,
}) => (
  <IntlProvider locale="ja" messages={messages}>
    <Search>
      <div className={styles.wrapper}>
        {children}
      </div>
    </Search>
  </IntlProvider>
)

export default Layout
