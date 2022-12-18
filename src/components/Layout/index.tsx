import type { FunctionComponent, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

import '../../styles/styles.scss'
import messages from 'translations/ja.yml'
import * as styles from './styles.module.scss'

import Search from 'components/Search'

const Layout: FunctionComponent<LayoutProps> = ({
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

interface LayoutProps {
  children?: ReactNode
}

export default Layout
