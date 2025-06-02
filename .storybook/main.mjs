'use strict'

import webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config = {
  stories: [
    '../src/**/*.stories.tsx',
  ],
  staticDirs: [
    '../public',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.yml$/u,
      use: [
        { loader: 'json-loader' },
        { loader: 'yaml-flat-loader' },
      ],
    })

    const js = config.module.rules.find(({ test, use }) => test?.test('.js') && use?.[0]?.loader?.includes?.('babel'))
    js.use[0].options.plugins = [
      [
        'babel-plugin-remove-graphql-queries',
        {
          stage: config.mode === 'development' ? 'develop-html' : 'build-html',
          staticQueryDir: 'page-data/sq/d',
        },
      ],
    ]

    config.module.rules.push({
      test: /\.m?js$/u,
      include: /node_modules\/(gatsby|gatsby-script)\//u,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
            ],
          },
        },
      ],
    })

    const svg = config.module.rules.find(({ test }) => test.test('.svg'))
    svg.exclude = /\.svg$/u

    config.module.rules.push({
      test: /\.svg$/u,
      use: [
        { loader: '@svgr/webpack' },
      ],
    })

    config.module.rules.push({
      test: /\.css$/u,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    })

    config.module.rules.push({
      test: /\.scss$/u,
      exclude: /\.module\.scss$/u,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            api: 'legacy',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.module\.scss$/u,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              exportLocalsConvention: 'camelCaseOnly',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            api: 'legacy',
          },
        },
      ],
    })

    config.resolve.fallback.fs = false
    config.resolve.fallback.path = false

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]

    config.plugins.push(new webpack.ProvidePlugin({
        process: 'process/browser',
    }))

    return config
  },
}

export default config
