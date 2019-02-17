const { description, author } = require('../../package.json')
const { Feed } = require('feed')
const fs = require('fs').promises
const path = require('path')
const removeMd = require('remove-markdown')

exports.onPostBuild = async ({
  graphql,
}) => {
  const {
    data: {
      site: {
        siteMetadata: {
          siteUrl,
        },
      },
      pages: {
        items,
      },
    },
  } = await graphql(`
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
      excerpt
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

  const feed = new Feed({
    id: siteUrl,
    title: description,
    copyright: author,
    feedLinks: {
      atom: siteUrl + '/feed/atom/',
      rss: siteUrl + '/feed/rss2/',
    },
  })

  for (const { article } of items) {
    const {
      excerpt,
      file,
      attributes,
    } = article

    const directory = file.directory.replace(/^posts(\/|$)/, '/')
    if (!directory) {
      continue
    }

    const url = siteUrl + path.join(directory, file.name === 'index' ? '/' : file.name)
    feed.addItem({
      id: url,
      link: url,
      title: attributes.title,
      content: removeMd(excerpt),
      date: new Date(attributes.created),
    })
  }

  await fs.mkdir(path.resolve('public/feed/atom'), { recursive: true })
  await fs.mkdir(path.resolve('public/feed/rss2'), { recursive: true })

  const atom = feed.atom1()
  const rss = feed.rss2()

  await Promise.all([
    fs.writeFile(
      path.resolve('public/feed/index.xml'),
      rss,
    ),
    fs.writeFile(
      path.resolve('public/feed/atom/index.xml'),
      atom,
    ),
    fs.writeFile(
      path.resolve('public/feed/rss2/index.xml'),
      rss,
    ),
  ])
}
