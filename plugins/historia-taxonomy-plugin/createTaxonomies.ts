import * as path from 'path'
import { BuildArgs, Page } from 'gatsby'

type TaxonomiesArgs = Pick<BuildArgs, 'graphql'> & { limit: number }

export interface Category {
  id: string
  name: string
  path: string
}

export interface Tag {
  id: string
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

export interface TaxonomyContext {
  category: null | Category
  tag: null | Tag
  ids: string[]
  page: {
    current: number
    total: number
  }
}

const splitPages = (items: Article[], limit: number): Article[][] => {
  const pages: Article[][] = []

  while (pages.length * limit < items.length) {
    pages.push(items.slice(pages.length * limit, (pages.length + 1) * limit))
  }

  return pages
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
        path: path.join(category.path, num ? String(num + 1) : 'index'),
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category,
          tag: null,
          ids: page.flatMap(x => x.id),
          page: {
            current: num + 1,
            total: pages.length,
          },
        },
      })
    }
  }

  for (const { articles, ...tag } of tags?.items ?? []) {
    const pages = splitPages(articles, limit)

    for (const [ num, page ] of pages.entries()) {
      taxonomies.push({
        path: `/${path.join('tag', tag.slug, num ? String(num + 1) : 'index')}`,
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category: null,
          tag,
          ids: page.flatMap(x => x.id),
          page: {
            current: num + 1,
            total: pages.length,
          },
        },
      })
    }
  }

  return taxonomies
}

export default createTaxonomies
