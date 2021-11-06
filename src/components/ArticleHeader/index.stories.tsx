import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { ArticleHeaderProps } from 'components/ArticleHeader'
import ArticleHeader from 'components/ArticleHeader'

const meta: Meta = {
  component: ArticleHeader,
  title: 'Components/ArticleHeader',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const Template: Story<ArticleHeaderProps> = props => (
  <ArticleHeader {...props} />
)

export default meta
export const Default = Template
Default.args = {
  title: 'Windows の自動再生を特定のドライブでのみ無効化する',
}
