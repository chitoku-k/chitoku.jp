import React from 'react'
import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

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

const Template: StoryFn<SimplePaginationProps> = props => (
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
    title: 'MiniTool Partition Wizard で SSD を引っ越してみた',
    to: '/1',
  },
  next: {
    title: 'Windows バックアップで NAS を使う',
    to: '/3',
  },
}
