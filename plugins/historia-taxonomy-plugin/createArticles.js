const path = require('path')

const createArticles = async ({
  graphql,
}) => {
  const pages = []

  const {
    data: {
      categories,
    },
  } = await graphql(`
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
      ...File
      attributes: frontmatter {
        created
      }
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

  for (const { articles } of categories && categories.items || []) {
    for (const [ index, article ] of articles.entries()) {
      const {
        id,
        file,
      } = article

      const directory = file.directory.replace(/^posts(\/|$)/, '')
      if (!directory) {
        continue
      }

      const fullPath = '/' + path.join(directory, file.name)
      const prev = articles[index + 1]
      const next = articles[index - 1]

      pages.push({
        path: fullPath,
        component: path.resolve('src/templates/article.tsx'),
        context: {
          id,
          prev: prev && prev.attributes.created ? prev.id : null,
          next: next && next.attributes.created ? next.id : null,
        },
      })
    }
  }

  return pages
}

module.exports = createArticles
