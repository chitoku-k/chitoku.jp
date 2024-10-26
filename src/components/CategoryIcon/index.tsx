import type { FunctionComponent } from 'react'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

import Link from 'components/Link'
import computers from '../../assets/computers.inline.svg'
import gadgets from '../../assets/gadgets.inline.svg'
import programming from '../../assets/programming.inline.svg'
import pspprogramming from '../../assets/pspprogramming.inline.svg'
import soarer from '../../assets/soarer.inline.svg'
import softwares from '../../assets/softwares.inline.svg'
import windows from '../../assets/windows.inline.svg'

const icons = {
  computers,
  gadgets,
  programming,
  pspprogramming,
  soarer,
  softwares,
  windows,
}

const CategoryIcon: FunctionComponent<CategoryIconProps> = ({
  category,
  to,
}) => {
  if (!category || !(category.thumbnail in icons)) {
    return (
      <div />
    )
  }

  // eslint-disable-next-line no-useless-assignment
  const ThumbnailIcon = icons[category.thumbnail as keyof typeof icons]
  return to ? (
    <Link to={to} className={clsx(styles.icon, styles[category.thumbnail as keyof typeof icons])}>
      <ThumbnailIcon viewBox="0 0 100 100" />
    </Link>
  ) : (
    <ThumbnailIcon viewBox="0 0 100 100" />
  )
}

export interface CategoryIconProps {
  to?: string
  category?: Queries.CategoryFragment | null
}

export default CategoryIcon
