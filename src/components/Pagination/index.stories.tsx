import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react-webpack5'

import messages from 'translations/ja.yml'
import type { PaginationProps } from 'components/Pagination'
import Pagination from 'components/Pagination'

const meta: Meta = {
  component: Pagination,
  globals: {
    backgrounds: {
      value: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<PaginationProps> = props => (
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
    base: '/',
    total: 5,
    current: 3,
  },
}
