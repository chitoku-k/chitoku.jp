import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useCallback, useState } from 'react'
import { Navbar as BootstrapNavbar, Container, Nav, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

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

const SearchIcon: FunctionComponent<ComponentPropsWithoutRef<'li'>> = ({
  className,
  ...rest
}) => (
  <li className={clsx(styles.searchIcon, className)} {...rest} />
)

const Navbar: FunctionComponent<NavbarProps> = ({
  location,
}) => {
  const { navigation } = useStaticQuery<NavbarQueryResult>(query)

  const [ search, setSearch ] = useState(false)

  const openSearch = useCallback(() => setSearch(true), [])
  const closeSearch = useCallback(() => setSearch(false), [])

  if (!navigation) {
    throw new Error('Invalid data')
  }

  const { nav } = navigation

  return (
    <div className={styles.container}>
      <Container>
        <Row className={styles.row} xs="auto">
          <BootstrapNavbar className={clsx(styles.navbar, search && styles.search)}>
            <Row>
              <Nav className={styles.nav} as="ul">
                {nav.map(item => (
                  <NavItem key={item.to} location={location} {...item} dropdown />
                ))}
                <SearchIcon onClick={openSearch}>
                  <NavLink to="#">
                    <FontAwesomeIcon icon={faSearch} />
                  </NavLink>
                </SearchIcon>
              </Nav>
            </Row>
          </BootstrapNavbar>
          <SearchForm location={location} search={search} openSearch={openSearch} closeSearch={closeSearch} />
        </Row>
      </Container>
    </div>
  )
}

export type NavigationLinkItem = Queries.NavigationsYamlNav
type NavbarQueryResult = Queries.NavigationLinkItemQuery

interface NavbarProps {
  location: {
    pathname: string
  }
}

export default Navbar
