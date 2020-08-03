import React, { FunctionComponent, useCallback, useState } from 'react'
import { Nav as BootstrapNav, Navbar as BootstrapNavbar, Container, NavbarProps, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

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
  background-color: var(--nav-background);
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

const NavbarWrapper: FunctionComponent<NavbarCoreProps> = ({
  search,
  ...props
}) => (
  <BootstrapNavbar {...props} />
)

const NavbarCore = styled(NavbarWrapper)<NavbarCoreProps>`
  background-color: transparent;
  margin-bottom: 0;
  padding: 0 15px;
  border-radius: 0;
  border: none;
  ${media.sm.down()} {
    display: ${({ search }) => search ? 'none' : 'block'};
  }
  ${media.md.up()} {
    .dropdown:hover .dropdown-menu {
      display: block;
    }
  }
`

const Nav = styled(BootstrapNav)`
  flex-wrap: nowrap;
  > .active > a {
    &,
    &:hover,
    &:focus {
      background-color: var(--nav-active);
      color: var(--nav-color);
    }
  }
`

const SearchIcon = styled.li`
  ${media.md.up()} {
    display: none;
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
          <NavbarCore search={search}>
            <Row>
              <Nav forwardedAs="ul">
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

interface NavbarCoreProps extends NavbarProps {
  search: boolean
}

export default Navbar
