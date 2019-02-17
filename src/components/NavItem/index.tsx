import React, { FunctionComponent, DetailedHTMLProps } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { Location } from '@reach/router'

import { NavigationLinkItem } from 'components/Navbar'
import NavDropdown from 'components/NavDropdown'
import Link from 'components/Link'

const getClassName = (active: boolean, dropdown: boolean | undefined, className: string) => {
  return {
    bsClass: dropdown ? 'dropdown' : 'sub',
    className: [ active ? 'active' : '', className ].filter(x => x).join(' '),
  }
}

const NavItem: FunctionComponent<NavItemProps & BootstrapNavItemProps & NavigationLinkItem> = ({
  name,
  to,
  menu,
  items,
  dropdown,
  className = '',
  activeHref,
  activeKey,
  ...rest
}) => (
  <Location>
    {({ location }) => items ? (
      <Bootstrap.Dropdown componentClass="li" id={to} {...getClassName(to === location.pathname, dropdown, className)}>
        <Link to={to}>
          {name}
          {dropdown ? (
            <span className="caret" />
          ) : null}
        </Link>
        <Bootstrap.Dropdown.Toggle style={{ display: 'none' }} />
        <Bootstrap.Dropdown.Menu>
          <NavDropdown dropdown={dropdown} items={items} />
        </Bootstrap.Dropdown.Menu>
      </Bootstrap.Dropdown>
    ) : (
      <li className={(to === location.pathname && !location.search ? 'active ' : '') + className} {...rest}>
        <Link to={to}>
          {name}
        </Link>
      </li>
    )}
  </Location>
)

interface NavContentProps {
  arrow?: boolean | NavigationLinkItem[]
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
