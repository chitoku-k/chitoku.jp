import type { FunctionComponent, ReactElement } from 'react'

import NavItem from 'components/NavItem'

const NavDropdown: FunctionComponent<NavDropdownProps> = ({
  location,
  items,
  dropdown,
}) => items.map(item => (
  <NavItem key={item.name} location={location} {...item} items={null} dropdown={dropdown} />
)) as unknown as ReactElement

interface NavDropdownProps {
  location: {
    pathname: string
  }
  items: readonly Queries.NavigationsYamlNavItems[]
  dropdown?: boolean
}

export default NavDropdown
