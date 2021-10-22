'use strict'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
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
  webpackFinal: config => {
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
