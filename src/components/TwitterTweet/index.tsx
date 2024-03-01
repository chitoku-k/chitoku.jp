import type { FunctionComponent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { TweetProps } from 'react-twitter-widgets'
import { Tweet } from 'react-twitter-widgets'
import { useMedia } from 'react-use'
import clsx from 'clsx'

import * as styles from './styles.module.scss'

import Link from 'components/Link'

const TwitterTweetError: FunctionComponent<TwitterTweetProps> = ({
  id,
}) => {
  const base = 'https://twitter.com/i/status/'
  const url = `${base}${id}`

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
  options,
  ...rest
}) => {
  const tweetOptions = {
    ...options,
    lang: 'ja',
    theme: useMedia('(prefers-color-scheme: dark)', false) ? 'dark' : 'light',
  }

  const ref = useRef<HTMLDivElement>(null)
  const [ minHeight, setMinHeight ] = useState(0)

  useEffect(() => {
    if (!ref.current?.firstElementChild) {
      return undefined
    }

    const observer = new ResizeObserver(([ entry ]) => {
      const height = entry?.contentRect.height
      if (!height) {
        return
      }

      if (!minHeight || height !== minHeight) {
        setMinHeight(height)
      }
    })

    observer.observe(ref.current.firstElementChild)
    return () => observer.disconnect()
  }, [ ref, minHeight ])

  return (
    <div className={styles.wrapper} ref={ref} style={{ minHeight }}>
      <Tweet
        tweetId={id}
        options={tweetOptions}
        renderError={renderError({ id })}
        {...rest} />
    </div>
  )
}

interface TwitterTweetOptions {
  lang?: string
  theme?: string
}

export interface TwitterTweetProps extends Omit<TweetProps, 'tweetId'> {
  id: string
  options?: TwitterTweetOptions
}

export default TwitterTweet
