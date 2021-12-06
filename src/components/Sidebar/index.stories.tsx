import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import type { Meta, Story } from '@storybook/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { SidebarProps } from 'components/Sidebar'
import Sidebar from 'components/Sidebar'
import messages from 'translations/ja.yml'

const meta: Meta = {
  component: Sidebar,
  title: 'Components/Sidebar',
}

const history = createHistory(createMemorySource('/'))

const Template: Story<SidebarProps> = props => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <Sidebar {...props} />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
Default.args = {
  location: history.location,
}
