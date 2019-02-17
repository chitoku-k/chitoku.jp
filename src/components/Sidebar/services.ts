import { FormattedMessage } from 'react-intl'
import messages from './messages'

export interface ShareServiceItem {
  name: string
  font: string
  service: FormattedMessage.MessageDescriptor
  url: string
}

export const getShareItems: (title: string | null, url: string) => ShareServiceItem[] = (title, url) => [
  {
    name: 'twitter',
    font: 'twitter',
    service: messages.twitter,
    url: `https://twitter.com/share?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'facebook',
    font: 'facebook',
    service: messages.facebook,
    url: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'google-plus',
    font: 'google-plus',
    service: messages.google_plus,
    url: `https://plus.google.com/share?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'hatena',
    font: 'hatena',
    service: messages.hatena,
    url: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'tumblr',
    font: 'tumblr',
    service: messages.tumblr,
    url: `https://www.tumblr.com/share/link?url=${encodeURIComponent(url)}`,
  },
]
