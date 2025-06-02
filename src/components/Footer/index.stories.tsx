import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react-webpack5'

import messages from 'translations/ja.yml'
import Footer from 'components/Footer'

const meta: Meta = {
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn = () => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <Footer />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
