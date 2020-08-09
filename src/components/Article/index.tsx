import React, { FunctionComponent, ReactNode } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'

import messages from './messages'
import styles from './styles.module.scss'
import { ArticleFragment, ArticleQuery } from 'graphql-types'

import ArticleBody, { ArticleComponentCollection } from 'components/ArticleBody'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import { PaginationContainer, SimplePagination } from 'components/Pagination'
import PspSdkFunction from 'components/PspSdkFunction'
import PspSdkMacro from 'components/PspSdkMacro'
import TwitterTweet from 'components/TwitterTweet'

export const getClassNameFromPath = (path: string): string => `page${path.replace(/[/]/ug, '-').replace(/-$/u, '')}`

const isTag = (tag: ArticleTagItem | null): tag is ArticleTagItem => Boolean(tag?.name)

const withArticle = (
  article: ArticleItem,
  components: ArticleComponentCollection,
): ArticleComponentCollection => Object.entries(components)
  .reduce<ArticleComponentCollection>((prev, [ name, Component ]) => ({
  ...prev,
  [name]: function InjectArticle(props: ArticleWrapper) {
    return (
      <Component {...props} article={article} />
    )
  },
}), {})

const Article: FunctionComponent<ArticleProps> = ({
  children,
  components = {},
  article,
  prev,
  next,
}) => {
  const { formatMessage, formatDate } = useIntl()
  const {
    path,
    attributes: {
      title,
      created,
      navigation,
      category,
      tags,
    },
    htmlAst,
    excerptAst,
    excerpted,
  } = article

  // TODO: Make default components injectable
  Object.assign(components, {
    'pspsdk-function': PspSdkFunction,
    'pspsdk-macro': PspSdkMacro,
    'twitter-tweet': TwitterTweet,
    a: Link,
  })

  return (
    <>
      <ArticleContainer className={getClassNameFromPath(path)}>
        <ArticleHeader title={<Link to={path}>{title}</Link>}>
          <div className={styles.headerAttribute}>
            {category ? (
              <span className={styles.headerAttributeItem}>
                <FontAwesomeIcon className={styles.headerAttributeIcon} icon={faFolderOpen} />
                <Link className={styles.headerAttributeLink} to={category.path}>{category.name}</Link>
              </span>
            ) : null}
            {tags?.filter(isTag).length ? (
              <span className={styles.headerAttributeItem}>
                <FontAwesomeIcon className={styles.headerAttributeIcon} icon={faTags} />
                {tags
                  .filter(isTag)
                  .map(({ name, slug }) => <Link key={slug} className={styles.headerAttributeLink} to={`/tag/${slug}`}>{name}</Link>)
                  .reduce<ReactNode[]>((el, curr) => el.length ? [ el, ', ', curr ] : [ curr ], [])}
              </span>
            ) : null}
            {created ? (
              <span className={styles.headerAttributeItem} title={formatDate(new Date(created), {
                year: 'numeric',
                month: 'narrow',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}>
                <FontAwesomeIcon className={styles.headerAttributeIcon} icon={faCalendar} />
                {formatDate(new Date(created), {
                  year: 'numeric',
                  month: 'narrow',
                  day: 'numeric',
                })}
              </span>
            ) : null}
          </div>
        </ArticleHeader>
        {navigation ? (
          <Navbar className={styles.navbar} bg="light">
            <Nav className={styles.nav} as="ul">
              {navigation.map(item => (
                <NavItem key={item.name} className={styles.navItem} {...item} style={{ width: `calc(100% / ${navigation.length})` }} />
              ))}
            </Nav>
          </Navbar>
        ) : null}
        <ArticleBody ast={excerptAst ?? htmlAst ?? null} components={withArticle(article, components)} />
        {excerpted && excerptAst ? (
          <div className={styles.readMoreContainer}>
            <Link className={styles.readMoreButton} to={path}>{formatMessage(messages.more)}</Link>
          </div>
        ) : null}
        {children}
      </ArticleContainer>
      {prev || next ? (
        <ArticleContainer>
          <PaginationContainer>
            <SimplePagination
              prev={prev ? { title: prev.attributes.title, to: prev.path } : null}
              next={next ? { title: next.attributes.title, to: next.path } : null} />
          </PaginationContainer>
        </ArticleContainer>
      ) : null}
    </>
  )
}

export interface ArticleItem extends ArticleFragment {
  htmlAst?: ArticleAstNode
  excerptAst?: ArticleAstNode
}

export type ArticleAstNode = null | ArticleAstCommentNode | ArticleAstElementNode | ArticleAstTextNode

export interface ArticleAstCommentNode {
  type: 'comment'
  value: string
}

export interface ArticleAstElementNode {
  type: 'element'
  children: ArticleAstNode[]
  properties: { [key: string]: unknown }
  tagName: string
}

export interface ArticleAstTextNode {
  type: 'text'
  value: string
}

export interface ArticleCategoryItem {
  name: string
  path: string
  thumbnail: string | null
}

export interface ArticleTagItem {
  name: string
  slug: string
}

export interface ArticleWrapper {
  article: ArticleItem
}

interface ArticleProps extends ArticleWrapper, Partial<Omit<ArticleQuery, keyof ArticleWrapper>> {
  components?: ArticleComponentCollection
}

export default Article
