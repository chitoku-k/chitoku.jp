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
          test: /\.m?js$/u,
          include: [
            path.resolve('node_modules/$virtual'),
            path.resolve('node_modules/@pmmmwh/react-refresh-webpack-plugin'),
            path.resolve('node_modules/@react-aria/ssr'),
            path.resolve('node_modules/@restart/ui'),
            path.resolve('node_modules/debug'),
            path.resolve('node_modules/dequal'),
            path.resolve('node_modules/gatsby'),
            path.resolve('node_modules/hast-to-hyperscript'),
            path.resolve('node_modules/query-string'),
            path.resolve('node_modules/react'),
            path.resolve('node_modules/react-bootstrap'),
            path.resolve('node_modules/react-refresh'),
            path.resolve('node_modules/react-schemaorg'),
            path.resolve('node_modules/rehype-react'),
            path.resolve('node_modules/split-on-first'),
            path.resolve('node_modules/strip-ansi'),
          ],
          use: [
            loaders.js(),
          ],
        },
      ],
    },
  })
}
