import type { FunctionComponent } from 'react'
import React, { useCallback, useEffect, useRef } from 'react'
import type { TweetProps } from 'react-twitter-widgets'
import { Tweet } from 'react-twitter-widgets'
import { useMedia } from 'use-media'
import clsx from 'clsx'

import styles from './styles.module.scss'

import Link from 'components/Link'

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
    <blockquote className={clsx(styles.errorWrapper, 'twitter-tweet')}>
      <Link to={url}>
        {url}
      </Link>
    </blockquote>
  )
}

const renderError = (props: TwitterTweetProps) => function RenderTwitterTweetError() {
  return (
    <TwitterTweetError {...props} />
  )
}

const TwitterTweet: FunctionComponent<TwitterTweetProps> = ({
  id,
  options = {},
  ...rest
}) => {
  options.lang = 'ja'
  options.theme = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  const ref = useRef<HTMLDivElement>(null)
  const onLoad = useCallback(() => {
    if (ref.current?.style) {
      ref.current.style.minHeight = document.defaultView?.getComputedStyle(ref.current).height ?? ''
    }
  }, [ ref ])

  return (
    <div className={styles.wrapper} ref={ref}>
      <Tweet
        tweetId={id}
        options={options}
        onLoad={onLoad}
        renderError={renderError({ id, onLoad })}
        {...rest} />
    </div>
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
