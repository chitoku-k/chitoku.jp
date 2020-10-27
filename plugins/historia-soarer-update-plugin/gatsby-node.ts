import type { GatsbyNode } from 'gatsby'
import { promises as fs } from 'fs'
import * as path from 'path'

interface Data {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  updates: {
    items: {
      update: {
        version: string
        file?: {
          publicURL: string
        }
        history: {
          title: string
          message: string
        }[]
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
      updates: allUpdatesYaml(
        sort: { fields: [ version ], order: DESC }
        limit: 1
      ) {
        items: edges {
          update: node {
            version
            file {
              publicURL
            }
            history {
              title
              message
            }
          }
        }
      }
    }
  `)
  if (!data) {
    throw new Error('Invalid updates data')
  }

  const {
    site: {
      siteMetadata: {
        siteUrl,
      },
    },
    updates: {
      items: [
        { update },
      ],
    },
  } = data

  if (!update.file) {
    return
  }

  await fs.writeFile(
    path.resolve('public/softwares/soarer/update.json'),
    JSON.stringify({
      Name: `Soarer ${update.version}`,
      Version: update.version,
      Uri: siteUrl + update.file.publicURL,
      ChangeLog: update.history.map(history => `・${history.title}`).join('\n'),
    }),
  )
}
