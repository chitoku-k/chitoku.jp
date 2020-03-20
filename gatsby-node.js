'use strict'

const path = require('path')
const fs = require('fs').promises
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({
  actions: {
    setWebpackConfig,
  },
}) => {
  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.yml$/u,
          include: path.resolve('translations/'),
          use: [
            { loader: 'yaml-flat-loader' },
          ],
        },
      ],
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
    },
  })
}

exports.createSchemaCustomization = async ({
  actions: {
    createTypes,
  },
}) => {
  createTypes(await fs.readFile(path.resolve('schema.gql'), { encoding: 'utf-8' }))
}

exports.onCreatePage = ({
  page,
  actions: {
    createPage,
    deletePage,
    createRedirect,
  },
}) => {
  const { dir, name } = path.parse(page.path)

  if (page.path === '/') {
    return
  }

  // Force trailing slash for index pages
  if (name === 'index') {
    deletePage(page)
    createPage({
      ...page,
      path: path.join(dir, '/'),
    })
    createRedirect({
      fromPath: dir,
      toPath: path.join(dir, '/'),
      isPermanent: true,
      redirectInBrowser: true,
    })
    return
  }

  // Remove trailing slash for non-index pages
  createRedirect({
    fromPath: path.join(dir, name, '/'),
    toPath: path.join(dir, name),
    isPermanent: true,
    redirectInBrowser: true,
  })
}
