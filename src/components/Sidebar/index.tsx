import React, { FunctionComponent } from 'react'
import FontAwesome from 'react-fontawesome'
import * as Bootstrap from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import { Location, LinkProps } from '@reach/router'

import messages from './messages'
import { getShareItems, ShareServiceItem } from './services'
import { ArticleItem, getPathFromArticleFile } from 'components/Article'
import { NavigationLinkItem } from 'components/Navbar'
import { withMetadata, WithMetadataProps, MetadataProvider } from 'components/Metadata'
import NavItem from 'components/NavItem'
import Link from 'components/Link'

const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    navigation: navigationsYaml {
      items {
        name
        to
        menu
        items {
          name
          to
        }
      }
    }
    latest: allMarkdownRemark(
      filter: { frontmatter: { created: { ne: null } } }
      sort: { order: DESC, fields: [ frontmatter___created ] }
      limit: 5
    ) {
      items: edges {
        article: node {
          attributes: frontmatter {
            title
            created
          }
          ...File
        }
      }
    }
  }
`

const ShareLink: FunctionComponent<ShareLinkProps> = ({
  service: {
    url,
    font,
    name,
  },
  ...rest
}) => (
  <Link to={url} className={`share-button ${name}-icon`} {...rest}>
    <FontAwesome name={font} />
  </Link>
)

const Sidebar = injectIntl<SidebarProps>(withMetadata(function Sidebar({
  metadata: {
    title,
  },
  site: {
    siteMetadata: {
      siteUrl,
    },
  },
  navigation: {
    items,
  },
  latest,
  intl: {
    formatMessage,
  },
}) {
  return (
    <Bootstrap.Col md={3} componentClass="aside" id="sub-content-container" className="sticky">
      <div>
        <h2>{formatMessage(messages.share)}</h2>
        <div className="share-buttons-container">
          <Location>
            {({ location }) => getShareItems(title, siteUrl + location.pathname).map((item, index) => (
              <ShareLink key={index} service={item} title={formatMessage(messages.share_on, { service: formatMessage(item.service) })} />
            ))}
          </Location>
        </div>
      </div>
      <div>
        <h2>{formatMessage(messages.latest_articles)}</h2>
        <ul className="menu-container">
          {latest.items.map(({ article }, index) => (
            <li key={index}>
              <Link to={getPathFromArticleFile(article.file)}>
                {article.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{formatMessage(messages.links)}</h2>
        <ul className="menu-container">
          {items.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </ul>
      </div>
    </Bootstrap.Col>
  )
}))

interface SidebarProps {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  navigation: {
    items: NavigationLinkItem[]
  }
  latest: {
    items: {
      article: ArticleItem
    }[]
  }
}

interface ShareLinkProps extends LinkProps<{}> {
  service: ShareServiceItem
}

const QueryableSidebar: FunctionComponent = () => (
  <StaticQuery query={query}>
    {({ ...props }: WithMetadataProps & SidebarProps) => (
      <MetadataProvider>
        <Sidebar {...props} />
      </MetadataProvider>
    )}
  </StaticQuery>
)

export default QueryableSidebar
