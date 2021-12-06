import clsx from 'clsx'
import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'

import * as styles from './styles.module.scss'

const ArticleContainer: FunctionComponent<ComponentPropsWithoutRef<'article'>> = ({
  className,
  ...rest
}) => (
  <article className={clsx(styles.container, className)} {...rest} />
)

export default ArticleContainer
