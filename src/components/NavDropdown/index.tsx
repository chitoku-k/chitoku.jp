import type { FunctionComponent, ReactElement } from 'react'

import NavItem from 'components/NavItem'

const NavDropdown: FunctionComponent<NavDropdownProps> = ({
  items,
  dropdown,
}) => items.map(item => (
  <NavItem key={item.name} {...item} items={null} dropdown={dropdown} />
)) as unknown as ReactElement

interface NavDropdownProps {
  items: readonly Queries.NavigationsYamlNavItems[]
  dropdown?: boolean
}

export default NavDropdown
