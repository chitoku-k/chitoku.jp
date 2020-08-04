import React, { AnchorHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react'
import isUrl from 'is-url'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'

import { ArticleWrapper } from 'components/Article'

const isAnchor = (to: string): boolean => to.startsWith('#')

const Link: FunctionComponent<GatsbyLinkProps<unknown> & LinkProps & Partial<ArticleWrapper>> = ({
  to,
  href,
  ref,
  target,
  article,
  ...rest
}) => {
  const dest = (to || href) ?? ''
  return isUrl(dest) || target ? (
    <a href={dest} ref={ref} target={target ?? '_blank'} rel="nofollow noopener noreferrer" {...rest} />
  ) : isAnchor(dest) ? (
    <a href={dest} ref={ref} {...rest} />
  ) : (
    <GatsbyLink to={dest} {...rest} />
  )
}

interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  to?: string
}

export default Link
