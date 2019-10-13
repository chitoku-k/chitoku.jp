'use strict'

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
  limit,
}) => {
  const taxonomies = []

  const {
    data: {
      categories,
      tags,
    },
  } = await graphql(`
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

  for (const { articles, ...category } of categories && categories.items || []) {
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

  for (const { articles, ...tag } of tags && tags.items || []) {
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

module.exports = createTaxonomies
