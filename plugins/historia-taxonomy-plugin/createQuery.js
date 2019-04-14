const path = require('path')
const removeMd = require('remove-markdown')
const { getPath } = require('./utils')

module.exports = () => ({
  query: `
    query {
      pages: allMarkdownRemark(
        sort: { fields: [ frontmatter___created ], order: DESC }
      ) {
        ...ArticleNode
      }
    }
    fragment Article on MarkdownRemark {
      excerpt
      headings {
        value
      }
      ...File
      attributes: frontmatter {
        title
        created
        category {
          ...Category
        }
        tags {
          ...Tag
        }
      }
    }
    fragment ArticleNode on MarkdownRemarkConnection {
      items: edges {
        article: node {
          ...Article
        }
      }
    }
    fragment Tag on TagsYaml {
      name
      slug
    }
    fragment Category on CategoriesYaml {
      name
      path
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
  `,
  transformer: ({
    data: {
      pages: {
        items,
      },
    },
  }) => items.filter(({ article: { file } }) => {
    return getPath(file)
  }).map(({
    article: {
      file,
      excerpt,
      headings,
      attributes: {
        title,
        category,
        tags,
        created,
      },
    },
  }) => {
    return {
      path: getPath(file),
      excerpt: removeMd(excerpt),
      headings: headings.map(x => x.value),
      title,
      category,
      tags,
      created,
    }
  })
})
