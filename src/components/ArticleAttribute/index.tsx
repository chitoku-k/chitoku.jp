import type { FunctionComponent, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'

import * as styles from './styles.module.scss'
import type { ArticleFragment } from 'graphql-types'

import type { ArticleTagItem } from 'components/Article'
import Link from 'components/Link'

const isTag = (tag: ArticleTagItem | null): tag is ArticleTagItem => Boolean(tag?.name)

const ArticleAttribute: FunctionComponent<ArticleAttributeProps> = ({
  article,
}) => {
  const { formatDate } = useIntl()
  const {
    attributes: {
      created,
      category,
      tags,
    },
  } = article

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
      {created ? (
        <span className={styles.item} title={formatDate(new Date(created), {
          year: 'numeric',
          month: 'narrow',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}>
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

interface ArticleAttributeProps {
  article: Pick<ArticleFragment, 'attributes'>
}

export default ArticleAttribute
