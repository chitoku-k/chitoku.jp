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
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/preset-scss',
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
        require.resolve('babel-plugin-remove-graphql-queries'),
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
