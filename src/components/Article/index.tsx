import React, { ReactNode, ComponentType } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import RehypeReact from 'rehype-react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import ImageZoomWrapper from 'components/ImageZoomWrapper'
import { NavigationLinkItem } from 'components/Navbar'
import { PaginationContainer, SimplePagination } from 'components/Pagination'
import { media } from 'components/Layout'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'

export const getPathFromArticleFile = (file: ArticleFile): string => (
  `/${file.directory.replace(/^posts\//, '')}/${file.name === 'index' ? '' : file.name}`
)

export const getClassNameFromArticleFile = (file: ArticleFile): string => (
  [
    'page',
    file.directory.replace(/^posts\//, '').replace(/\//g, '-'),
    ...(file.name === 'index' ? [] : [ file.name ]),
  ].join('-')
)

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

const ArticleNavbar = styled(Bootstrap.Navbar)`
  border: none;
  border-radius: 0;
  .container {
    width: 100%;
    padding: 0;
  }
`

const ArticleNav = styled(Bootstrap.Nav)`
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

const ArticleBody = styled.div`
  h2 {
    font-size: 140%;
    margin: 56px 0 16px 0;
    padding: 9px 15px 7px;
    background: #efefef;
    color: #444;
    border: 1px solid #d4d4d4;
    &.no-border {
      margin: 0;
      padding: 0;
      background: none;
      border: none;
    }
    ${media.lessThan('tablet')`
      font-size: 140%;
      padding: 7px 12px;
    `}
    ${media.lessThan('sp')`
      font-size: 120%;
      margin-top: 20px;
      padding: 5px 0;
      background: none;
      border-width: 0 0 1px 0;
    `}
  }
  h3 {
    font-size: 120%;
    border-bottom: 1px solid #d4d4d4;
    margin: 50px 0 15px;
    padding: 0 16px 5px;
    ${media.lessThan('tablet')`
      padding-left: 13px;
      padding-right: 13px;
    `}
    ${media.lessThan('sp')`
      padding-left: 6px;
      padding-right: 6px;
    `}
  }
  p {
    font-size: 11pt;
    line-height: 1.8;
  }
  > div {
    > p {
      padding: 0 16px;
      ${media.lessThan('tablet')`
        padding: 0 13px;
        font-size: 14px;
      `}
      ${media.lessThan('sp')`
        padding: 0;
      `}
    }
    > p,
    > ul,
    > ol {
      margin-bottom: 1.8em;
    }
  }
  ul,
  ol {
    font-size: 11pt;
    font-variant-numeric: tabular-nums;
    line-height: 1.8;
    p {
      margin-bottom: 0;
    }
    pre {
      margin: 5px 0 0;
    }
  }
  pre {
    margin-left: 12px;
    margin-bottom: 1.8em;
    ${media.lessThan('sp')`
      margin-left: 0;
    `}
  }
  img {
    margin-top: 0.4em;
    &:not(.gatsby-resp-image-image) {
      max-width: 100%;
    }
  }
  table:not(.highlight) {
    margin: 20px 0 10px;
    width: 100%;
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > td,
        > th {
          padding: 8px 16px;
          line-height: 1.42857;
          vertical-align: top;
          border-top: 1px solid #ddd;
          p {
            padding: 0;
            margin-bottom: 0;
          }
          ${media.lessThan('sp')`
            white-space: nowrap;
          `}
        }
        &:last-child {
          > td,
          > th {
            border-bottom: 1px solid #ddd;
          }
        }
      }
    }
    ${media.lessThan('sp')`
      display: block;
      overflow: auto;
      margin: 0 10px;
    `}
  }
  .footnote-ref {
    &::before {
      content: '[';
    }
    &::after {
      content: ']';
    }
  }
  .footnotes {
    hr,
    .footnote-backref {
      display: none;
    }
  }
  .wide-list {
    li {
      margin-bottom: 1.8em;
      &:first-child {
        margin-top: 1.4em;
      }
    }
  }
  .alert {
    & + h2 {
      margin-top: 0;
    }
    > p {
      padding: 0;
      margin-bottom: 0;
    }
    ${media.lessThan('sp')`
      text-align: left;
    `}
  }

  /* Images */
  .gatsby-resp-image-wrapper {
    width: 100%;
    li > & {
      margin-bottom: 1.8em;
    }
  }

  /* Prism.js */
  :not(pre) > code[class*="language-"] {
    padding: 2px 4px;
  }
  .monospace {
    pre[class*="language-"],
    code[class*="language-"] {
      font-family: "MS Gothic", "Osaka-mono", monospace;
    }
  }
  .gatsby-highlight {
    .token.operator {
      background: none;
    }
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

const isTag = (tag: ArticleTagItem | null): tag is ArticleTagItem => Boolean(tag && tag.name)

const Article = injectIntl<ArticleProps>(function Article({
  children,
  excerpted,
  components = {},
  article: {
    file,
    attributes: {
      title,
      created,
      navigation,
      category,
      tags,
    },
    htmlAst,
    excerptAst,
  },
  prev,
  next,
  intl: {
    formatMessage,
    formatDate,
  },
}) {
  const path = getPathFromArticleFile(file)
  const { Compiler } = new RehypeReact({
    createElement: React.createElement,
    components: {
      ...components,
      'image-zoom': ImageZoomWrapper,
      'historia-link': Link,
    },
  })

  return (
    <>
      <ArticleContainer className={getClassNameFromArticleFile(file)}>
        <ArticleHeader title={<Link to={path}>{title}</Link>}>
          <ArticleHeaderAttributes>
            {category ? (
              <ArticleHeaderAttributeItem>
                <ArticleHeaderAttributeIcon name="folder-open-o" />
                <ArticleHeaderAttributeLink to={category.path}>{category.name}</ArticleHeaderAttributeLink>
              </ArticleHeaderAttributeItem>
            ) : null}
            {tags && tags.filter(isTag).length ? (
              <ArticleHeaderAttributeItem>
                <ArticleHeaderAttributeIcon name="tags" />
                {tags
                  .filter(isTag)
                  .map(({ name, slug }, index) => <ArticleHeaderAttributeLink key={index} to={`/tag/${slug}`}>{name}</ArticleHeaderAttributeLink>)
                  .reduce((prev, curr) => prev.length ? [ prev, ', ', curr ] : [ curr ], [] as ReactNode[])}
              </ArticleHeaderAttributeItem>
            ) : null}
            {created ? (
              <ArticleHeaderAttributeItem title={formatDate(created, {
                year: 'numeric',
                month: 'narrow',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}>
                <ArticleHeaderAttributeIcon name="calendar-o" />
                {formatDate(created, {
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
        <ArticleBody>
          {Compiler(excerptAst || htmlAst || {})}
        </ArticleBody>
        {excerpted ? (
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
              prev={prev ? { title: prev.attributes.title, to: getPathFromArticleFile(prev.file) } : null}
              next={next ? { title: next.attributes.title, to: getPathFromArticleFile(next.file) } : null}
            />
          </PaginationContainer>
        </ArticleContainer>
      ) : null}
    </>
  )
})

interface ArticleItemBase {
  attributes: {
    title: string
    created: string | null
    sidebar: boolean | null
    category?: ArticleCategoryItem
    tags?: (ArticleTagItem | null)[]
    navigation?: NavigationLinkItem[] | null
  }
  file: ArticleFile
  htmlAst?: {}
  excerptAst?: {}
}

export interface FullArticleItem extends ArticleItemBase {
  htmlAst: {}
}

export interface ExcerptedArticleItem extends ArticleItemBase {
  excerptAst: {}
}

export type ArticleItem = FullArticleItem | ExcerptedArticleItem

interface ArticleFile {
  directory: string
  name: string
}

export interface ArticleCategoryItem {
  name: string
  path: string
}

export interface ArticleTagItem {
  name: string
  slug: string
}

interface ArticleProps {
  article: ArticleItem
  prev?: ArticleItem | null
  next?: ArticleItem | null
  excerpted: boolean
  components?: {
    [key: string]: ComponentType<any>
  }
}

export default Article
