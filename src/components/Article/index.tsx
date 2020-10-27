import type { FunctionComponent, ReactNode } from 'react'
import React, { createContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'

import messages from './messages'
import styles from './styles.module.scss'
import type { ArticleFragment, ArticleQuery } from 'graphql-types'

import ArticleBody from 'components/ArticleBody'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import { PaginationContainer, SimplePagination } from 'components/Pagination'

export const getClassNameFromPath = (path: string): string => `page${path.replace(/[/]/ug, '-').replace(/-$/u, '')}`

const isTag = (tag: ArticleTagItem | null): tag is ArticleTagItem => Boolean(tag?.name)

const current: ArticleItem = {
  path: '',
  attributes: {
    title: '',
  },
  excerpted: false,
}
export const ArticleContext = createContext(current)

const Article: FunctionComponent<ArticleProps> = ({
  children,
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

  Object.assign(current, article)
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
        <ArticleBody ast={excerptAst ?? htmlAst ?? null} />
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
  properties: Record<string, unknown>
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

interface ArticleProps extends ArticleQuery {
  article: ArticleItem
}

export default Article
