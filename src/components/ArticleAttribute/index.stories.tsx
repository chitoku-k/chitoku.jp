import React from 'react'
import { IntlProvider } from 'react-intl'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import messages from 'translations/ja.yml'
import type { ArticleAttributeProps } from 'components/ArticleAttribute'
import ArticleAttribute from 'components/ArticleAttribute'

const meta: Meta = {
  component: ArticleAttribute,
  title: 'Components/ArticleAttribute',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<ArticleAttributeProps> = props => (
  <IntlProvider locale="ja" messages={messages}>
    <LocationProvider history={history}>
      <ArticleAttribute {...props} />
    </LocationProvider>
  </IntlProvider>
)

export default meta
export const Default = Template
Default.args = {
  article: {
    attributes: {
      created: '2021-01-01T00:00:00+09:00',
      category: {
        name: 'プログラミング',
        path: '/programming/',
        thumbnail: 'programming',
      },
      tags: [
        {
          name: 'Node.js',
          slug: 'nodejs',
        },
        {
          name: 'JavaScript',
          slug: 'javascript',
        },
        {
          name: 'Gatsby',
          slug: 'gatsby',
        },
      ],
    },
  },
}
