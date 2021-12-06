import path from 'path'

import type { CreateResolversArgs, GatsbyNode, Page, PluginOptions } from 'gatsby'
import type { GatsbyIterable } from 'gatsby/dist/datastore/common/iterable'
import type { IRunQueryArgs } from 'gatsby/dist/datastore/types'

import type { ArticleContext } from './createArticles'
import createArticles from './createArticles'
import type { HomeContext } from './createHome'
import createHome from './createHome'
import type { Category, Tag, TaxonomyContext } from './createTaxonomies'
import createTaxonomies from './createTaxonomies'
import type { File } from './utils'
import { getPath } from './utils'

interface Options extends PluginOptions {
  taxonomies?: {
    limit: number
  }
  home?: {
    limit: number
  }
}

interface FindArgs {
  type?: string
  query?: Partial<IRunQueryArgs['queryArgs']>
}

interface GetNodeByIdArgs {
  type?: string
  id: string
}

interface QueryResult<T> {
  entries: GatsbyIterable<T>
  totalCount: () => Promise<number>
}

interface ResolveContext {
  nodeModel: {
    findOne: <T>(args: FindArgs) => Promise<T | null>
    findAll: <T>(args: FindArgs) => Promise<QueryResult<T>>
    getNodeById: <T>(args: GetNodeByIdArgs) => T
  }
}

interface Article {
  parent: string
  rawMarkdownBody: string
  frontmatter: {
    created: string
    category: string
    tags: string[] | null
    prev: string
    next: string
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: {
    createPage,
  },
}, {
  taxonomies,
  home,
}: Options) => {
  const paths = new Set<string>()
  const pages: Page<ArticleContext | HomeContext | TaxonomyContext>[] = [
    ...await createArticles({ graphql }),
    ...await createTaxonomies({
      graphql,
      limit: taxonomies?.limit ?? 3,
    }),
    ...await createHome({
      graphql,
      limit: home?.limit ?? 5,
    }),
  ]

  for (const page of pages) {
    if ('page' in page.context && page.context.page === false) {
      continue
    }
    if (paths.has(page.path)) {
      continue
    }
    createPage(page)
    paths.add(page.path)
  }
}

/* eslint-disable no-shadow, @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow */
export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
}: CreateResolversArgs): any => {
  createResolvers({
    CategoriesYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        async resolve(source: Category, _: unknown, context: ResolveContext) {
          const { entries } = await context.nodeModel.findAll<Article>({
            type: 'MarkdownRemark',
            query: {
              filter: {
                frontmatter: {
                  category: {
                    name: {
                      eq: source.name,
                    },
                  },
                },
              },
              sort: {
                fields: [ 'frontmatter.created' ],
                order: [ 'DESC' ],
              },
            },
          })

          return entries
        },
      },
    },
    TagsYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        async resolve(source: Tag, _: unknown, context: ResolveContext) {
          const { entries } = await context.nodeModel.findAll<Article>({
            type: 'MarkdownRemark',
            query: {
              filter: {
                frontmatter: {
                  tags: {
                    elemMatch: {
                      name: {
                        eq: source.name,
                      },
                    },
                  },
                },
              },
              sort: {
                fields: [ 'frontmatter.created' ],
                order: [ 'DESC' ],
              },
            },
          })

          return entries
        },
      },
    },
    MarkdownRemark: {
      excerpted: {
        type: 'Boolean!',
        resolve(source: Article) {
          // TODO: read excerpt_separator setting
          return source.rawMarkdownBody.includes('\n<!-- more -->\n')
        },
      },
      path: {
        type: 'String!',
        resolve(source: Article, _: unknown, context: ResolveContext) {
          return getPath(context.nodeModel.getNodeById({ id: source.parent }))
        },
      },
      prev: {
        type: 'MarkdownRemark',
        async resolve(source: Article, _: unknown, context: ResolveContext) {
          if (!source.frontmatter.prev) {
            return null
          }

          const dirname = path.join('posts', path.dirname(source.frontmatter.prev))
          const basename = path.basename(source.frontmatter.prev)

          const file = await context.nodeModel.findOne<File<string, string>>({
            type: 'File',
            query: {
              filter: {
                relativeDirectory: {
                  eq: dirname,
                },
                name: {
                  eq: basename,
                },
              },
            },
          })

          if (!file?.children[0]) {
            return null
          }

          return context.nodeModel.getNodeById<Article>({
            id: file.children[0],
          })
        },
      },
      next: {
        type: 'MarkdownRemark',
        async resolve(source: Article, _: unknown, context: ResolveContext) {
          if (!source.frontmatter.next) {
            return null
          }

          const dirname = path.join('posts', path.dirname(source.frontmatter.next))
          const basename = path.basename(source.frontmatter.next)

          const file = await context.nodeModel.findOne<File<string, string>>({
            type: 'File',
            query: {
              filter: {
                relativeDirectory: {
                  eq: dirname,
                },
                name: {
                  eq: basename,
                },
              },
            },
          })

          if (!file?.children[0]) {
            return null
          }

          return context.nodeModel.getNodeById<Article>({
            id: file.children[0],
          })
        },
      },
    },
  })
}
