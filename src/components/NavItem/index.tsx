import React, { FunctionComponent, DetailedHTMLProps } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { Location } from '@reach/router'
import styled from 'styled-components'

import { media } from 'components/Layout'
import { NavigationLinkItem } from 'components/Navbar'
import NavDropdown from 'components/NavDropdown'
import Link from 'components/Link'

const getClassName = (active: boolean, dropdown: boolean | undefined, className: string): NavItemAttributes => {
  return {
    bsClass: dropdown ? 'dropdown' : 'sub',
    className: [ active ? 'active' : '', className ].filter(x => x).join(' '),
  }
}

const Caret = styled.span`
  margin-left: 4px;
  border-top: 4px solid;
  ${media.lessThan('sp')`
    display: none;
  `}
`

const Dropdown = styled(Bootstrap.Dropdown)`
  &.dropdown:hover {
    .dropdown-menu {
      border-top: none;
      border-radius: 0;
    }
    > a {
      color: #fefefe;
      background-color: #34495e;
    }
  }
  .dropdown-menu {
    border-color: #395168;
    padding: 0;
    background-clip: border-box;
    &,
    > .active > a {
      background-color: #44607b;
    }
  }
  .sub-toggle,
  .dropdown-toggle {
    display: none;
  }
`

export const NavLink = styled(Link)`
  .dropdown-menu > li > &,
  .navbar-nav.nav > li > & {
    color: white;
    padding: 20px 30px;
    transition: background-color 0.3s;
    &:hover,
    &:focus {
      color: #fefefe;
      background-color: #34495e;
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
`

const NavItem: FunctionComponent<NavItemProps & BootstrapNavItemProps & NavigationLinkItem> = ({
  name,
  to,
  items,
  dropdown,
  className = '',
  /* eslint-disable @typescript-eslint/no-unused-vars */
  activeHref,
  activeKey,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...rest
}) => (
  <Location>
    {({ location }) => items ? (
      <Dropdown componentClass="li" id={to} {...getClassName(to === location.pathname, dropdown, className)}>
        <NavLink to={to}>
          {name}
          {dropdown ? (
            <Caret className="caret" />
          ) : null}
        </NavLink>
        <Bootstrap.Dropdown.Toggle />
        <Bootstrap.Dropdown.Menu>
          <NavDropdown dropdown={dropdown} items={items} />
        </Bootstrap.Dropdown.Menu>
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

interface NavContentProps {
  arrow?: boolean | NavigationLinkItem[]
}

interface NavItemAttributes {
  bsClass: 'dropdown' | 'sub'
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
