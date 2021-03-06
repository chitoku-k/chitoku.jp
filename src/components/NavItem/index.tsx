import type { DetailedHTMLProps, FunctionComponent } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Location } from '@reach/router'
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
  name,
  to,
  items,
  dropdown,
  className,
  ...rest
}) => (
  <Location>
    {({ location }) => items ? (
      <Dropdown id={to} className={clsx(styles.dropdown, to === location.pathname && 'active', className)} bsPrefix={dropdown ? 'dropdown' : 'sub'} as="li">
        <NavLink to={to} className={clsx(dropdown && 'dropdown-toggle')}>
          {name}
        </NavLink>
        <Dropdown.Menu as="ul" show bsPrefix={dropdown ? 'dropdown-menu' : 'sub-menu'}>
          <NavDropdown dropdown={dropdown} items={items} />
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <li className={clsx(to === location.pathname && !location.search && 'active', className)} {...rest}>
        <NavLink to={to}>
          {name}
        </NavLink>
      </li>
    )}
  </Location>
)

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
