import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import type { Meta, Story } from '@storybook/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import Footer from 'components/Footer'
import messages from 'translations/ja.yml'

const meta: Meta = {
  component: Footer,
  title: 'Components/Footer',
  parameters: {
    layout: 'fullscreen',
  },
}

const history = createHistory(createMemorySource('/'))

const Template: Story = () => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <Footer />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
