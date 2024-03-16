import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import messages from 'translations/ja.yml'
import Navbar from 'components/Navbar'
import { SearchProvider } from 'components/Search'

const meta: Meta = {
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn = () => (
  <IntlProvider locale="ja" messages={messages}>
    <SearchProvider>
      <LocationProvider history={history}>
        <Navbar location={history} />
      </LocationProvider>
    </SearchProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
