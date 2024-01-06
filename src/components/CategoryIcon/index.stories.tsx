import React from 'react'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import type { CategoryIconProps } from 'components/CategoryIcon'
import CategoryIcon from 'components/CategoryIcon'
import computers from 'contents/taxonomies/categories/computers.yml'
import gadgets from 'contents/taxonomies/categories/gadgets.yml'
import programming from 'contents/taxonomies/categories/programming.yml'
import pspprogramming from 'contents/taxonomies/categories/psp.yml'
import soarer from 'contents/taxonomies/categories/soarer.yml'
import softwares from 'contents/taxonomies/categories/softwares.yml'
import windows from 'contents/taxonomies/categories/windows.yml'

const meta: Meta = {
  component: CategoryIcon,
  title: 'Components/CategoryIcon',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<CategoryIconProps> = props => (
  <LocationProvider history={history}>
    <CategoryIcon {...props} />
  </LocationProvider>
)

export default meta
export const Computers = Template.bind({})
Computers.args = {
  category: computers,
  to: computers.path,
}
export const Gadgets = Template.bind({})
Gadgets.args = {
  category: gadgets,
  to: gadgets.path,
}
export const Programming = Template.bind({})
Programming.args = {
  category: programming,
  to: programming.path,
}
export const PSPProgramming = Template.bind({})
PSPProgramming.args = {
  category: pspprogramming,
  to: pspprogramming.path,
}
export const Soarer = Template.bind({})
Soarer.args = {
  category: soarer,
  to: soarer.path,
}
export const Softwares = Template.bind({})
Softwares.args = {
  category: softwares,
  to: softwares.path,
}
export const Windows = Template.bind({})
Windows.args = {
  category: windows,
  to: windows.path,
}
