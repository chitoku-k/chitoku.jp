import React, { FunctionComponent, createContext } from 'react'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import { graphql, StaticQuery } from 'gatsby'
import { Location } from '@reach/router'

import messages from './messages'
import { AboutContactItem } from 'components/About'

const query = graphql`
  query {
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

let metadata: MetadataItem = {
  type: 'article',
  title: '',
  keywords: [],
  description: '',
  thumbnail: '',
}

const { Provider, Consumer } = createContext(metadata)

export const MetadataProvider: FunctionComponent = ({
  children,
}) => (
  <Provider value={metadata}>
    {children}
  </Provider>
)

export function withMetadata<T>(
  Component: React.ComponentType<T & WithMetadataProps>,
): React.ComponentType<T> {
  return function Metadata(props: T) {
    return (
      <Consumer>
        {context => (
          <Component {...props} metadata={context} />
        )}
      </Consumer>
    )
  }
}

const Metadata = injectIntl<MetadataProps & MetadataItem>(function Metadata({
  children,
  about: {
    contacts,
  },
  site: {
    siteMetadata: {
      siteUrl,
    },
  },
  intl: {
    formatMessage,
  },
  ...newState
}) {
  metadata = {
    ...metadata,
    ...newState,
    title: newState.title
      ? formatMessage(messages.titleTemplate, { title: newState.title })
      : formatMessage(messages.title),
  }

  return (
    <Location>
      {({ location }) => (
        <Helmet>
          <html lang="ja" />
          <meta property="og:type" content={metadata.type} />
          <meta property="og:url" content={siteUrl + location.pathname} />
          <meta name="twitter:card" content="summary" />
          <title>{metadata.title}</title>
          {['og:title', 'twitter:title'].map(property => (
            <meta key={property} property={property} content={metadata.title || ''} />
          ))}
          {metadata.description && ['og:description', 'description'].map(property => (
            <meta key={property} property={property} content={metadata.description} />
          ))}
          {metadata.thumbnail && ['og:image', 'twitter:image'].map(property => (
            <meta key={property} property={property} content={siteUrl + metadata.thumbnail} />
          ))}
          {metadata.keywords && metadata.keywords.length ? (
            <meta name="keywords" content={metadata.keywords.join()} />
          ) : null}
          {contacts
            .filter(contact => contact.primary)
            .flatMap(contact => contact.accounts)
            .map(({ url }, index) => (
              <link key={index} rel="me" href={url as string} />
            ))}
          {children}
        </Helmet>
      )}
    </Location>
  )
})

export interface WithMetadataProps {
  metadata: MetadataItem
}

interface MetadataProps {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  about: {
    contacts: AboutContactItem[]
  }
}

interface MetadataItem {
  type?: string
  title: string | null
  keywords?: string[]
  description?: string
  thumbnail?: string
}

const QueryableMetadata: FunctionComponent<MetadataItem> = ({
  ...rest
}) => (
  <StaticQuery query={query}>
    {({ about, site }: MetadataProps) => (
      <Metadata about={about} site={site} {...rest} />
    )}
  </StaticQuery>
)

export default QueryableMetadata
