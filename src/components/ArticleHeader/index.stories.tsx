import type { Meta, StoryFn } from '@storybook/react'

import type { ArticleHeaderProps } from 'components/ArticleHeader'
import ArticleHeader from 'components/ArticleHeader'

const meta: Meta = {
  component: ArticleHeader,
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const Template: StoryFn<ArticleHeaderProps> = props => (
  <ArticleHeader {...props} />
)

export default meta
export const Default = Template
Default.args = {
  title: 'Windows の自動再生を特定のドライブでのみ無効化する',
}
