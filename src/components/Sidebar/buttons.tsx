import React, { FunctionComponent } from 'react'
import FontAwesome from 'react-fontawesome'
import { injectIntl } from 'react-intl'
import { GatsbyLinkProps } from 'gatsby-link'
import styled from 'styled-components'

import messages from './messages'
import Link from 'components/Link'

interface ShareButtonProps {
  url: string
}

interface TwitterShareButtonProps extends ShareButtonProps {
  title: string | null
}

interface ShareLinkProps extends GatsbyLinkProps<{}> {
  color: string
  hover: string
}

const ShareLink: FunctionComponent<ShareLinkProps> = ({
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  color,
  hover,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...props
}) => (
  <Link {...props}>
    {children}
  </Link>
)

const ShareButton = styled(ShareLink)`
  color: white;
  width: 45px;
  min-height: 22px;
  border-radius: 6px;
  margin-right: 7px;
  padding: 5px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  background-color: ${props => props.color};
  &:hover {
    background-color: ${props => props.hover};
  }
  &,
  .fa {
    box-sizing: content-box;
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: white;
    }
  }
`

const ShareButtonIcon = styled(FontAwesome)`
  font-size: 20px;
  text-align: center;
`

const HatenaShareButtonIcon = styled(ShareButtonIcon)`
  &::before {
    content: "B!";
    font-family: Verdana, sans-serif;
    font-weight: bold;
    word-wrap: initial;
  }
`

export const TwitterShareButton = injectIntl<TwitterShareButtonProps>(function TwitterShareButton({
  title,
  url,
  intl: {
    formatMessage,
  },
}) {
  const to = `https://twitter.com/share?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`
  return (
    <ShareButton to={to} color="#00b0ed" hover="#009cd9" title={formatMessage(messages.share_on, { service: formatMessage(messages.twitter) })}>
      <ShareButtonIcon name="twitter" />
    </ShareButton>
  )
})

export const FacebookShareButton = injectIntl<ShareButtonProps>(function FacebookShareButton({
  url,
  intl: {
    formatMessage,
  },
}) {
  const to = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`
  return (
    <ShareButton to={to} color="#315096" hover="#1d3c82" title={formatMessage(messages.share_on, { service: formatMessage(messages.facebook) })}>
      <ShareButtonIcon name="facebook" />
    </ShareButton>
  )
})

export const GooglePlusShareButton = injectIntl<ShareButtonProps>(function GooglePlusShareButton({
  url,
  intl: {
    formatMessage,
  },
}) {
  const to = `https://plus.google.com/share?url=${encodeURIComponent(url)}`
  return (
    <ShareButton to={to} color="#dd4b39" hover="#c93725" title={formatMessage(messages.share_on, { service: formatMessage(messages.google_plus) })}>
      <ShareButtonIcon name="google-plus" />
    </ShareButton>
  )
})

export const HatenaShareButton = injectIntl<ShareButtonProps>(function HatenaShareButton({
  url,
  intl: {
    formatMessage,
  },
}) {
  const to = `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(url)}`
  return (
    <ShareButton to={to} color="#008fde" hover="#007bca" title={formatMessage(messages.share_on, { service: formatMessage(messages.hatena) })}>
      <HatenaShareButtonIcon name="hatena" />
    </ShareButton>
  )
})

export const TumblrShareButton = injectIntl<ShareButtonProps>(function TumblrShareButton({
  url,
  intl: {
    formatMessage,
  },
}) {
  const to = `https://www.tumblr.com/share/link?url=${encodeURIComponent(url)}`
  return (
    <ShareButton to={to} color="#35465c" hover="#213248" title={formatMessage(messages.share_on, { service: formatMessage(messages.twitter) })}>
      <ShareButtonIcon name="tumblr" />
    </ShareButton>
  )
})
