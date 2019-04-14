const path = require('path')
const { getPath } = require('./utils')

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

  for (const { articles } of categories && categories.items || []) {
    for (const [ index, article ] of articles.entries()) {
      const {
        id,
        file,
      } = article

      let prev, next
      if (article.prev || article.next) {
        prev = article.prev
        next = article.next
      } else {
        prev = articles[index - 1]
        next = articles[index + 1]
      }

      pages.push({
        path: getPath(file, 'index'),
        component: path.resolve('src/templates/article.tsx'),
        context: {
          id,
          prev: prev && (!prev.attributes || prev.attributes.created) ? prev.id : null,
          next: next && (!next.attributes || next.attributes.created) ? next.id : null,
        },
      })
    }
  }

  return pages
}

module.exports = createArticles
