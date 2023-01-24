import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { Dropdown } from 'react-bootstrap'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

import type { NavigationLinkItem } from 'components/Navbar'
import NavDropdown from 'components/NavDropdown'
import Link from 'components/Link'

export const NavLink: typeof Link = ({
  className,
  ...rest
}) => (
  <Link className={clsx(styles.link, className)} {...rest} />
)

const NavItem: FunctionComponent<BootstrapNavItemProps & NavigationLinkItem & NavItemProps> = ({
  location,
  name,
  to,
  items,
  dropdown,
  className,
  ...rest
}) => items ? (
  <Dropdown id={to} className={clsx(styles.dropdown, to === location.pathname && 'active', className)} bsPrefix={dropdown ? 'dropdown' : 'sub'} as="li">
    <NavLink to={to} className={clsx(dropdown && 'dropdown-toggle')}>
      {name}
    </NavLink>
    <Dropdown.Menu as="ul" show bsPrefix={dropdown ? 'dropdown-menu' : 'sub-menu'}>
      <NavDropdown location={location} dropdown={dropdown} items={items} />
    </Dropdown.Menu>
  </Dropdown>
) : (
  <li className={clsx(to === location.pathname && 'active', className)} {...rest}>
    <NavLink to={to}>
      {name}
    </NavLink>
  </li>
)

interface BootstrapNavItemProps {
  active?: boolean
  activeHref?: string
  activeKey?: string
  onSelect?: () => void
}

interface NavItemProps extends ComponentPropsWithoutRef<'li'> {
  location: {
    pathname: string
  }
  dropdown?: boolean
}

export default NavItem
