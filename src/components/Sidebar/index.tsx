import React from 'react'
import * as Bootstrap from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { injectIntl } from 'react-intl'
import { Location, WindowLocation } from '@reach/router'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import messages from './messages'
import {
  TwitterShareButton,
  FacebookShareButton,
  PocketShareButton,
  HatenaShareButton,
  TumblrShareButton,
} from './buttons'
import { ArticleItem } from 'components/Article'
import { NavigationLinkItem } from 'components/Navbar'
import { withMetadata } from 'components/Metadata'
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
      sidebar {
        name
        to
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
          path
          attributes: frontmatter {
            title
            created
            category {
              ...Category
            }
          }
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
  display: inline-flex;
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
    &.iconless {
      list-style: none;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  ${media.greaterThan('small-pc')`
    padding-left: 28px;
  `}
`

const SidebarItemListIcon = styled(FontAwesome)`
  margin-left: -1.75em;
  padding-right: 1.75em;
  width: 1.5em;
`

const SidebarItemAttribute = styled.div`
  display: inline-block;
  margin: 8px 4px 4px 0;
  color: #757575;
  font-size: 75%;
  font-variant-numeric: tabular-nums;
  .fa {
    margin-right: 4px;
  }
  & + & {
    &::before {
      content: "•";
      margin-right: 4px;
    }
  }
`

const SidebarItemCategory = styled(SidebarItemAttribute)`
  a {
    color: #757575;
  }
`

const ShareButtonContainer = styled.div`
  padding: 5px 0 0;
  display: flex;
  justify-content: center;
`

const FeedIconLink = styled(Link)`
  background-color: #f76204;
  color: white !important;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 12px;
  border-radius: 4px;
  text-decoration: none !important;
  transition: background-color 0.3s;
  font-weight: normal;
  &:hover {
    background-color: #e34e00;
  }
`

const FeedIcon = styled(FontAwesome)`
  margin: 0 3px -1px;
`

const Sidebar = injectIntl<SidebarProps>(withMetadata(function Sidebar({
  location,
  metadata: {
    title,
  },
  intl: {
    formatDate,
    formatMessage,
  },
}) {
  const {
    site: {
      siteMetadata: {
        siteUrl,
      },
    },
    navigation: {
      sidebar,
    },
    latest,
  } = useStaticQuery(query) as SidebarQueryResult
  const url = siteUrl + location.pathname

  return (
    <SidebarContainer md={3} componentClass="aside">
      <SidebarItem>
        <SidebarItemTitle>
          {formatMessage(messages.share)}
        </SidebarItemTitle>
        <ShareButtonContainer>
          <TwitterShareButton title={title} url={url} />
          <FacebookShareButton url={url} />
          <PocketShareButton title={title} url={url} />
          <HatenaShareButton url={url} />
          <TumblrShareButton url={url} />
        </ShareButtonContainer>
      </SidebarItem>
      <SidebarItem>
        <SidebarItemTitle>
          <Link to="/latest">
            {formatMessage(messages.latest_articles)}
          </Link>
          <FeedIconLink to={siteUrl + '/feed/atom/'} target="_blank">
            <FeedIcon name="rss" />
            RSS
          </FeedIconLink>
        </SidebarItemTitle>
        <SidebarItemList>
          {latest.items.map(({ article }, index) => (
            <li className="iconless" key={index}>
              <SidebarItemListIcon name="coffee" />
              <Link to={article.path}>
                {article.attributes.title}
              </Link>
              <br />
              <SidebarItemAttribute>
                {article.attributes.created ? (
                  formatDate(article.attributes.created, {
                    year: 'numeric',
                    month: 'narrow',
                    day: 'numeric',
                  })
                ) : null}
              </SidebarItemAttribute>
              <SidebarItemCategory>
                {article.attributes.category ? (
                  <Link to={article.attributes.category.path}>
                    {article.attributes.category.name}
                  </Link>
                ) : null}
              </SidebarItemCategory>
            </li>
          ))}
        </SidebarItemList>
      </SidebarItem>
      <SidebarItem>
        <SidebarItemTitle>
          {formatMessage(messages.links)}
        </SidebarItemTitle>
        <SidebarItemList>
          {sidebar.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </SidebarItemList>
      </SidebarItem>
    </SidebarContainer>
  )
}))

export interface SidebarProps {
  location: WindowLocation
}

interface SidebarQueryResult {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  navigation: {
    sidebar: NavigationLinkItem[]
  }
  latest: {
    items: {
      article: ArticleItem
    }[]
  }
}

export default Sidebar
