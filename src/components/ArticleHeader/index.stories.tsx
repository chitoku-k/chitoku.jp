import type { Meta, StoryFn } from '@storybook/react-webpack5'

import type { ArticleHeaderProps } from 'components/ArticleHeader'
import ArticleHeader from 'components/ArticleHeader'

const meta: Meta = {
  component: ArticleHeader,
  globals: {
    backgrounds: {
      value: 'container',
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
