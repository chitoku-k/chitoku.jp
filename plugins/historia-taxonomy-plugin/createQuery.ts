import removeMd from 'remove-markdown'
import stripHtml from 'string-strip-html'

import { getPath } from './utils'
import { Category, Tag } from './createTaxonomies'

interface Query {
  data: {
    pages: {
      items: {
        article: {
          id: string
          file: {
            children: string[]
            relativeDirectory: string
            name: string
          }
          excerpt: string
          headings: {
            value: string
          }[]
          attributes: {
            title: string
            created: string
            category: Category
            tags: Tag[]
          }
        }
      }[]
    }
  }
}

interface CreateQueryResult {
  query: string
  transformer: (arg: Query) => {
    id: string
    path: string
    excerpt: string
    headings: string[]
    title: string
    category: Category
    tags: Tag[]
    created: string
  }[]
}

export default (): CreateQueryResult => ({
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
          id
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
  }) => items.filter(({ article: { file } }) => getPath(file)).map(({
    article: {
      id,
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
  }) => ({
    id,
    path: getPath(file),
    excerpt: removeMd(excerpt),
    headings: headings.map(x => stripHtml(x.value)),
    title,
    category,
    tags,
    created,
  })),
})
