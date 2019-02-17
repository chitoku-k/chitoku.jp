import React, { FunctionComponent } from 'react'

import NavItem from 'components/NavItem'
import { NavigationLinkItem } from 'components/Navbar'

const NavDropdown: FunctionComponent<NavDropdownProps> = ({
  items,
  dropdown,
}) => (
  <>
    {items.map(item => <NavItem key={item.name} {...item} dropdown={dropdown} />)}
  </>
)

interface NavDropdownProps {
  items: NavigationLinkItem[]
  dropdown?: boolean
}

export default NavDropdown
