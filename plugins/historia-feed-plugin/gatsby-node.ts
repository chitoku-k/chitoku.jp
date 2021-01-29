import type { GatsbyNode } from 'gatsby'
import { Feed } from 'feed'
import { promises as fs } from 'fs'
import * as path from 'path'
import { stripHtml } from 'string-strip-html'

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
        sort: { fields: [ frontmatter___created ], order: DESC }
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
      content: stripHtml(excerpt ?? '').result,
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
