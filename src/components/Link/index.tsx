import React, { AnchorHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react'
import isUrl from 'is-url'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'

import { ArticleWrapper } from 'components/Article'

const isAnchor = (to: string): boolean => to.startsWith('#')

const Link: FunctionComponent<GatsbyLinkProps<{}> & LinkProps & Partial<ArticleWrapper>> = ({
  to,
  href,
  children,
  ref,
  target,
  article,
  ...rest
}) => {
  const dest = (to || href) ?? ''
  return isUrl(dest) || target ? (
    <a href={dest} ref={ref} target={target ?? '_blank'} rel="nofollow noopener noreferrer" {...rest}>{children}</a>
  ) : isAnchor(dest) ? (
    <a href={dest} ref={ref} {...rest}>{children}</a>
  ) : (
    <GatsbyLink to={dest} {...rest}>{children}</GatsbyLink>
  )
}

interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  to?: string
}

export default Link
