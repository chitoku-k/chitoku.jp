'use strict'

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// React-intl
// https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
exports.resolvableExtensions = () => [ '.mjs' ]

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
        {
          test: /\.mjs$/u,
          type: 'javascript/auto',
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

exports.onCreatePage = ({
  page,
  actions: {
    createPage,
    deletePage,
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
  }
}
