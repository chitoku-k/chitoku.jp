import type { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

const ArticleHeader: FunctionComponent<ArticleHeaderProps & Omit<ComponentPropsWithoutRef<'div'>, 'title'>> = ({
  children,
  className,
  title,
  ...rest
}) => (
  <div className={clsx(styles.header, className)} {...rest}>
    <h1 className={clsx(styles.title, styles.border)}>{title}</h1>
    {children}
  </div>
)

interface ArticleHeaderProps {
  title: ReactNode
}

export default ArticleHeader
