import React, { FunctionComponent, DetailedHTMLProps, AnchorHTMLAttributes } from 'react'
import isUrl from 'is-url'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'

const isAnchor = (to: string) => to.startsWith('#')

const Link: FunctionComponent<GatsbyLinkProps<{}> & LinkProps> = function Link({
  to,
  href,
  children,
  ref,
  target,
  ...rest
}) {
  const dest = to || href || ''
  return isUrl(dest) || target ? (
    <a href={dest} ref={ref} target={target || '_blank'} rel="nofollow noopener noreferrer" {...rest}>{children}</a>
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
