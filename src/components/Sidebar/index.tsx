import type { FunctionComponent } from 'react'
import { Col } from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import type { WindowLocation } from '@gatsbyjs/reach-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faRss } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import messages from './messages'
import * as styles from './styles.module.scss'

import {
  FacebookShareButton,
  HatenaShareButton,
  PocketShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from './buttons'
import NavItem from 'components/NavItem'
import Link from 'components/Link'
import SubHeader from 'components/SubHeader'

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
      sort: { frontmatter: { created: DESC } }
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

const Sidebar: FunctionComponent<SidebarProps> = ({
  location,
}) => {
  const { formatMessage, formatDate } = useIntl()

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
    <Col className={styles.container} as="aside">
      <div className={styles.item}>
        <SubHeader className={styles.shareHeader}>
          {formatMessage(messages.share)}
        </SubHeader>
        <div className={styles.shareContainer}>
          <TwitterShareButton url={url} />
          <FacebookShareButton url={url} />
          <PocketShareButton url={url} />
          <HatenaShareButton url={url} />
          <TumblrShareButton url={url} />
        </div>
      </div>
      <div className={styles.item}>
        <SubHeader>
          {formatMessage(messages.latest_articles)}
          <Link className={styles.feed} to={`${siteUrl}/feed/atom/`} target="_blank">
            <FontAwesomeIcon className={styles.icon} icon={faRss} />
            RSS
          </Link>
        </SubHeader>
        <ul className={styles.latest}>
          {latest.items.map(({ article }) => (
            <li key={article.path} className={styles.latestItem}>
              <FontAwesomeIcon className={styles.icon} icon={faCoffee} />
              <div className={styles.body}>
                <div>
                  <Link to={article.path}>
                    {article.attributes.title}
                  </Link>
                </div>
                <div className={styles.metadata}>
                  <div className={styles.attribute}>
                    {typeof article.attributes.created === 'string' ? formatDate(new Date(article.attributes.created), {
                      year: 'numeric',
                      month: 'narrow',
                      day: 'numeric',
                    }) : null}
                  </div>
                  <span className={styles.separator} />
                  <div className={clsx(styles.attribute, styles.category)}>
                    {article.attributes.category ? (
                      <Link to={article.attributes.category.path}>
                        {article.attributes.category.name}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.item}>
        <SubHeader>
          {formatMessage(messages.links)}
        </SubHeader>
        <ul className={styles.categories}>
          {sidebar.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </ul>
      </div>
    </Col>
  )
}

export interface SidebarProps {
  location: WindowLocation
}

type SidebarQueryResult = Queries.SidebarItemQuery

export default Sidebar
