import type { GatsbyNode } from 'gatsby'
import { Feed } from 'feed'
import { promises as fs } from 'fs'
import * as path from 'path'
import type { DomNode, HtmlToTextOptions } from 'html-to-text'
import { htmlToText } from 'html-to-text'

import { author, description } from '../../package.json'

interface Data {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  pages: {
    items: {
      article: {
        excerpt?: string
        file: {
          directory: string
          name: string
        }
        attributes: {
          title: string
          created: string
        }
      }
    }[]
  }
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
    { selector: 'br', format: 'inlineHtml' },
    { selector: 'code', format: 'inlineTag' },
    { selector: 'h1', format: 'inlineTag' },
    { selector: 'h2', format: 'inlineTag' },
    { selector: 'h3', format: 'inlineTag' },
    { selector: 'h4', format: 'inlineTag' },
    { selector: 'h5', format: 'inlineTag' },
    { selector: 'h6', format: 'inlineTag' },
    { selector: 'ol', format: 'inlineTag' },
    { selector: 'ul', format: 'inlineTag' },
    { selector: 'li', format: 'inlineTag' },
    { selector: 'table', format: 'inlineTag' },
    { selector: 'td', format: 'inlineTag' },
    { selector: 'th', format: 'inlineTag' },
    { selector: 'tr', format: 'inlineTag' },
    // Block
    { selector: 'pre', format: 'blockTag' },
    { selector: 'blockquote', format: 'blockTag' },
    { selector: 'p', format: 'blockTag' },
    // Emoji
    { selector: 'img.emoji', format: 'emoji' },
    // Skip
    { selector: 'a[href*="#fnref-"]', format: 'skip' },
    { selector: 'sup[id*="fnref-"]', format: 'skip' },
    { selector: 'img', format: 'skip' },
    { selector: 'svg', format: 'skip' },
  ],
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({
  graphql,
}) => {
  const { data } = await graphql<Data>(`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      pages: allMarkdownRemark(
        filter: { frontmatter: { created: { ne: null } } }
        sort: { frontmatter: { created: DESC } }
        limit: 20
      ) {
        ...ArticleNode
      }
    }
    fragment Article on MarkdownRemark {
      excerpt(format: HTML)
      ...File
      attributes: frontmatter {
        title
        created
      }
    }
    fragment ArticleNode on MarkdownRemarkConnection {
      items: edges {
        article: node {
          ...Article
        }
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

  if (!data) {
    throw new Error('Invalid feed data')
  }

  const {
    site: {
      siteMetadata: {
        siteUrl,
      },
    },
    pages: {
      items,
    },
  } = data

  const feed = new Feed({
    id: siteUrl,
    title: description,
    link: siteUrl,
    copyright: author,
  })

  for (const { article } of items) {
    const {
      excerpt,
      file,
      attributes,
    } = article

    const directory = file.directory.replace(/^posts(?:\/|$)/u, '/')
    if (!directory) {
      continue
    }

    const url = siteUrl + path.join(directory, file.name === 'index' ? '/' : file.name)
    feed.addItem({
      id: url,
      link: url,
      title: attributes.title,
      content: htmlToText(excerpt ?? '', htmlToTextOptions),
      date: new Date(attributes.created),
    })
  }

  await fs.mkdir(path.resolve('public/feed/atom'), { recursive: true })
  await fs.mkdir(path.resolve('public/feed/rss2'), { recursive: true })

  const createFeed = (url: string): Feed => {
    feed.options.feedLinks = {
      atom: siteUrl + url,
    }
    return feed
  }

  await Promise.all([
    fs.writeFile(
      path.resolve('public/feed/index.xml'),
      createFeed('/feed/').rss2(),
    ),
    fs.writeFile(
      path.resolve('public/feed/atom/index.xml'),
      createFeed('/feed/atom/').atom1(),
    ),
    fs.writeFile(
      path.resolve('public/feed/rss2/index.xml'),
      createFeed('/feed/rss2/').rss2(),
    ),
  ])
}
