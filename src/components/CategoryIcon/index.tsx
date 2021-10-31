import type { FunctionComponent } from 'react'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

import Link from 'components/Link'
import computers from '../../assets/computers.svg'
import gadgets from '../../assets/gadgets.svg'
import programming from '../../assets/programming.svg'
import pspprogramming from '../../assets/pspprogramming.svg'
import soarer from '../../assets/soarer.svg'
import softwares from '../../assets/softwares.svg'
import windows from '../../assets/windows.svg'

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
  category?: GatsbyTypes.CategoryFragment | null
}

export default CategoryIcon
