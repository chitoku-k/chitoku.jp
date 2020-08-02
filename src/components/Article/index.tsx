import React, { FunctionComponent, ReactNode } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'

import { ArticleFragment, ArticleQuery } from 'graphql-types'
import messages from './messages'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import PspSdkFunction from 'components/PspSdkFunction'
import PspSdkMacro from 'components/PspSdkMacro'
import { PaginationContainer, SimplePagination } from 'components/Pagination'
import { media } from 'components/Layout'
import ArticleBody, { ArticleComponentCollection } from 'components/ArticleBody'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

export const getClassNameFromPath = (path: string): string => `page${path.replace(/[/]/ug, '-').replace(/-$/u, '')}`

const ArticleHeaderAttributes = styled.div`
  min-height: 0.5em;
  text-align: right;
  margin: 4px 0 0 0;
  padding: 0;
  color: var(--containers-color);
`

const ArticleHeaderAttributeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.2em;
`

const ArticleHeaderAttributeItem = styled.span`
  & + & {
    display: inline-block;
    margin-left: 0.8em;
  }
`

const ArticleHeaderAttributeLink = styled(Link)`
  &,
  &:hover {
    color: var(--containers-color);
  }
`

const ArticleNavbar = styled(Navbar)`
  border: none;
  border-radius: 0;
  padding: 0;
  background-color: var(--subnav-background) !important;
`

const ArticleNav = styled(Nav)`
  &.navbar-nav {
    width: 100%;
    flex-wrap: wrap;
    > li {
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      ${media.sm.down()} {
        width: 100% !important;
        display: block;
        text-align: left;
      }
    }
    > li > a {
      &:hover,
      &:focus {
        background-color: var(--subnav-hover);
      }
    }
  }
`

const ArticleNavItem = styled(NavItem)`
  .navbar-nav > & > a {
    &,
    &:hover,
    &:focus {
      color: var(--subnav-inactive);
    }
  }
  .navbar-nav > &.active a {
    background-color: var(--subnav-active);
    color: var(--subnav-color);
  }
`

const ReadMoreContainer = styled.div`
  margin-top: 15px;
  text-align: right;
`

const ReadMoreButton = styled(Link)`
  display: inline-block;
  padding: 4px 16px;
  background-color: var(--readmore-background);
  color: var(--readmore-color);
  transition: background-color 0.3s;
  &:hover {
    background: var(--readmore-hover);
    color: var(--readmore-color);
    text-decoration: none;
  }
`

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
    a: Link,
  })

  return (
    <>
      <ArticleContainer className={getClassNameFromPath(path)}>
        <ArticleHeader title={<Link to={path}>{title}</Link>}>
          <ArticleHeaderAttributes>
            {category ? (
              <ArticleHeaderAttributeItem>
                <ArticleHeaderAttributeIcon icon={faFolderOpen} />
                <ArticleHeaderAttributeLink to={category.path}>{category.name}</ArticleHeaderAttributeLink>
              </ArticleHeaderAttributeItem>
            ) : null}
            {tags?.filter(isTag).length ? (
              <ArticleHeaderAttributeItem>
                <ArticleHeaderAttributeIcon icon={faTags} />
                {tags
                  .filter(isTag)
                  .map(({ name, slug }) => <ArticleHeaderAttributeLink key={slug} to={`/tag/${slug}`}>{name}</ArticleHeaderAttributeLink>)
                  .reduce<ReactNode[]>((el, curr) => el.length ? [ el, ', ', curr ] : [ curr ], [])}
              </ArticleHeaderAttributeItem>
            ) : null}
            {created ? (
              <ArticleHeaderAttributeItem title={formatDate(new Date(created), {
                year: 'numeric',
                month: 'narrow',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}>
                <ArticleHeaderAttributeIcon icon={faCalendar} />
                {formatDate(new Date(created), {
                  year: 'numeric',
                  month: 'narrow',
                  day: 'numeric',
                })}
              </ArticleHeaderAttributeItem>
            ) : null}
          </ArticleHeaderAttributes>
        </ArticleHeader>
        {navigation ? (
          <ArticleNavbar bg="light">
            <ArticleNav as="ul">
              {navigation.map(item => (
                <ArticleNavItem key={item.name} {...item} style={{ width: `calc(100% / ${navigation.length})` }} />
              ))}
            </ArticleNav>
          </ArticleNavbar>
        ) : null}
        <ArticleBody ast={excerptAst ?? htmlAst ?? null} components={withArticle(article, components)} />
        {excerpted && excerptAst ? (
          <ReadMoreContainer>
            <ReadMoreButton to={path}>{formatMessage(messages.more)}</ReadMoreButton>
          </ReadMoreContainer>
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
