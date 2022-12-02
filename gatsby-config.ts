import type { GatsbyConfig } from 'gatsby'
import * as dotenv from 'dotenv-safe'

import { description } from './package.json'
import { createQuery } from './plugins/historia-taxonomy-plugin'

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: process.env.HISTORIA_URL,
    title: description,
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        dryRun: process.env.GATSBY_UPDATE_INDEX !== 'true',
        appId: process.env.GATSBY_ALGOLIA_APPID,
        apiKey: process.env.GATSBY_ALGOLIA_APIKEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEXNAME,
        queries: [
          createQuery(),
        ],
        concurrentQueries: false,
      },
    },
    { resolve: 'gatsby-plugin-catch-links' },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        extensions: [ 'js', 'tsx' ],
        stages: [ 'build-javascript' ],
        failOnError: process.env.NODE_ENV === 'production',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-minify-html',
      options: {
        config: {
          conservativeCollapse: true,
        },
      },
    },
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
        cssLoaderOptions: {
          camelCase: 'only',
        },
      },
    },
    { resolve: 'gatsby-plugin-sharp' },
    {
      resolve: '@danbruegge/gatsby-plugin-stylelint',
      options: {
        files: [ 'src/**/*.scss' ],
        emitErrors: process.env.NODE_ENV === 'production',
      },
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: 'typings/gatsby-types.d.ts',
      },
    },
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
          { resolve: 'gatsby-remark-attr' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 10,
            },
          },
          { resolve: '@rstacruz/gatsby-remark-component' },
          { resolve: 'gatsby-remark-copy-linked-files' },
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
          { resolve: './plugins/historia-remark-plugin' },
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
