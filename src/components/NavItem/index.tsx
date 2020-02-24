import React, { DetailedHTMLProps, FunctionComponent } from 'react'
import { Dropdown as BootstrapDropdown } from 'react-bootstrap'
import { Location } from '@reach/router'
import styled from 'styled-components'

import { media } from 'components/Layout'
import { NavigationLinkItem } from 'components/Navbar'
import NavDropdown from 'components/NavDropdown'
import Link from 'components/Link'

const getClassName = (active: boolean, dropdown: boolean | undefined, className: string): NavItemAttributes => ({
  bsPrefix: dropdown ? 'dropdown' : 'sub',
  className: [ active ? 'active' : '', className ].filter(x => x).join(' '),
})

const Dropdown = styled(BootstrapDropdown)`
  position: relative;
  &.dropdown:hover {
    .dropdown-menu {
      display: block;
      border-top: none;
      border-radius: 0;
    }
    > a {
      color: #fefefe;
      background-color: #34495e;
    }
  }
  .dropdown-menu {
    display: none;
    border-color: #395168;
    margin: 0;
    padding: 0;
    background-clip: border-box;
    &,
    > .active > a {
      background-color: #44607b;
    }
  }
  .sub-menu {
    position: initial !important;
    opacity: initial !important;
    pointer-events: initial !important;
  }
  .sub-toggle,
  .dropdown-toggle {
    display: none;
  }
`

export const NavLink = styled(Link)`
  .dropdown-menu > li > &,
  .navbar-nav > li > & {
    display: block;
    color: white;
    padding: 20px 30px;
    transition: background-color 0.3s;
    white-space: nowrap;
    &:hover,
    &:focus {
      color: #fefefe;
      background-color: #34495e;
      text-decoration: none;
    }
    ${media.greaterThan('wide-pc')`
      padding: 20px 24px;
    `}
    ${media.lessThan('tablet')`
      padding: 20px;
    `}
    ${media.lessThan('sp')`
      padding: 12px;
    `}
  }
  .dropdown-menu > li > & {
    padding: 15px 24px;
  }
  &.dropdown-toggle::after {
    margin-left: 4px;
    ${media.lessThan('sp')`
      display: none;
    `}
  }
`

const NavItem: FunctionComponent<NavItemProps & BootstrapNavItemProps & NavigationLinkItem> = ({
  name,
  to,
  items,
  dropdown,
  className = '',
  ...rest
}) => (
  <Location>
    {({ location }) => items ? (
      <Dropdown forwardedAs="li" id={to} {...getClassName(to === location.pathname, dropdown, className)}>
        <NavLink to={to} className={dropdown ? 'dropdown-toggle' : ''}>
          {name}
        </NavLink>
        <BootstrapDropdown.Menu as="ul" show bsPrefix={dropdown ? 'dropdown-menu' : 'sub-menu'}>
          <NavDropdown dropdown={dropdown} items={items} />
        </BootstrapDropdown.Menu>
      </Dropdown>
    ) : (
      <li className={(to === location.pathname && !location.search ? 'active ' : '') + className} {...rest}>
        <NavLink to={to}>
          {name}
        </NavLink>
      </li>
    )}
  </Location>
)

interface NavItemAttributes {
  bsPrefix: 'dropdown' | 'sub'
  className: string
}

interface BootstrapNavItemProps {
  active?: boolean
  activeHref?: string
  activeKey?: string
  onSelect?: () => void | null
}

interface NavItemProps extends DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  dropdown?: boolean
}

export default NavItem
