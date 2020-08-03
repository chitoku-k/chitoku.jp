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
      border-top: none;
      border-radius: 0;
    }
    > a {
      background-color: var(--nav-hover);
      color: var(--nav-color);
    }
  }
  .dropdown-menu {
    display: none;
    margin: 0;
    padding: 0;
    background-clip: border-box;
    border-color: var(--nav-border);
    &,
    > .active > a {
      background-color: var(--nav-background);
    }
  }
  .sub-menu {
    position: static !important;
    opacity: 1 !important;
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
    color: var(--nav-color);
    padding: 20px 30px;
    transition: background-color 0.3s;
    white-space: nowrap;
    &:hover,
    &:focus {
      background-color: var(--nav-hover);
      color: var(--nav-color);
      text-decoration: none;
    }
    ${media.md.up()} {
      padding: 20px 24px;
    }
    ${media.sm.down()} {
      padding: 12px;
    }
  }
  .dropdown-menu > li > & {
    padding: 15px 24px;
  }
  &.dropdown-toggle::after {
    margin-left: 4px;
    ${media.sm.down()} {
      display: none;
    }
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
  onSelect?: () => void
}

interface NavItemProps extends DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  dropdown?: boolean
}

export default NavItem
