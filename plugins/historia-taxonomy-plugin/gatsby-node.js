const createTaxonomies = require('./createTaxonomies')
const createArticles = require('./createArticles')

exports.createPages = async ({
  graphql,
  actions: {
    createPage,
  },
}, {
  limit = 3,
  exclude = [],
}) => {
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
    paths.add(page)
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
          'MarkdownRemark',
        ],
        resolve(source, args, context, info) {
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
          'MarkdownRemark',
        ],
        resolve(source, args, context, info) {
          const articles = context.nodeModel.getAllNodes({
            type: 'MarkdownRemark',
          })

          return articles
            .filter(article => article.frontmatter.tags && article.frontmatter.tags.some(tag => tag === source.id))
            .sort(sortArticles)
        },
      },
    },
  })
}
