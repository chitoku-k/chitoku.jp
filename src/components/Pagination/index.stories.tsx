import React from 'react'
import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import type { Meta, Story } from '@storybook/react'

import '../../styles/styles.scss'
import messages from 'translations/ja.yml'
import type { PaginationProps } from 'components/Pagination'
import Pagination from 'components/Pagination'

const meta: Meta = {
  component: Pagination,
  title: 'Components/Pagination',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: Story<PaginationProps> = props => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <Pagination {...props} />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
Default.args = {
  page: {
    total: 5,
    current: 3,
  },
}
