import type { FunctionComponent, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'

import * as styles from './styles.module.scss'

import type { ArticleItem } from 'components/Article'
import Link from 'components/Link'

const isTag = (tag: Queries.TagFragment | undefined): tag is Queries.TagFragment => Boolean(tag?.name)

const ArticleAttribute: FunctionComponent<ArticleAttributeProps> = ({
  article: {
    attributes: {
      created,
      category,
      tags,
    },
  },
}) => {
  const { formatDate } = useIntl()

  return (
    <>
      {category ? (
        <span className={styles.item}>
          <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} /><Link className={styles.link} to={category.path}>{category.name}</Link>
        </span>
      ) : null}
      {tags?.filter(isTag).length ? (
        <span className={styles.item}>
          <FontAwesomeIcon className={styles.icon} icon={faTags} />
          {tags
            .filter(isTag)
            .map(({ name, slug }) => <Link key={slug} className={styles.link} to={`/tag/${slug}`}>{name}</Link>)
            .reduce<ReactNode[]>((el, curr) => el.length ? [ el, ', ', curr ] : [ curr ], [])}
        </span>
      ) : null}
      {typeof created === 'string' ? (
        <span
          className={styles.item}
          title={formatDate(new Date(created), {
            year: 'numeric',
            month: 'narrow',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        >
          <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
          {formatDate(new Date(created), {
            year: 'numeric',
            month: 'narrow',
            day: 'numeric',
          })}
        </span>
      ) : null}
    </>
  )
}

export interface ArticleAttributeProps {
  article: {
    attributes: Pick<ArticleItem['attributes'], 'category' | 'created' | 'tags'>
  }
}

export default ArticleAttribute
