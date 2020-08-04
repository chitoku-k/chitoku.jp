import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGetPocket, faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useIntl } from 'react-intl'
import { GatsbyLinkProps } from 'gatsby-link'
import styled from 'styled-components'

import messages from './messages'
import Link from 'components/Link'
import { colors } from 'components/Layout'
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core'

type ShareLinkName = 'twitter' | 'facebook' | 'pocket' | 'hatena' | 'tumblr'

interface ShareButtonProps {
  url: string
}

interface TwitterShareButtonProps extends ShareButtonProps {
  title: string | null
}

interface PocketShareButtonProps extends ShareButtonProps {
  title: string | null
}

interface ShareLinkProps extends GatsbyLinkProps<unknown> {
  name: ShareLinkName
}

const hover = (name: ShareLinkName): ShareLinkName => `${name}Hover` as ShareLinkName

const hatena: IconDefinition = {
  prefix: 'fab',
  iconName: 'hatena' as IconName,
  icon: [
    14,
    12,
    [],
    'e001',
    'M 11.044922 0 L 11.044922 7.9863281 L 13.804688 7.9863281 L 13.804688 0 L 11.044922 0 z M 3.8144531 0.044921875 A 21.785 21.785 0 0 0 3.2285156 0.048828125 L 0 0.048828125 L 0 11.882812 L 3.3066406 11.882812 A 24.48 24.48 0 0 0 6.1835938 11.763672 A 3.859 3.859 0 0 0 7.6621094 11.292969 A 2.783 2.783 0 0 0 8.7890625 10.191406 A 3.3 3.3 0 0 0 9.1796875 8.5 A 3 3 0 0 0 8.4785156 6.4121094 A 2.935 2.935 0 0 0 6.5332031 5.5136719 A 3.262 3.262 0 0 0 8.1660156 4.6132812 A 2.356 2.356 0 0 0 8.671875 3 A 2.729 2.729 0 0 0 8.3222656 1.5839844 A 2.608 2.608 0 0 0 7.3496094 0.59960938 A 4.276 4.276 0 0 0 5.9882812 0.16796875 A 21.785 21.785 0 0 0 3.8144531 0.044921875 z M 3.9589844 2.6601562 A 3.031 3.031 0 0 1 5.2519531 2.9492188 A 1.1 1.1 0 0 1 5.6796875 3.8945312 A 0.978 0.978 0 0 1 5.2519531 4.7949219 A 3.7 3.7 0 0 1 3.6171875 5.0683594 L 2.9960938 5.0683594 L 2.9960938 2.6757812 L 3.65625 2.6757812 A 3.031 3.031 0 0 1 3.9589844 2.6601562 z M 4.4179688 7.1464844 A 2.951 2.951 0 0 1 5.7167969 7.4726562 A 1.234 1.234 0 0 1 6.1445312 8.5332031 A 1.034 1.034 0 0 1 5.6777344 9.4824219 A 3.22 3.22 0 0 1 4.0839844 9.7578125 L 2.9550781 9.7578125 L 2.9550781 7.15625 L 4.1230469 7.15625 A 2.951 2.951 0 0 1 4.4179688 7.1464844 z M 12.404297 8.7734375 A 1.594 1.613 0 0 0 10.810547 10.386719 A 1.594 1.613 0 0 0 12.404297 12 A 1.594 1.613 0 0 0 13.998047 10.386719 A 1.594 1.613 0 0 0 12.404297 8.7734375 z',
  ],
}

const ShareLink: FunctionComponent<ShareLinkProps> = ({
  children,
  ...props
}) => (
  <Link {...props}>
    {children}
  </Link>
)

const ShareButton = styled(ShareLink)`
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  width: 45px;
  min-height: 22px;
  margin-right: 7px;
  padding: 5px 0;
  border-radius: 6px;
  display: inline-flex;
  transition: background-color 0.3s;
  color: ${colors.share.color};
  background-color: ${({ name }) => colors.share[name]};
  &:hover {
    background-color: ${({ name }) => colors.share[hover(name)]};
  }
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${colors.share.color};
  }
`

const ShareButtonIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`

const HatenaShareButtonIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
`

export const TwitterShareButton: FunctionComponent<TwitterShareButtonProps> = ({
  title,
  url,
}) => {
  const { formatMessage } = useIntl()
  const base = 'https://twitter.com/share'
  const to = `${base}?text=${encodeURIComponent(title ?? '')}&url=${encodeURIComponent(url)}`

  return (
    <ShareButton to={to} name="twitter" title={formatMessage(messages.share_on, { service: formatMessage(messages.twitter) })}>
      <ShareButtonIcon icon={faTwitter} />
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
    <ShareButton to={to} name="facebook" title={formatMessage(messages.share_on, { service: formatMessage(messages.facebook) })}>
      <ShareButtonIcon icon={faFacebookF} />
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
    <ShareButton to={to} name="pocket" title={formatMessage(messages.share_on, { service: formatMessage(messages.pocket) })}>
      <ShareButtonIcon icon={faGetPocket} />
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
    <ShareButton to={to} name="hatena" title={formatMessage(messages.share_on, { service: formatMessage(messages.hatena) })}>
      <HatenaShareButtonIcon icon={hatena} />
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
    <ShareButton to={to} name="tumblr" title={formatMessage(messages.share_on, { service: formatMessage(messages.tumblr) })}>
      <ShareButtonIcon icon={faTumblr} />
    </ShareButton>
  )
}
