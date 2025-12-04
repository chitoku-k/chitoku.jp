import * as path from 'path'
import type { BuildArgs, Page } from 'gatsby'

import type { Paginatable } from './utils'
import { splitPages } from './utils'

type TaxonomiesArgs = Pick<BuildArgs, 'graphql'> & { limit: number }

export interface Category {
  name: string
  path: string
}

export interface Tag {
  name: string
  slug: string
}

interface Article {
  id: string
  attributes: {
    category: Category
    tags: Tag[]
  }
}

interface Data {
  categories?: {
    items: (Category & { articles: Article[] })[]
  }
  tags?: {
    items: (Tag & { articles: Article[] })[]
  }
}

export interface TaxonomyContext extends Context, Paginatable {
  category: Category | null
  tag: Tag | null
  ids: string[]
}

const createTaxonomies = async ({
  graphql,
  limit,
}: TaxonomiesArgs): Promise<Page<TaxonomyContext>[]> => {
  const taxonomies: Page<TaxonomyContext>[] = []

  const { data } = await graphql<Data>(`
    query {
      categories: allCategoriesYaml {
        items: nodes {
          id
          name
          path
          articles {
            ...Article
          }
        }
      }
      tags: allTagsYaml {
        items: nodes {
          id
          name
          slug
          articles {
            ...Article
          }
        }
      }
    }
    fragment Article on MarkdownRemark {
      id
      attributes: frontmatter {
        category {
          ...Category
        }
        tags {
          ...Tag
        }
      }
    }
    fragment Tag on TagsYaml {
      id
      name
      slug
    }
    fragment Category on CategoriesYaml {
      id
      name
      path
    }
  `)
  if (!data) {
    throw new Error('Invalid taxonomy data')
  }

  const {
    categories,
    tags,
  } = data

  for (const { articles, ...category } of categories?.items ?? []) {
    const pages = splitPages(articles, limit)

    for (const [ num, page ] of pages.entries()) {
      taxonomies.push({
        path: `${category.path}${num ? num + 1 : 'index'}`,
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category,
          tag: null,
          ids: page.flatMap(x => x.id),
          page: {
            base: category.path,
            current: num + 1,
            total: pages.length,
          },
          sidebar: true,
        },
      })
    }
  }

  for (const { articles, ...tag } of tags?.items ?? []) {
    const pages = splitPages(articles, limit)

    for (const [ num, page ] of pages.entries()) {
      taxonomies.push({
        path: `/tag/${tag.slug}/${num ? num + 1 : 'index'}`,
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category: null,
          tag,
          ids: page.flatMap(x => x.id),
          page: {
            base: `/tag/${tag.slug}`,
            current: num + 1,
            total: pages.length,
          },
          sidebar: true,
        },
      })
    }
  }

  return taxonomies
}

export default createTaxonomies
