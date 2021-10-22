'use strict'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: [
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    'storybook-addon-gatsby',
  ],
  core: {
    builder: 'webpack5',
  },
  babel: options => {
    options.plugins.push([ 'react-intl-auto', { removePrefix: 'src/' } ],)
    return options
  },
  webpackFinal: config => {
    const tsx = config.module.rules.find(({ test }) => test.test('.tsx'))
    const babelLoader = tsx.use.find(({ loader }) => loader.includes('babel-loader'))
    babelLoader.options.plugins = [
      ...babelLoader.options.plugins.filter(p => p !== require.resolve('babel-plugin-remove-graphql-queries')),
      [
        require.resolve('babel-plugin-remove-graphql-queries'),
        {
          stage: 'develop-html',
          staticQueryDir: 'page-data/sq/d',
        },
      ],
    ]

    config.module.rules.push({
      test: /\.yml$/u,
      use: [
        { loader: 'json-loader' },
        { loader: 'yaml-flat-loader' },
      ],
    })

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

    config.resolve.fallback.path = require.resolve('path-browserify')

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]

    return config
  },
}
