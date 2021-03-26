import type { BuildArgs, Page } from 'gatsby'
import path from 'path'

import type { Paginatable } from './utils'
import { splitPages } from './utils'

type HomeArgs = Pick<BuildArgs, 'graphql'> & { limit: number }

interface Article {
  id: string
}

interface Data {
  pages?: {
    items: {
      article: Article
    }[]
  }
}

export interface HomeContext extends Paginatable {
  ids: string[]
}

const createHome = async ({
  graphql,
  limit,
}: HomeArgs): Promise<Page<HomeContext>[]> => {
  const home: Page<HomeContext>[] = []

  const { data } = await graphql<Data>(`
    query {
      pages: allMarkdownRemark(
        filter: { frontmatter: { created: { ne: null } } }
        sort: { fields: [ frontmatter___created ], order: DESC }
      ) {
        items: edges {
          article: node {
            id
          }
        }
      }
    }
  `)
  if (!data) {
    throw new Error('Invalid home data')
  }

  const pages = splitPages(data.pages?.items ?? [], limit)

  for (const [ num, page ] of pages.entries()) {
    home.push({
      path: num ? String(num + 1) : '/',
      component: path.resolve('src/templates/home.tsx'),
      context: {
        ids: page.flatMap(x => x.article.id),
        page: {
          current: num + 1,
          total: pages.length,
        },
      },
    })
  }

  return home
}

export default createHome
