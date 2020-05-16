'use strict'

const path = require('path')

exports.onCreateWebpackConfig = ({
  loaders,
  actions: {
    setWebpackConfig,
  },
}) => {
  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/u,
          include: [
            path.join(path.resolve('node_modules/@pmmmwh/react-refresh-webpack-plugin'), '/'),
            path.join(path.resolve('node_modules/@weknow/gatsby-remark-twitter'), '/'),
            path.join(path.resolve('node_modules/query-string'), '/'),
            path.join(path.resolve('node_modules/react'), '/'),
            path.join(path.resolve('node_modules/react-intl'), '/'),
            path.join(path.resolve('node_modules/split-on-first'), '/'),
          ],
          use: [
            loaders.js(),
          ],
        },
      ],
    },
  })
}
