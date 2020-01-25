import React, { FunctionComponent, ReactNode } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

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

export const getClassNameFromPath = (path: string): string => `page${path.replace(/\//ug, '-').replace(/-$/u, '')}`

const ArticleHeaderAttributes = styled.p`
  min-height: 0.5em;
  text-align: right;
  color: #333;
  margin: 4px 0 0 0;
  padding: 0;
`

const ArticleHeaderAttributeIcon = styled(FontAwesome)`
  margin-right: 0.2em;
`

const ArticleHeaderAttributeItem = styled.span`
  & + & {
    display: inline-block;
    margin-left: 0.8em;
  }
`

const ArticleHeaderAttributeLink = styled(Link)`
  color: #333;
`

const ArticleNavbar = styled(Navbar)`
  border: none;
  border-radius: 0;
  .container {
    width: 100%;
    padding: 0;
  }
`

const ArticleNav = styled(Nav)`
  &.navbar-nav.nav {
    float: none;
    margin: 0;
    > li {
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      ${media.lessThan('sp')`
        width: 100% !important;
        display: block;
        text-align: left;
      `}
    }
    > li > a {
      &:hover,
      &:focus {
        background-color: #ececec;
      }
    }
  }
`

const ArticleNavItem = styled(NavItem)`
  .navbar-nav.nav > & > a {
    &,
    &:hover,
    &:focus {
      color: #777;
    }
  }
  .navbar-nav.nav > &.active a {
    color: #555;
  }
`

const ReadMoreContainer = styled.div`
  margin-top: 15px;
  text-align: right;
`

const ReadMoreButton = styled(Link)`
  display: inline-block;
  padding: 4px 16px;
  background-color: #e11010;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background: #a30c0c;
    color: white;
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
  article: {
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
  },
  prev,
  next,
}) => {
  const { formatMessage, formatDate } = useIntl()

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
                <ArticleHeaderAttributeIcon name="folder-open-o" />
                <ArticleHeaderAttributeLink to={category.path}>{category.name}</ArticleHeaderAttributeLink>
              </ArticleHeaderAttributeItem>
            ) : null}
            {tags?.filter(isTag).length ? (
              <ArticleHeaderAttributeItem>
                <ArticleHeaderAttributeIcon name="tags" />
                {tags
                  .filter(isTag)
                  .map(({ name, slug }) => <ArticleHeaderAttributeLink key={slug} to={`/tag/${slug}`}>{name}</ArticleHeaderAttributeLink>)
                  .reduce((el, curr) => el.length ? [ el, ', ', curr ] : [ curr ], [] as ReactNode[])}
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
                <ArticleHeaderAttributeIcon name="calendar-o" />
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
          <ArticleNavbar>
            <ArticleNav>
              {navigation.map(item => (
                <ArticleNavItem key={item.name} {...item} style={{ width: `calc(100% / ${navigation.length})` }} />
              ))}
            </ArticleNav>
          </ArticleNavbar>
        ) : null}
        <ArticleBody ast={excerptAst ?? htmlAst ?? {}} components={withArticle(article, components)} />
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
              className="simple-pagination"
              prev={prev ? { title: prev.attributes.title, to: prev.path } : null}
              next={next ? { title: next.attributes.title, to: next.path } : null} />
          </PaginationContainer>
        </ArticleContainer>
      ) : null}
    </>
  )
}

export interface ArticleItem extends ArticleFragment {
  htmlAst?: {}
  excerptAst?: {}
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

interface ArticleProps extends ArticleWrapper, Partial<Omit<ArticleQuery, 'article'>> {
  components?: ArticleComponentCollection
}

export default Article
