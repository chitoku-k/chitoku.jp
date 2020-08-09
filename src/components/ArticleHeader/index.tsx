import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'

const ArticleHeader: FunctionComponent<ArticleHeaderProps & Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'title'>> = ({
  children,
  className,
  ref,
  title,
  ...rest
}) => (
  <div className={clsx(styles.header, className)} {...rest}>
    <h1 className={styles.title}>{title}</h1>
    {children}
  </div>
)

interface ArticleHeaderProps {
  title: ReactNode
}

export default ArticleHeader
