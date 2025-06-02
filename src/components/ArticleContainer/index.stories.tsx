import type { Meta, StoryFn } from '@storybook/react-webpack5'

import ArticleContainer from 'components/ArticleContainer'

const meta: Meta = {
  component: ArticleContainer,
}

const Template: StoryFn = () => (
  <ArticleContainer />
)

export default meta
export const Default = Template
