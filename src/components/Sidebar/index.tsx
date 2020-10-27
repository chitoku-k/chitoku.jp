import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl'
import type { WindowLocation } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faRss } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import messages from './messages'
import styles from './styles.module.scss'
import type { SidebarItemQuery } from 'graphql-types'

import {
  FacebookShareButton,
  HatenaShareButton,
  PocketShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from './buttons'
import { MetadataContext } from 'components/Metadata'
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
    <Col className={styles.container} as="aside">
      <div className={styles.item}>
        <h2 className={styles.title}>
          {formatMessage(messages.share)}
        </h2>
        <div className={styles.shareContainer}>
          <TwitterShareButton title={title} url={url} />
          <FacebookShareButton url={url} />
          <PocketShareButton title={title} url={url} />
          <HatenaShareButton url={url} />
          <TumblrShareButton url={url} />
        </div>
      </div>
      <div className={styles.item}>
        <h2 className={styles.title}>
          <Link to="/latest">
            {formatMessage(messages.latest_articles)}
          </Link>
          <Link className={styles.feed} to={`${siteUrl}/feed/atom/`} target="_blank">
            <FontAwesomeIcon className={styles.icon} icon={faRss} />
            RSS
          </Link>
        </h2>
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
                    {article.attributes.created ? formatDate(new Date(article.attributes.created), {
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
        <h2 className={styles.title}>
          {formatMessage(messages.links)}
        </h2>
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

type SidebarQueryResult = SidebarItemQuery

export default Sidebar
