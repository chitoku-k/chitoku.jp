import type { FunctionComponent, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useLocation } from '@gatsbyjs/reach-router'
import type { Root } from 'hast'

import messages from './messages'
import * as styles from './styles.module.scss'

import ArticleAttribute from 'components/ArticleAttribute'
import ArticleBody from 'components/ArticleBody'
import ArticleContainer from 'components/ArticleContainer'
import ArticleHeader from 'components/ArticleHeader'
import Link from 'components/Link'
import NavItem from 'components/NavItem'
import { PaginationContainer, SimplePagination } from 'components/Pagination'

export const getClassNameFromPath = (path: string): string => `page${path.replace(/[/]/ug, '-').replace(/-$/u, '')}`

const ArticleContext = createContext<ArticleItem>({
  path: '',
  attributes: {
    title: '',
    navigation: [],
    category: null,
    tags: [],
    functions: [],
    macros: [],
    created: null,
    sidebar: false,
  },
  excerpted: false,
})

export const useArticle = (): ArticleItem => useContext(ArticleContext)

const Article: FunctionComponent<ArticleProps> = ({
  children,
  article,
  prev,
  next,
}) => {
  const location = useLocation()
  const { formatMessage } = useIntl()
  const {
    path,
    attributes: {
      title,
      navigation,
    },
    htmlAst,
    excerptAst,
    excerpted,
  } = article

  return (
    <>
      <ArticleContainer className={getClassNameFromPath(path)}>
        <ArticleHeader title={<Link to={path}>{title}</Link>}>
          <div className={styles.headerAttribute}>
            <ArticleAttribute article={article} />
          </div>
        </ArticleHeader>
        {navigation ? (
          <Navbar className={styles.navbar} bg="light">
            <Nav className={styles.nav} as="ul">
              {navigation.map(item => (
                <NavItem key={item.name} location={location} className={styles.navItem} {...item} items={null} style={{ width: `calc(100% / ${navigation.length})` }} />
              ))}
            </Nav>
          </Navbar>
        ) : null}
        <ArticleContext.Provider value={article}>
          <ArticleBody ast={(excerptAst ?? htmlAst ?? null) as Root} />
        </ArticleContext.Provider>
        {excerpted && excerptAst ? (
          <div className={styles.readMoreContainer}>
            <Link className={styles.readMoreButton} to={path}>{formatMessage(messages.more)}</Link>
          </div>
        ) : null}
        {children}
      </ArticleContainer>
      {prev ?? next ? (
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

export interface ArticleItem extends Queries.ArticleFragment {
  htmlAst?: unknown
  excerptAst?: unknown
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

interface ArticleProps extends Omit<Queries.articleQuery, 'article' | 'site'> {
  article: ArticleItem
  children?: ReactNode
}

export default Article
