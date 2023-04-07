'use strict'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config = {
  stories: [
    '../src/**/*.stories.tsx',
  ],
  staticDirs: [
    '../public',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  features: {
    storyStoreV7: false,
  },
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.yml$/u,
      use: [
        { loader: 'json-loader' },
        { loader: 'yaml-flat-loader' },
      ],
    })

    const js = config.module.rules.find(({ test }) => test.test('.js'))
    js.exclude = /node_modules\/(?!(gatsby|gatsby-script)\/)/u
    js.use = [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
          ],
          plugins: [
            [
              require.resolve('babel-plugin-remove-graphql-queries'),
              {
                stage: config.mode === 'development' ? 'develop-html' : 'build-html',
                staticQueryDir: 'page-data/sq/d',
              },
            ],
          ],
        },
      },
    ]

    const svg = config.module.rules.find(({ test }) => test.test('.svg'))
    svg.exclude = /\.svg$/u

    config.module.rules.push({
      test: /\.svg$/u,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })

    const scss = config.module.rules.find(({ test }) => test.test('.scss'))
    scss.exclude = /\.module\.scss$/u

    config.module.rules.push({
      test: /\.module\.scss$/u,
      use: [
        {
          loader: 'style-loader',
          options: {
            esModule: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              exportLocalsConvention: 'camelCaseOnly',
            },
          },
        },
        { loader: 'sass-loader' },
      ],
    })

    config.resolve.fallback.fs = false
    config.resolve.fallback.path = false

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]

    return config
  },
}

export default config
