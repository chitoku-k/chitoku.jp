import type { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react'
import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'

const ArticleContainer: FunctionComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  ref,
  className,
  ...rest
}) => (
  <article className={clsx(styles.container, className)} {...rest} />
)

export default ArticleContainer
