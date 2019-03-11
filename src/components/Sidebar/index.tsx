import React, { FunctionComponent } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import { Location } from '@reach/router'
import styled from 'styled-components'

import messages from './messages'
import {
  TwitterShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  HatenaShareButton,
  TumblrShareButton,
} from './buttons'
import { ArticleItem, getPathFromArticleFile } from 'components/Article'
import { NavigationLinkItem } from 'components/Navbar'
import { withMetadata, WithMetadataProps, MetadataProvider } from 'components/Metadata'
import { media } from 'components/Layout'
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

const SidebarContainer = styled(Bootstrap.Col)`
  padding-left: 20px;
  padding-right: 0;
  width: 30%;
  top: 15px;
  position: static;
  position: sticky;
  ${media.lessThan('tablet')`
    width: auto;
    padding: 0;
  `}
`

const SidebarItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  color: #111;
  box-shadow: 0 2px 4px 0 #c1c1c1;
  border-radius: 3px;
  &:last-child {
    overflow: auto;
    min-height: 250px;
    -webkit-overflow-scrolling: touch;
  }
  ${media.lessThan('tablet')`
    margin: 15px 0 0 0;
    padding: 15px;
  `}
`

const SidebarItemTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 20px;
  padding-left: 8px;
  border-left: 1em solid #e11010;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  a {
    color: #333;
  }
`

const SidebarItemList = styled.ul`
  padding-left: 30px;
  margin-bottom: 0;
  li {
    margin-bottom: 3px;
  }
  ${media.greaterThan('small-pc')`
    padding-left: 28px;
  `}
`

const ShareButtonContainer = styled.div`
  padding: 5px 0 0;
  display: flex;
  justify-content: center;
`

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
    <SidebarContainer md={3} componentClass="aside">
      <SidebarItem>
        <SidebarItemTitle>{formatMessage(messages.share)}</SidebarItemTitle>
        <ShareButtonContainer>
          <Location>
            {({ location }) => {
              const url = siteUrl + location.pathname
              return (
                <>
                  <TwitterShareButton title={title} url={url} />
                  <FacebookShareButton url={url} />
                  <GooglePlusShareButton url={url} />
                  <HatenaShareButton url={url} />
                  <TumblrShareButton url={url} />
                </>
              )
            }}
          </Location>
        </ShareButtonContainer>
      </SidebarItem>
      <SidebarItem>
        <SidebarItemTitle>{formatMessage(messages.latest_articles)}</SidebarItemTitle>
        <SidebarItemList>
          {latest.items.map(({ article }, index) => (
            <li key={index}>
              <Link to={getPathFromArticleFile(article.file)}>
                {article.attributes.title}
              </Link>
            </li>
          ))}
        </SidebarItemList>
      </SidebarItem>
      <SidebarItem>
        <SidebarItemTitle>{formatMessage(messages.links)}</SidebarItemTitle>
        <SidebarItemList>
          {items.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </SidebarItemList>
      </SidebarItem>
    </SidebarContainer>
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
