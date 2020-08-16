import { CreateResolversArgs, GatsbyNode, Page, PluginOptions } from 'gatsby'

import createArticles, { ArticleContext } from './createArticles'
import createTaxonomies, { Category, Tag, TaxonomyContext } from './createTaxonomies'
import { File, getPath } from './utils'

interface Options extends PluginOptions {
  limit: number
}

interface GetAllNodesArgs {
  type?: string
}

interface GetNodeByIdArgs {
  type?: string
  id: string
}

interface ResolveContext {
  nodeModel: {
    getAllNodes: <T>(args: GetAllNodesArgs) => T[]
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

export const createPages: GatsbyNode['createPages'] = async (
  {
    graphql,
    actions: {
      createPage,
    },
  }, {
    limit = 3,
  }: Options,
) => {
  const paths = new Set<string>()
  const pages: Page<ArticleContext | TaxonomyContext>[] = [
    ...await createArticles({ graphql }),
    ...await createTaxonomies({ graphql, limit }),
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

const sortArticles = (a: Article, b: Article): number => {
  if (!a.frontmatter.created) {
    return -1
  }
  if (!b.frontmatter.created) {
    return 1
  }
  return Number(new Date(b.frontmatter.created)) - Number(new Date(a.frontmatter.created))
}

/* eslint-disable no-shadow, @typescript-eslint/no-explicit-any */
export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
}: CreateResolversArgs): any => {
  createResolvers({
    CategoriesYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        resolve(source: Category, _: unknown, context: ResolveContext) {
          const articles = context.nodeModel.getAllNodes<Article>({
            type: 'MarkdownRemark',
          })

          return articles
            .filter(article => article.frontmatter.category === source.id)
            .sort(sortArticles)
        },
      },
    },
    TagsYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        resolve(source: Tag, _: unknown, context: ResolveContext) {
          const articles = context.nodeModel.getAllNodes<Article>({
            type: 'MarkdownRemark',
          })

          return articles
            .filter(article => article.frontmatter.tags?.some(tag => tag === source.id))
            .sort(sortArticles)
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
        resolve(source: Article, _: unknown, context: ResolveContext) {
          if (!source.frontmatter.prev) {
            return null
          }

          const files = context.nodeModel.getAllNodes<File>({
            type: 'File',
          })

          const target = files.find(file => getPath(file) === source.frontmatter.prev)
          if (!target) {
            return null
          }

          return context.nodeModel.getNodeById<Article>({
            id: target.children[0],
          })
        },
      },
      next: {
        type: 'MarkdownRemark',
        resolve(source: Article, _: unknown, context: ResolveContext) {
          if (!source.frontmatter.next) {
            return null
          }

          const files = context.nodeModel.getAllNodes<File>({
            type: 'File',
          })

          const target = files.find(file => getPath(file) === source.frontmatter.next)
          if (!target) {
            return null
          }

          return context.nodeModel.getNodeById<Article>({
            id: target.children[0],
          })
        },
      },
    },
  })
}
