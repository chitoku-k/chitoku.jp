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
          include: [
            path.resolve('node_modules/@weknow/gatsby-remark-twitter'),
            path.resolve('node_modules/react'),
            path.resolve('node_modules/react-schemaorg'),
          ],
          use: [
            loaders.js(),
          ],
        },
      ],
    },
  })
}
