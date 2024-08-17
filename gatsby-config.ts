import type { GatsbyConfig } from 'gatsby'
import * as dotenv from 'dotenv-safe'

import { description } from './package.json'
import { createQuery } from './plugins/historia-taxonomy-plugin'

dotenv.config()

const config: GatsbyConfig = {
  trailingSlash: 'ignore',
  siteMetadata: {
    siteUrl: process.env.HISTORIA_URL,
    title: description,
  },
  graphqlTypegen: {
    generateOnBuild: true,
    documentSearchPaths: [ './gatsby-node.ts' ],
    typesOutputPath: 'typings/gatsby-types.d.ts',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        continueOnFailure: process.env.GATSBY_UPDATE_INDEX !== 'true',
        dryRun: process.env.GATSBY_UPDATE_INDEX !== 'true',
        appId: process.env.GATSBY_ALGOLIA_APPID,
        apiKey: process.env.GATSBY_ALGOLIA_APIKEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEXNAME,
        queries: [
          createQuery(),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: process.env.GATSBY_GOOGLE_ANALYTICS_ID
          ? [ process.env.GATSBY_GOOGLE_ANALYTICS_ID ]
          : [],
        gtagConfig: {
          cookie_flags: 'samesite=strict; secure',
        },
        pluginConfig: {
          respectDNT: true,
        },
      },
    },
    { resolve: 'gatsby-plugin-minify-html' },
    { resolve: 'gatsby-plugin-no-sourcemaps' },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: 'only',
        },
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
    { resolve: 'gatsby-plugin-svgr-svgo' },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        allExtensions: true,
        isTSX: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'contents/',
      },
    },
    { resolve: 'gatsby-source-local-git' },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        gfm: false,
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 10,
            },
          },
          { resolve: 'gatsby-remark-copy-linked-files' },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              gistCssUrlAddress: 'https://github.githubassets.com/assets/gist-embed-10fe821546f9.css',
            },
          },
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
          { resolve: 'gatsby-remark-remove-cjk-breaks' },
          { resolve: 'historia-remark-plugin' },
        ],
      },
    },
    { resolve: 'gatsby-transformer-sharp' },
    { resolve: 'gatsby-transformer-yaml' },
    { resolve: 'historia-feed-plugin' },
    {
      resolve: 'historia-taxonomy-plugin',
      options: {
        taxonomies: {
          limit: 5,
        },
        home: {
          limit: 10,
        },
      },
    },
    { resolve: 'historia-soarer-update-plugin' },
  ],
}

export default config
