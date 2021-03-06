import type { FunctionComponent } from 'react'
import { useEffect, useRef } from 'react'
import type { TweetProps } from 'react-twitter-widgets'
import { Tweet } from 'react-twitter-widgets'
import { useMedia } from 'use-media'
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
  options = {},
  ...rest
}) => {
  options.lang = 'ja'
  options.theme = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window.ResizeObserver === 'undefined') {
      return
    }

    let innerWidth = window.innerWidth
    const observer = new ResizeObserver(() => {
      if (!ref.current?.firstElementChild) {
        return
      }

      const height = document.defaultView?.getComputedStyle(ref.current.firstElementChild).height
      if (!height || !parseInt(height, 10)) {
        return
      }

      const minHeight = ref.current.style.minHeight
      if (innerWidth !== window.innerWidth || !minHeight || parseInt(height, 10) > parseInt(minHeight, 10)) {
        innerWidth = window.innerWidth
        ref.current.style.minHeight = height
      }
    })

    if (ref.current?.firstElementChild) {
      observer.observe(ref.current.firstElementChild)
    }

    return () => observer.disconnect()
  }, [ ref ])

  return (
    <div className={styles.wrapper} ref={ref}>
      <Tweet
        tweetId={id}
        options={options}
        renderError={renderError({ id })}
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
