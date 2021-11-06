import React from 'react'
import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import type { Meta, Story } from '@storybook/react'

import messages from 'translations/ja.yml'
import Navbar from 'components/Navbar'
import Search from 'components/Search'

const meta: Meta = {
  component: Navbar,
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
  },
}

const history = createHistory(createMemorySource('/'))

const Template: Story = () => (
  <Search>
    <IntlProvider locale="ja" messages={messages}>
      <LocationProvider history={history}>
        <Navbar />
      </LocationProvider>
    </IntlProvider>
  </Search>
)

export default meta
export const Default = Template
