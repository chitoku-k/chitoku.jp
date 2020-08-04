import React, { FunctionComponent, useCallback, useContext, useEffect, useRef } from 'react'
import { Tweet, TweetProps } from 'react-twitter-widgets'
import styled, { ThemeContext } from 'styled-components'

import { Theme } from 'components/Layout'
import Link from '../Link'

const Wrapper = styled.div`
  margin: 20px auto;
`

const ErrorWrapper = styled.blockquote`
  margin: 20px auto;
  padding: 10px 15px;
`

const renderError = (props: TwitterTweetProps) => () => <TwitterTweetError {...props} />

const TwitterTweetError: FunctionComponent<TwitterTweetProps> = ({
  id,
  onLoad,
}) => {
  const base = 'https://twitter.com/i/status/'
  const url = `${base}${id}`

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (onLoad) {
      onLoad()
    }
  }, [ id ])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <ErrorWrapper className="twitter-tweet">
      <Link to={url}>
        {url}
      </Link>
    </ErrorWrapper>
  )
}

const TwitterTweet: FunctionComponent<TwitterTweetProps> = ({
  id,
  options = {},
  ...rest
}) => {
  const theme = useContext<Theme>(ThemeContext)
  options.lang = 'ja'
  options.theme = theme.mode

  const ref = useRef<HTMLDivElement>(null)
  const onLoad = useCallback(() => {
    if (ref.current?.style) {
      ref.current.style.minHeight = document.defaultView?.getComputedStyle(ref.current).height ?? ''
    }
  }, [ ref ])

  return (
    <Wrapper ref={ref}>
      <Tweet
        tweetId={id}
        options={options}
        onLoad={onLoad}
        renderError={renderError({ id, onLoad })}
        {...rest} />
    </Wrapper>
  )
}

interface TwitterTweetOptions {
  lang?: string
  theme?: string
}

interface TwitterTweetProps extends Omit<TweetProps, 'tweetId'> {
  id: string
  options?: TwitterTweetOptions
}

export default TwitterTweet
