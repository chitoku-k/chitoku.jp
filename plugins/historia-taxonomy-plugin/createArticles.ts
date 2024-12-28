import type { BuildArgs, Page } from 'gatsby'
import * as path from 'path'

import type { File } from './utils'
import { getPath } from './utils'

type ArticlesArgs = Pick<BuildArgs, 'graphql'>

interface PaginatedArticle {
  id: string
}

interface Article {
  id: string
  prev?: PaginatedArticle
  next?: PaginatedArticle
  file: File
  attributes: {
    created: string
    page: boolean | null
    sidebar: boolean | null
  }
}

export interface ArticleContext extends Context {
  id: string
  page: boolean | null
  prev: string | null
  next: string | null
}

interface Data {
  categories?: {
    items: {
      articles: Article[]
    }[]
  }
}

const createArticles = async ({
  graphql,
}: ArticlesArgs): Promise<Page<ArticleContext>[]> => {
  const pages: Page<ArticleContext>[] = []

  const { data } = await graphql<Data>(`
    query {
      categories: allCategoriesYaml {
        items: nodes {
          articles {
            ...Article
          }
        }
      }
    }
    fragment Article on MarkdownRemark {
      id
      prev {
        id
      }
      next {
        id
      }
      ...File
      attributes: frontmatter {
        created
        page
        sidebar
      }
    }
    fragment FileNode on File {
      relativeDirectory
      name
    }
    fragment File on Node {
      file: parent {
        ...FileNode
      }
    }
  `)
  if (!data) {
    throw new Error('Invalid taxonomy data')
  }

  const { categories } = data

  for (const { articles } of categories?.items ?? []) {
    for (const [ index, article ] of articles.entries()) {
      const {
        id,
        file,
      } = article

      let prev: Article | PaginatedArticle | undefined = article.prev
      let next: Article | PaginatedArticle | undefined = article.next

      if (!prev && !next) {
        prev = articles[index - 1]
        next = articles[index + 1]
      }

      pages.push({
        path: getPath(file, 'index'),
        component: path.resolve('src/templates/article.tsx'),
        context: {
          id,
          page: article.attributes.page,
          prev: prev && (!('attributes' in prev) || prev.attributes.created) ? prev.id : null,
          next: next && (!('attributes' in next) || next.attributes.created) ? next.id : null,
          sidebar: article.attributes.sidebar,
        },
      })
    }
  }

  return pages
}

export default createArticles
