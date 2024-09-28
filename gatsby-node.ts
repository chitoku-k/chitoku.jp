import type { GatsbyNode } from 'gatsby'
import type { Configuration } from 'webpack'
import * as path from 'path'
import { promises as fs } from 'fs'
import { LicenseWebpackPlugin } from 'license-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  plugins,
  getConfig,
  actions: {
    setWebpackConfig,
    replaceWebpackConfig,
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
    plugins: [
      new LicenseWebpackPlugin({
        perChunkOutput: false,
        excludedPackageTest(packageName: string): boolean {
          return (/^bundle-optimisations$|^historia-/u).test(packageName)
        },
      }),
    ],
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
    },
  })

  if (stage === 'build-javascript') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const config: Configuration = getConfig()
    if (config.optimization) {
      config.optimization.minimizer = [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        plugins.minifyJs({
          extractComments: false,
        }),
      ]
      replaceWebpackConfig(config)
    }
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
  actions: {
    createTypes,
  },
}) => {
  createTypes(await fs.readFile(path.resolve('schema.gql'), { encoding: 'utf-8' }))
}

export const createPages: GatsbyNode['createPages'] = ({
  actions: {
    createRedirect,
    createSlice,
  },
}) => {
  createRedirect({
    fromPath: '/latest',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createSlice({
    id: 'header',
    component: path.resolve('src/components/Header/index.tsx'),
  })

  createSlice({
    id: 'navbar',
    component: path.resolve('src/components/Navbar/index.tsx'),
  })

  createSlice({
    id: 'sidebar',
    component: path.resolve('src/components/Sidebar/index.tsx'),
  })

  createSlice({
    id: 'footer',
    component: path.resolve('src/components/Footer/index.tsx'),
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
