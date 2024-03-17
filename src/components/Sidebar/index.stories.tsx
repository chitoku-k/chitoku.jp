import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import messages from 'translations/ja.yml'
import type { SidebarProps } from 'components/Sidebar'
import Sidebar from 'components/Sidebar'

const meta: Meta = {
  component: Sidebar,
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<SidebarProps> = props => (
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
