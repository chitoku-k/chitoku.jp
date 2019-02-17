import React, { FunctionComponent } from 'react'
import isUrl from 'is-url'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'

const Link: FunctionComponent<GatsbyLinkProps<{}>> = ({
  to,
  children,
  ref,
  target,
  ...rest
}) => (to && isUrl(to) || target) ? (
  <a href={to} ref={ref} target={target || '_blank'} rel="nofollow noopener noreferrer" {...rest}>{children}</a>
) : (
  <GatsbyLink to={to} {...rest}>{children}</GatsbyLink>
)

export default Link
