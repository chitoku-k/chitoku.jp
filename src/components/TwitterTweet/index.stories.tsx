import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react-webpack5'

import type { TwitterTweetProps } from 'components/TwitterTweet'
import TwitterTweet from 'components/TwitterTweet'

const meta: Meta = {
  component: TwitterTweet,
  globals: {
    backgrounds: {
      value: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<TwitterTweetProps> = props => (
  <LocationProvider history={history}>
    <TwitterTweet {...props} />
  </LocationProvider>
)

export default meta
export const Default = Template
Default.args = {
  id: '1097194006700675073',
}
