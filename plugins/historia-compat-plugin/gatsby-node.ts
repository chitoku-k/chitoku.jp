import type { GatsbyNode } from 'gatsby'
import * as path from 'path'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
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
            path.join(path.resolve('node_modules/$virtual'), '/'),
            path.join(path.resolve('node_modules/@pmmmwh/react-refresh-webpack-plugin'), '/'),
            path.join(path.resolve('node_modules/debug'), '/'),
            path.join(path.resolve('node_modules/query-string'), '/'),
            path.join(path.resolve('node_modules/react'), '/'),
            path.join(path.resolve('node_modules/react-refresh'), '/'),
            path.join(path.resolve('node_modules/strip-ansi'), '/'),
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
