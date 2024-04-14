import type { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { JsonLd } from 'react-schemaorg'
import { graphql, useStaticQuery } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'
import type { BreadcrumbList, CreativeWork } from 'schema-dts'

import messages from './messages'

type ThumbnailURL = string
type ThumbnailFile = string | null | undefined
type ThumbnailPath<TURL extends string, TFile extends string | null | undefined> =
  TFile extends string
    ? `${TURL}/thumbnails/${TFile}.png`
    : `${TURL}/thumbnails/default.png`

const thumbnailPath =
  (url: ThumbnailURL, file: ThumbnailFile): ThumbnailPath<ThumbnailURL, ThumbnailFile> => `${url}/thumbnails/${file ?? 'default'}.png` as ThumbnailPath<ThumbnailURL, ThumbnailFile>

const query = graphql`
  query MetadataItem {
    site {
      siteMetadata {
        siteUrl
      }
    }
    about: aboutYaml {
      contacts {
        service
        primary
        accounts {
          name
          url
        }
      }
    }
  }
`

const Metadata: FunctionComponent<MetadataProps> = ({ ...metadata }) => {
  const location = useLocation()
  const { formatMessage, locale } = useIntl()
  const { about, site } = useStaticQuery<MetadataQueryResult>(query)

  if (!about || !site) {
    throw new Error('Invalid data')
  }

  const { contacts } = about
  const {
    siteMetadata: {
      siteUrl,
    },
  } = site

  const title = metadata.title
    ? formatMessage(messages.title_template, { title: metadata.title })
    : formatMessage(messages.title)

  return (
    <>
      <html lang={locale} />
      <meta property="og:type" content={metadata.type} />
      <meta property="og:url" content={siteUrl + location.pathname} />
      <meta name="twitter:card" content="summary" />
      <title>{title}</title>
      {[ 'og:title', 'twitter:title' ].map(property => (
        <meta key={property} property={property} content={title} />
      ))}
      {[ 'og:image', 'twitter:image' ].map(property => (
        <meta key={property} property={property} content={thumbnailPath(siteUrl, metadata.thumbnail)} />
      ))}
      {metadata.description ? [ 'og:description', 'description' ].map(property => (
        <meta key={property} property={property} content={metadata.description} />
      )) : null}
      {metadata.keywords?.length ? (
        <meta name="keywords" content={metadata.keywords.join()} />
      ) : null}
      {contacts
        .filter(contact => contact.primary)
        .flatMap(contact => contact.accounts)
        .map(({ url }) => (
          <link key={url} rel="me" href={url} />
        ))}
      <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/feed/rss2/`} />
      <link rel="alternate" type="application/atom+xml" href={`${siteUrl}/feed/atom/`} />
      {metadata.prev ? (
        <link rel="prev" href={metadata.prev} />
      ) : null}
      {metadata.next ? (
        <link rel="next" href={metadata.next} />
      ) : null}
      {metadata.breadcrumb ? (
        <JsonLd<BreadcrumbList> item={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': metadata.breadcrumb.map((item, position) => ({
            '@type': 'ListItem',
            position,
            'item': {
              '@type': 'Thing',
              ...item,
            },
          })),
        }} />
      ) : null}
      {metadata.created ? (
        <JsonLd<CreativeWork> item={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          'datePublished': metadata.created,
          'thumbnailUrl': thumbnailPath(siteUrl, metadata.thumbnail),
        }} />
      ) : null}
    </>
  )
}

type MetadataQueryResult = Queries.MetadataItemQuery

interface MetadataItem {
  type?: string
  title: string | null
  keywords?: string[]
  description?: string
  thumbnail?: string | null
  created?: string | null
  breadcrumb?: Breadcrumb[]
}

interface MetadataProps extends MetadataItem {
  prev?: string | null
  next?: string | null
}

export interface Breadcrumb {
  id: string
  name: string
}

export default Metadata
