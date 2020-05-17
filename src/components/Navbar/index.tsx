import React, { FunctionComponent, useCallback, useState } from 'react'
import { Navbar as BootstrapNavbar, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import { NavigationLinkItemQuery, NavigationsYamlNav } from 'graphql-types'
import { media } from 'components/Layout'
import SearchForm from 'components/SearchForm'
import NavItem, { NavLink } from 'components/NavItem'

const query = graphql`
  query NavigationLinkItem {
    navigation: navigationsYaml {
      nav {
        name
        to
        items {
          name
          to
        }
      }
    }
  }
`

const NavContainer = styled.div`
  margin-bottom: 24px;
  background: #44607b;
  width: 100%;
  top: 0;
  z-index: 5;
  -webkit-overflow-scrolling: touch;
  ${media.md.up()} {
    margin-bottom: 15px;
  }
  ${media.lg.up()} {
    margin-bottom: 24px;
  }
  ${media.md.down()} {
    white-space: nowrap;
    margin-bottom: 0;
  }
  ${media.sm.down()} {
    overflow-x: auto;
  }
`

const NavbarRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  ${media.sm.down()} {
    height: 45px;
  }
  ${media.md.up()} {
    height: auto;
  }
`

const NavbarCore = styled(BootstrapNavbar)`
  background-color: transparent;
  margin-bottom: 0;
  padding: 0 15px;
  border-radius: 0;
  border: none;
  ${media.sm.down()} {
    &.search {
      display: none;
    }
  }
  ${media.md.up()} {
    .dropdown:hover .dropdown-menu {
      display: block;
    }
  }
`

const Nav = styled.ul`
  flex-wrap: nowrap;
  &.nav > .active > a {
    &,
    &:hover,
    &:focus {
      color: white;
      background-color: #2f4255;
    }
  }
  li.nav-icon {
    display: none;
    ${media.sm.down()} {
      display: table-cell;
    }
  }
  ${media.sm.down()} {
    margin: 0;
    > li {
      margin: 0;
      display: table-cell;
    }
  }
`

const SearchIcon = styled.li`
  ${media.md.up()} {
    .nav > & {
      display: none;
    }
  }
`

const Navbar: FunctionComponent = () => {
  const { navigation } = useStaticQuery<NavbarQueryResult>(query)

  const [ search, setSearch ] = useState(false)

  const openSearch = useCallback(() => setSearch(true), [])
  const closeSearch = useCallback(() => setSearch(false), [])

  if (!navigation) {
    throw new Error('Invalid data')
  }

  const { nav } = navigation

  return (
    <NavContainer>
      <Container>
        <NavbarRow>
          <NavbarCore className={search ? 'search' : ''}>
            <Row>
              <Nav className="nav navbar-nav">
                {nav.map(item => (
                  <NavItem key={item.to} {...item} dropdown>{item.items}</NavItem>
                ))}
                <SearchIcon onClick={openSearch}>
                  <NavLink to="#">
                    <FontAwesomeIcon icon={faSearch} />
                  </NavLink>
                </SearchIcon>
              </Nav>
            </Row>
          </NavbarCore>
          <SearchForm search={search} openSearch={openSearch} closeSearch={closeSearch} />
        </NavbarRow>
      </Container>
    </NavContainer>
  )
}

export type NavigationLinkItem = NavigationsYamlNav
type NavbarQueryResult = NavigationLinkItemQuery

export default Navbar
