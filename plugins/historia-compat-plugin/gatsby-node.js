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
          test: /\.js$/,
          include: path.resolve('node_modules/@weknow/gatsby-remark-twitter'),
          use: [
            loaders.js(),
          ],
        },
      ],
    },
  })
}
