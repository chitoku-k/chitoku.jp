import type { FunctionComponent } from 'react'
import clsx from 'clsx'

import * as styles from './styles.module.scss'
import type { ArticleFragment } from 'typings/graphql-types'

import Link from 'components/Link'
import pspprogramming from '../../assets/pspprogramming.svg'
import soarer from '../../assets/soarer.svg'
import computers from '../../assets/computers.svg'
import windows from '../../assets/windows.svg'
import gadgets from '../../assets/psp-smartphone.svg'
import programming from '../../assets/programming.svg'

const icons: Icon = {
  pspprogramming,
  soarer,
  computers,
  windows,
  gadgets,
  programming,
}

const ArticleIcon: FunctionComponent<ArticleIconProps> = ({
  article,
}) => {
  const {
    path,
    attributes: {
      category,
    },
  } = article

  if (!category || !(category.thumbnail in icons)) {
    return (
      <div />
    )
  }

  const ThumbnailIcon = icons[category.thumbnail]
  return (
    <Link to={path} className={clsx(styles.icon, styles[category.thumbnail])}>
      <ThumbnailIcon viewBox="0 0 100 100" />
    </Link>
  )
}

type Icon = Record<string, React.ComponentType<React.SVGAttributes<Element>>>

interface ArticleIconProps {
  article: Omit<ArticleFragment, 'excerpted'>
}

export default ArticleIcon
