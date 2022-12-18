import React from 'react'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, Story } from '@storybook/react'

import Header from 'components/Header'

const meta: Meta = {
  component: Header,
  title: 'Components/Header',
}

const history = createHistory(createMemorySource('/'))

const Template: Story = () => (
  <LocationProvider history={history}>
    <Header />
  </LocationProvider>
)

export default meta
export const Default = Template.bind({})
