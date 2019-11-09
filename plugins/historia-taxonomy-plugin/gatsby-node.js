'use strict'

const createTaxonomies = require('./createTaxonomies')
const createArticles = require('./createArticles')
const { getPath } = require('./utils')

exports.createPages = async (
  {
    graphql,
    actions: {
      createPage,
    },
  }, {
    limit = 3,
    exclude = [],
  },
) => {
  const paths = new Set()
  const pages = [
    ...await createArticles({ graphql }),
    ...await createTaxonomies({ graphql, limit }),
  ]

  for (const page of pages) {
    if (paths.has(page.path) || exclude.includes(page.path)) {
      continue
    }
    createPage(page)
    paths.add(page.path)
  }
}

const sortArticles = (a, b) => {
  if (!a.frontmatter.created) {
    return -1
  }
  if (!b.frontmatter.created) {
    return 1
  }
  return new Date(b.frontmatter.created) - new Date(a.frontmatter.created)
}

exports.createResolvers = ({
  createResolvers,
}) => {
  createResolvers({
    CategoriesYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        resolve(source, args, context) {
          const articles = context.nodeModel.getAllNodes({
            type: 'MarkdownRemark',
          })

          return articles
            .filter(article => article.frontmatter.category && article.frontmatter.category === source.id)
            .sort(sortArticles)
        },
      },
    },
    TagsYaml: {
      articles: {
        type: [
          'MarkdownRemark!',
        ],
        resolve(source, args, context) {
          const articles = context.nodeModel.getAllNodes({
            type: 'MarkdownRemark',
          })

          return articles
            .filter(article => article.frontmatter.tags && article.frontmatter.tags.some(tag => tag === source.id))
            .sort(sortArticles)
        },
      },
    },
    MarkdownRemark: {
      excerpted: {
        type: 'Boolean!',
        resolve(source) {
          // TODO: read excerpt_separator setting
          return source.rawMarkdownBody.includes('\n<!-- more -->\n')
        },
      },
      path: {
        type: 'String!',
        resolve(source, args, context) {
          return getPath(context.nodeModel.getNodeById({ id: source.parent }))
        },
      },
      prev: {
        type: 'MarkdownRemark',
        resolve(source, args, context) {
          if (!source.frontmatter.prev) {
            return null
          }

          const files = context.nodeModel.getAllNodes({
            type: 'File',
          })

          const target = files.find(file => getPath(file) === source.frontmatter.prev)
          return context.nodeModel.getNodeById({
            id: target.children[0],
          })
        },
      },
      next: {
        type: 'MarkdownRemark',
        resolve(source, args, context) {
          if (!source.frontmatter.next) {
            return null
          }

          const files = context.nodeModel.getAllNodes({
            type: 'File',
          })

          const target = files.find(file => getPath(file) === source.frontmatter.next)
          return context.nodeModel.getNodeById({
            id: target.children[0],
          })
        },
      },
    },
  })
}
