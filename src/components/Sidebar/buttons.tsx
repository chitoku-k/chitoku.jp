import React, { FunctionComponent } from 'react'
import FontAwesome from 'react-fontawesome'
import { useIntl } from 'react-intl'
import { GatsbyLinkProps } from 'gatsby-link'
import styled from '@emotion/styled'

import messages from './messages'
import Link from 'components/Link'

interface ShareButtonProps {
  url: string
}

interface TwitterShareButtonProps extends ShareButtonProps {
  title: string | null
}

interface PocketShareButtonProps extends ShareButtonProps {
  title: string | null
}

interface ShareLinkProps extends GatsbyLinkProps<{}> {
  color: string
  hover: string
}

const ShareLink: FunctionComponent<ShareLinkProps> = ({
  children,
  color,
  hover,
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
  background-color: ${(props: ShareLinkProps) => props.color};
  &:hover {
    background-color: ${(props: ShareLinkProps) => props.hover};
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

export const TwitterShareButton: FunctionComponent<TwitterShareButtonProps> = ({
  title,
  url,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://twitter.com/share'
  const to = `${base}?text=${encodeURIComponent(title ?? '')}&url=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} color="#00b0ed" hover="#009cd9" title={formatMessage(messages.share_on, { service: formatMessage(messages.twitter) })}>
      <ShareButtonIcon name="twitter" />
    </ShareButton>
  )
}

export const FacebookShareButton: FunctionComponent<ShareButtonProps> = ({
  url,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://www.facebook.com/sharer.php'
  const to = `${base}?u=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} color="#315096" hover="#1d3c82" title={formatMessage(messages.share_on, { service: formatMessage(messages.facebook) })}>
      <ShareButtonIcon name="facebook" />
    </ShareButton>
  )
}

export const PocketShareButton: FunctionComponent<PocketShareButtonProps> = ({
  url,
  title,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://getpocket.com/edit'
  const to = `${base}?title=${encodeURIComponent(title ?? '')}&url=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} color="#ff2651" hover="#eb126e" title={formatMessage(messages.share_on, { service: formatMessage(messages.pocket) })}>
      <ShareButtonIcon name="get-pocket" />
    </ShareButton>
  )
}

export const HatenaShareButton: FunctionComponent<ShareButtonProps> = ({
  url,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://b.hatena.ne.jp/add'
  const to = `${base}?mode=confirm&url=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} color="#008fde" hover="#007bca" title={formatMessage(messages.share_on, { service: formatMessage(messages.hatena) })}>
      <HatenaShareButtonIcon name="hatena" />
    </ShareButton>
  )
}

export const TumblrShareButton: FunctionComponent<ShareButtonProps> = ({
  url,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://www.tumblr.com/share/link'
  const to = `${base}?url=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} color="#35465c" hover="#213248" title={formatMessage(messages.share_on, { service: formatMessage(messages.twitter) })}>
      <ShareButtonIcon name="tumblr" />
    </ShareButton>
  )
}
