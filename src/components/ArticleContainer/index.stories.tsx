import React from 'react'
import type { Meta, Story } from '@storybook/react'

import '../../styles/styles.scss'

import ArticleContainer from 'components/ArticleContainer'

const meta: Meta = {
  component: ArticleContainer,
  title: 'Components/ArticleContainer',
}

const Template: Story = () => (
  <ArticleContainer />
)

export default meta
export const Default = Template
