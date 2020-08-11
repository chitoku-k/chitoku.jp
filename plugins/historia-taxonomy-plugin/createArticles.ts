import { BuildArgs, Page } from 'gatsby'
import * as path from 'path'

import { File, getPath } from './utils'

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
  }
}

export interface ArticleContext {
  id: string
  prev: null | string
  next: null | string
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
          prev: prev && (!('attributes' in prev) || prev.attributes.created) ? prev.id : null,
          next: next && (!('attributes' in next) || next.attributes.created) ? next.id : null,
        },
      })
    }
  }

  return pages
}

export default createArticles
