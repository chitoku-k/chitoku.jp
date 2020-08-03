import React, { FunctionComponent, useContext } from 'react'
import { Col } from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import { WindowLocation } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faRss } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { SidebarItemQuery } from 'graphql-types'
import messages from './messages'
import {
  FacebookShareButton,
  HatenaShareButton,
  PocketShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from './buttons'
import { MetadataContext } from 'components/Metadata'
import { media } from 'components/Layout'
import NavItem from 'components/NavItem'
import Link from 'components/Link'

const query = graphql`
  query SidebarItem {
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

const SidebarContainer = styled(Col)`
  padding-left: 20px;
  padding-right: 0;
  flex: 0 0 30%;
  max-width: 30%;
  width: 30%;
  top: 15px;
  position: static;
  position: sticky;
  ${media.md.down()} {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
`

const SidebarItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--containers-background);
  color: var(--containers-color);
  box-shadow: 0 2px 4px 0 var(--containers-shadow);
  border-radius: 3px;
  &:last-of-type {
    margin-bottom: 0;
    overflow: auto;
    min-height: 250px;
    -webkit-overflow-scrolling: touch;
  }
  ${media.md.down()} {
    margin: 15px 0 0 0;
    padding: 15px;
  }
  ${media.sm.down()} {
    border-radius: 0;
  }
`

const SidebarItemTitle = styled.h2`
  display: inline-flex;
  margin: 0 0 10px 0;
  font-size: 20px;
  padding-left: 8px;
  border-left: 1em solid var(--headings-primary);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  a {
    color: var(--containers-color);
  }
`

const LatestList = styled.ul`
  padding-left: 0;
  margin-top: 5px;
  margin-bottom: 0;
  li {
    list-style: none;
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const CategoryList = styled.ul`
  padding-left: 30px;
  margin-top: 5px;
  margin-bottom: 0;
  ${media.md.up()} {
    padding-left: 28px;
  }
`

const LatestItem = styled.li`
  display: inline-flex;
  align-items: flex-start;
  margin-bottom: 3px;
`

const LatestItemIcon = styled(FontAwesomeIcon)`
  margin-top: 4px;
  flex-shrink: 0;
`

const LatestItemBody = styled.div`
  margin-left: 10px;
`

const LatestItemTitle = styled.div``

const LatestItemMetadata = styled.div`
  display: inline-flex;
  align-items: center;
`

const LatestItemMetadataSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: var(--sidebar-description);
`

const LatestItemAttribute = styled.div`
  display: inline-block;
  color: var(--sidebar-description);
  font-size: 75%;
  font-variant-numeric: tabular-nums;
`

const LatestItemCategory = styled(LatestItemAttribute)`
  a {
    color: var(--sidebar-description);
  }
`

const ShareButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0 0;
`

const FeedIconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-left: 12px;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  background-color: var(--feed-background);
  color: var(--feed-color) !important;
  text-decoration: none !important;
  transition: background-color 0.3s;
  font-weight: normal;
  &:hover {
    background-color: var(--feed-hover);
  }
`

const FeedIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

const Sidebar: FunctionComponent<SidebarProps> = ({
  location,
}) => {
  const { formatMessage, formatDate } = useIntl()

  const { title } = useContext(MetadataContext)
  const {
    site,
    navigation,
    latest,
  } = useStaticQuery<SidebarQueryResult>(query)

  if (!site || !navigation) {
    throw new Error('Invalid data')
  }

  const {
    siteMetadata: {
      siteUrl,
    },
  } = site
  const { sidebar } = navigation
  const url = siteUrl + location.pathname

  return (
    <SidebarContainer forwardedAs="aside">
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
          <FeedIconLink to={`${siteUrl}/feed/atom/`} target="_blank">
            <FeedIcon icon={faRss} />
            RSS
          </FeedIconLink>
        </SidebarItemTitle>
        <LatestList>
          {latest.items.map(({ article }) => (
            <LatestItem key={article.path}>
              <LatestItemIcon icon={faCoffee} />
              <LatestItemBody>
                <LatestItemTitle>
                  <Link to={article.path}>
                    {article.attributes.title}
                  </Link>
                </LatestItemTitle>
                <LatestItemMetadata>
                  <LatestItemAttribute>
                    {article.attributes.created ? formatDate(new Date(article.attributes.created), {
                      year: 'numeric',
                      month: 'narrow',
                      day: 'numeric',
                    }) : null}
                  </LatestItemAttribute>
                  <LatestItemMetadataSeparator />
                  <LatestItemCategory>
                    {article.attributes.category ? (
                      <Link to={article.attributes.category.path}>
                        {article.attributes.category.name}
                      </Link>
                    ) : null}
                  </LatestItemCategory>
                </LatestItemMetadata>
              </LatestItemBody>
            </LatestItem>
          ))}
        </LatestList>
      </SidebarItem>
      <SidebarItem>
        <SidebarItemTitle>
          {formatMessage(messages.links)}
        </SidebarItemTitle>
        <CategoryList>
          {sidebar.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </CategoryList>
      </SidebarItem>
    </SidebarContainer>
  )
}

export interface SidebarProps {
  location: WindowLocation
}

type SidebarQueryResult = SidebarItemQuery

export default Sidebar
