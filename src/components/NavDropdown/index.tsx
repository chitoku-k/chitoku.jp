import type { FunctionComponent } from 'react'

import NavItem from 'components/NavItem'
import type { NavigationLinkItem } from 'components/Navbar'

/* eslint-disable react/jsx-no-useless-fragment */
const NavDropdown: FunctionComponent<NavDropdownProps> = ({
  items,
  dropdown,
}) => (
  <>
    {items.map(item => <NavItem key={item.name} {...item} dropdown={dropdown} />)}
  </>
)
/* eslint-enable react/jsx-no-useless-fragment */

interface NavDropdownProps {
  items: NavigationLinkItem[]
  dropdown?: boolean
}

export default NavDropdown
