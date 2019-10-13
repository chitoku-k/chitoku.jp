'use strict'

const fs = require('fs').promises
const path = require('path')

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
      updates: {
        items: [
          { update },
        ],
      },
    },
  } = await graphql(`
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

  await fs.writeFile(
    path.resolve('public/softwares/soarer/update.json'),
    JSON.stringify({
      Name: `Soarer ${update.version}`,
      Version: update.version,
      Uri: siteUrl + update.file.publicURL,
      ChangeLog: update.history && update.history.map(history => `・${history.title}`).join('\n'),
    }),
  )
}
