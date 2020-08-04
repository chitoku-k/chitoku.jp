'use strict'

const result = require('dotenv').config()
const env = []
for (const key of [
  'GATSBY_ALGOLIA_APIKEY',
  'GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY',
  'GATSBY_ALGOLIA_APPID',
  'GATSBY_ALGOLIA_INDEXNAME',
  'GATSBY_GOOGLE_ANALYTICS_ID',
  'GATSBY_MAIL_API',
  'GATSBY_MAIL_SITE_KEY',
  'GATSBY_REPOSITORY_NAME',
  'GATSBY_REPOSITORY_TREE_URL',
  'HISTORIA_URL',
]) {
  if (!(key in result.parsed)) {
    env.push(key)
  }
}
if (env.length) {
  throw new Error(`Required environment variable is not set: ${env.join(', ')}`)
}

const { description } = require('./package.json')
const { createQuery } = require('historia-taxonomy-plugin')
const sass = require('sass')
const jsonImporter = require('node-sass-json-importer')
const postcssCustomProperties = require('postcss-custom-properties')

module.exports = {
  siteMetadata: {
    siteUrl: process.env.HISTORIA_URL,
    title: description,
  },
  mapping: {
    'MarkdownRemark.frontmatter.category': 'CategoriesYaml',
    'MarkdownRemark.frontmatter.tags': 'TagsYaml',
    'MarkdownRemark.frontmatter.functions': 'FunctionsYaml.name',
    'MarkdownRemark.frontmatter.macros': 'MacrosYaml.name',
    'UpdatesYaml.file': 'File.base',
  },
  plugins: [
    ...(process.env.GATSBY_UPDATE_INDEX === 'true' ? [
      {
        resolve: 'gatsby-plugin-algolia',
        options: {
          appId: process.env.GATSBY_ALGOLIA_APPID,
          apiKey: process.env.GATSBY_ALGOLIA_APIKEY,
          indexName: process.env.GATSBY_ALGOLIA_INDEXNAME,
          queries: [
            createQuery(),
          ],
        },
      },
    ] : []),
    { resolve: 'gatsby-plugin-catch-links' },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.tsx?$/u,
        stages: [ 'build-javascript' ],
        options: {
          failOnError: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
      },
    },
    { resolve: 'gatsby-plugin-minify-html' },
    { resolve: 'gatsby-plugin-no-sourcemaps' },
    { resolve: 'gatsby-plugin-react-helmet' },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/u,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
        importer: jsonImporter({
          convertCase: true,
        }),
        postCssPlugins: [
          postcssCustomProperties(),
        ],
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: '@danbruegge/gatsby-plugin-stylelint',
      options: {
        files: [ 'src/**/*.scss' ],
        failOnError: true,
      },
    },
    {
      resolve: '@danbruegge/gatsby-plugin-stylelint',
      options: {
        files: [ 'src/**/*.tsx' ],
        customSyntax: 'postcss-styled',
        failOnError: true,
      },
    },
    {
      resolve: 'gatsby-plugin-ts',
      options: {
        fileName: 'typings/graphql-types.d.ts',
      },
    },
    { resolve: 'gatsby-source-local-git' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'contents/',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        plugins: [
          { resolve: 'gatsby-remark-attr' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 10,
            },
          },
          { resolve: '@rstacruz/gatsby-remark-component' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-external-links' },
          { resolve: 'gatsby-remark-embed-gist' },
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: true,
              maxWidth: 768,
              quality: 100,
              sizeByPixelDensity: true,
            },
          },
          { resolve: 'gatsby-remark-grid-tables' },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '¦',
              aliases: {
                xaml: 'xml',
              },
              languageExtensions: [
                {
                  extend: 'bash',
                  insertBefore: {
                    function: {
                      prompt: /^\$ /mu,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { resolve: 'gatsby-transformer-sharp' },
    { resolve: 'gatsby-transformer-yaml' },
    { resolve: 'historia-compat-plugin' },
    { resolve: 'historia-feed-plugin' },
    { resolve: 'historia-recotw-plugin' },
    {
      resolve: 'historia-taxonomy-plugin',
      options: {
        limit: 5,
        exclude: [
          '/programming/psp/error-codes',
          '/softwares/soarer/download',
          '/softwares/soarer/history',
        ],
      },
    },
    { resolve: 'historia-soarer-update-plugin' },
  ],
}
