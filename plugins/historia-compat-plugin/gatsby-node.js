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
            path.join(path.resolve('node_modules/@weknow/gatsby-remark-twitter'), '/'),
            path.join(path.resolve('node_modules/react'), '/'),
            path.join(path.resolve('node_modules/react-schemaorg'), '/'),
          ],
          use: [
            loaders.js(),
          ],
        },
      ],
    },
  })
}
