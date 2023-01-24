import type { FunctionComponent, ReactNode } from 'react'
import { Slice } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'

import '../../styles/styles.scss'
import * as styles from './styles.module.scss'

const Layout: FunctionComponent<LayoutProps> = ({
  children,
}) => {
  const { pathname } = useLocation()

  return (
    <div className={styles.wrapper}>
      <Slice alias="header" />
      <Slice alias="navbar" location={{ pathname }} />
      {children}
      <Slice alias="footer" />
    </div>
  )
}

interface LayoutProps {
  children?: ReactNode
}

export default Layout
