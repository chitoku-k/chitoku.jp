import type { CreateSchemaCustomizationArgs, GatsbyNode } from 'gatsby'
import * as path from 'path'
import { promises as fs } from 'fs'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
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
      fallback: {
        path: require.resolve('path-browserify'),
      },
      plugins: [
        new TsconfigPathsPlugin(),
      ],
    },
  })
}

// FIXME: Workaround for Unexpected token error in .cache/*.js
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions: {
    setBabelPlugin,
  },
}) => {
  setBabelPlugin({
    name: 'babel-plugin-syntax-jsx',
    options: {},
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
  actions: {
    createTypes,
  },
}: CreateSchemaCustomizationArgs) => {
  createTypes(await fs.readFile(path.resolve('schema.gql'), { encoding: 'utf-8' }))
}

export const createPages: GatsbyNode['createPages'] = ({
  actions: {
    createRedirect,
  },
}) => {
  createRedirect({
    fromPath: '/latest',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  })
}

export const onCreatePage: GatsbyNode['onCreatePage'] = ({
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
