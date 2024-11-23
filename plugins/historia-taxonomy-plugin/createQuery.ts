import type { DomNode, HtmlToTextOptions } from 'html-to-text'
import { htmlToText } from 'html-to-text'

import { getPath } from './utils'
import type { Category, Tag } from './createTaxonomies'

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
          excerpt?: string
          headings: {
            value: string
          }[]
          attributes: {
            title: string
            created: string
            category: Category
            tags: Tag[]
          }
          internal: {
            contentDigest: string
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
    internal: {
      contentDigest: string
    }
  }[]
}

interface DomElement extends DomNode {
  attribs: Record<string, string>
}

const isDomElement = (node: DomNode): node is DomElement => 'attribs' in node

const htmlToTextOptions: HtmlToTextOptions = {
  wordwrap: false,
  formatters: {
    emoji: (node, _walk, builder) => {
      const alt = isDomElement(node) ? node.attribs.alt : ''
      builder.addInline(alt ?? '')
    },
  },
  selectors: [
    // Inline
    { selector: 'a', format: 'inline' },
    // Heading
    ...[ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ].map(selector => ({
      selector,
      format: 'heading',
      options: {
        uppercase: false,
      },
    })),
    // Emoji
    { selector: 'img.emoji', format: 'emoji' },
    // Skip
    { selector: 'a[href*="#fnref-"]', format: 'skip' },
    { selector: 'sup[id*="fnref-"]', format: 'skip' },
    { selector: 'hr', format: 'skip' },
    { selector: 'img', format: 'skip' },
    { selector: 'table', format: 'skip' },
  ],
}

export default (): CreateQueryResult => ({
  query: `
    query {
      pages: allMarkdownRemark(
        sort: { frontmatter: { created: DESC } }
      ) {
        ...ArticleNode
      }
    }
    fragment Article on MarkdownRemark {
      excerpt(format: HTML)
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
          internal {
            contentDigest
          }
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
      internal,
    },
  }) => ({
    id,
    path: getPath(file),
    excerpt: htmlToText(excerpt ?? '', htmlToTextOptions),
    headings: headings.map(x => htmlToText(x.value, htmlToTextOptions)),
    title,
    category,
    tags,
    created,
    internal,
  })),
})
