import React, { ReactNode, ComponentType } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import RehypeReact from 'rehype-react'
import { injectIntl } from 'react-intl'

import messages from './messages'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import ImageZoomWrapper from 'components/ImageZoomWrapper'
import { NavigationLinkItem } from 'components/Navbar'
import { PaginationContainer, SimplePagination } from 'components/Pagination'
import { ArticleContainer, ArticleHeader } from 'components/Layout'

export const getPathFromArticleFile = (file: ArticleFile) => (
  `/${file.directory.replace(/^posts\//, '')}/${file.name === 'index' ? '' : file.name}`
)

export const getClassNameFromArticleFile = (file: ArticleFile) => (
  [
    'page',
    file.directory.replace(/^posts\//, '').replace(/\//g, '-'),
    ...(file.name === 'index' ? [] : [ file.name ]),
  ].join('-')
)

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
          <p>
            {category ? (
              <span>
                <FontAwesome name="folder-open-o" />
                <Link to={category.path}>{category.name}</Link>
              </span>
            ) : null}
            {tags && tags.filter(isTag).length ? (
              <span>
                <FontAwesome name="tags" />
                {tags
                  .filter(isTag)
                  .map(({ name, slug }, index) => <Link key={index} to={`/tag/${slug}`}>{name}</Link>)
                  .reduce((prev, curr) => prev.length ? [ prev, ', ', curr ] : [ curr ], [] as ReactNode[])}
              </span>
            ) : null}
            {created ? (
              <span title={formatDate(created, {
                year: 'numeric',
                month: 'narrow',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}>
                <FontAwesome name="calendar-o" />
                {formatDate(created, {
                  year: 'numeric',
                  month: 'narrow',
                  day: 'numeric',
                })}
              </span>
            ) : null}
          </p>
        </ArticleHeader>
        {navigation ? (
          <Bootstrap.Navbar id="sub-nav">
            <Bootstrap.Nav>
              {navigation.map(item => <NavItem key={item.name} {...item} style={{ width: `calc(100% / ${navigation.length})` }} />)}
            </Bootstrap.Nav>
          </Bootstrap.Navbar>
        ) : null}
        {Compiler(excerptAst || htmlAst || {})}
        {excerpted ? (
          <div className="read-more-container">
            <Link to={path} className="read-more-button">{formatMessage(messages.more)}</Link>
          </div>
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
