import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import Header from 'components/Header'

const meta: Meta = {
  component: Header,
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn = () => (
  <LocationProvider history={history}>
    <Header />
  </LocationProvider>
)

export default meta
export const Default = Template
