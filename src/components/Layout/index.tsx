import type { FunctionComponent, ReactNode } from 'react'

import '../../styles/styles.scss'
import * as styles from './styles.module.scss'

const Layout: FunctionComponent<LayoutProps> = ({
  children,
}) => (
  <div className={styles.wrapper}>
    {children}
  </div>
)

interface LayoutProps {
  children?: ReactNode
}

export default Layout
