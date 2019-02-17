const path = require('path')

const createArticles = async ({
  graphql,
  createPage,
}) => {
  const {
    data: {
      pages,
    },
  } = await graphql(`
    query {
      pages: allMarkdownRemark(
        sort: { fields: [ frontmatter___created ], order: ASC }
      ) {
        group(field: frontmatter___category) {
          ...ArticleNode
        }
      }
    }
    fragment Article on MarkdownRemark {
      id
      ...File
      attributes: frontmatter {
        created
        category {
          ...Category
        }
      }
    }
    fragment ArticleNode on markdownRemarkGroupConnectionConnection {
      items: edges {
        article: node {
          ...Article
        }
      }
    }
    fragment Category on CategoriesYaml {
      id
    }
    fragment FileNode on File {
      directory: relativeDirectory
      name
    }
    fragment File on Node {
      file: parent {
        ...FileNode
      }
    }
  `)

  for (const { items } of pages && pages.group || []) {
    for (const [ index, { article } ] of items.entries()) {
      const {
        id,
        file,
        attributes: {
          category,
        },
      } = article

      const directory = file.directory.replace(/^posts(\/|$)/, '')
      if (!directory) {
        continue
      }

      const prev = items[index - 1]
      const next = items[index + 1]

      createPage({
        path: path.join(directory, file.name),
        component: path.resolve('src/templates/article.tsx'),
        context: {
          id,
          prev: prev && prev.article.attributes.created ? prev.article.id : null,
          next: next && next.article.attributes.created ? next.article.id : null,
        },
      })
    }
  }
}

module.exports = createArticles
