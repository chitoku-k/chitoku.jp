import React from 'react'
import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import type { Meta, Story } from '@storybook/react'

import '../../styles/styles.scss'
import messages from 'translations/ja.yml'
import type { SimplePaginationProps } from 'components/Pagination'
import { SimplePagination } from 'components/Pagination'

const meta: Meta = {
  component: SimplePagination,
  title: 'Components/SimplePagination',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: Story<SimplePaginationProps> = props => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <SimplePagination {...props} />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
Default.args = {
  prev: {
    title: 'Lorem ipsum',
    to: '/1',
  },
  next: {
    title: 'Lorem ipsum',
    to: '/3',
  },
}
