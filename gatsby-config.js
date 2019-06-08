const path = require('path')
const { description } = require('./package.json')
const { createQuery } = require('historia-taxonomy-plugin')

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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
      },
    },
    { resolve: 'gatsby-plugin-no-sourcemaps' },
    { resolve: 'gatsby-plugin-react-helmet' },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          path.resolve('node_modules/bootstrap-sass/assets/stylesheets'),
          path.resolve('node_modules/font-awesome/scss'),
          path.resolve('node_modules/prismjs'),
        ],
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
    { resolve: 'gatsby-plugin-styled-components' },
    { resolve: 'gatsby-plugin-ts-loader' },
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
          { resolve: 'gatsby-remark-component' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-external-links' },
          { resolve: 'gatsby-remark-embed-gist' },
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 768,
              quality: 100,
              sizeByPixelDensity: true,
            },
          },
          { resolve: 'gatsby-remark-grid-tables' },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: ':',
              aliases: {
                shell: 'bash',
                xaml: 'xml',
              },
            },
          },
          { resolve: '@weknow/gatsby-remark-twitter' },
          { resolve: 'historia-remark-plugin' },
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
