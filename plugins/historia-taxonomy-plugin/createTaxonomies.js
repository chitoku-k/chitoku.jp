const path = require('path')

const splitPages = (items, limit) => {
  const pages = []

  while (pages.length * limit < items.length) {
    pages.push(items.slice(pages.length * limit, (pages.length + 1) * limit))
  }

  return pages
}

const createTaxonomies = async ({
  graphql,
  createPage,
  limit,
}) => {
  const {
    data: {
      categories,
      tags,
    },
  } = await graphql(`
    query {
      categories: allMarkdownRemark(
        filter: { frontmatter: { created: { ne: null } } }
        sort: { fields: [ frontmatter___created ], order: DESC }
      ) {
        group(field: frontmatter___category) {
          name: fieldValue
          ...ArticleNode
        }
      }
      tags: allMarkdownRemark(
        filter: { frontmatter: { created: { ne: null } } }
        sort: { fields: [ frontmatter___created ], order: DESC }
      ) {
        group(field: frontmatter___tags) {
          name: fieldValue
          ...ArticleNode
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
    fragment ArticleNode on markdownRemarkGroupConnectionConnection {
      items: edges {
        article: node {
          ...Article
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

  for (const { name, items } of categories && categories.group || []) {
    const category = items.map(x => x.article.attributes.category).filter(x => x).find(x => x.name === name)
    if (!category) {
      continue
    }

    const pages = splitPages(items, limit)
    for (const [ num, page ] of pages.entries()) {
      createPage({
        path: path.join(category.path, num ? String(num + 1) : 'index'),
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category,
          tag: null,
          ids: page.flatMap(x => x.article.id),
          page: {
            current: num + 1,
            total: pages.length,
          },
        },
      })
    }
  }

  for (const { name, items } of tags && tags.group || []) {
    const tag = items.flatMap(x => x.article.attributes.tags).filter(x => x).find(x => x.name === name)
    if (!tag) {
      continue
    }

    const pages = splitPages(items, limit)
    for (const [ num, page ] of pages.entries()) {
      createPage({
        path: path.join('tag', tag.slug, num ? String(num + 1) : 'index'),
        component: path.resolve('src/templates/taxonomy.tsx'),
        context: {
          category: null,
          tag,
          ids: page.flatMap(x => x.article.id),
          page: {
            current: num + 1,
            total: pages.length,
          },
        },
      })
    }
  }
}

module.exports = createTaxonomies
