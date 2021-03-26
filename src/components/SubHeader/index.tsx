import type { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

const SubHeader: FunctionComponent<SubHeaderProps> = ({
  className,
  ...rest
}) => (
  <h2 className={clsx(styles.title, className)} {...rest} />
)

type SubHeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export default SubHeader
