import type { GatsbyNode } from 'gatsby'
import StylelintPlugin from 'stylelint-webpack-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions: {
    setWebpackConfig,
  },
}, {
  plugins,
  ...options
}) => {
  setWebpackConfig({
    plugins: [
      new StylelintPlugin(options),
    ],
  })
}
