import React, { FunctionComponent, useState } from 'react'
import * as Bootstrap from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { graphql, StaticQuery } from 'gatsby'
import { Location } from '@reach/router'
import styled from 'styled-components'

import SearchForm from 'components/SearchForm'
import NavItem from 'components/NavItem'
import { getSearchText } from 'components/SearchResult'

const query = graphql`
  query {
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
  }
`

const SearchIcon = styled.li`
  padding-right: 15px;
`

const Navbar: FunctionComponent<NavbarProps> = ({
  navigation: {
    items,
  },
}) => {
  const [ search, setSearch ] = useState(false)

  const openSearch = () => setSearch(true)
  const closeSearch = () => setSearch(false)

  return (
    <div id="nav-container">
      <Bootstrap.Navbar className={search ? 'search' : ''}>
        <ul className="nav navbar-nav">
          {items.filter(item => item.menu).map((item, index) => (
            <NavItem key={index} children={item.items} {...item} dropdown={true} />
          ))}
          <SearchIcon className="nav-icon" onClick={openSearch}>
            <a className="search-icon">
              <FontAwesome name="search" />
            </a>
          </SearchIcon>
        </ul>
        <Location>
          {({ location }) => (
            <SearchForm search={search} location={location} openSearch={openSearch} closeSearch={closeSearch} />
          )}
        </Location>
      </Bootstrap.Navbar>
    </div>
  )
}

export interface NavigationLinkItem {
  name: string
  to: string
  menu?: true
  items?: NavigationLinkItem[]
}

interface NavbarProps {
  navigation: {
    items: NavigationLinkItem[]
  }
}

const QueryableNavbar: FunctionComponent = () => (
  <StaticQuery query={query}>
    {({ navigation }: NavbarProps) => (
      <Navbar navigation={navigation} />
    )}
  </StaticQuery>
)

export default QueryableNavbar
