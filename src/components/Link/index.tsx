import type { AnchorHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react'
import isUrl from 'is-url'
import path from 'path'
import type { GatsbyLinkProps } from 'gatsby-link'
import GatsbyLink from 'gatsby-link'
import { useLocation } from '@reach/router'

const isAnchor = (to: string): boolean => to.startsWith('#')

const Link: FunctionComponent<GatsbyLinkProps<unknown> & LinkProps> = ({
  to,
  href,
  as,
  ref,
  target,
  ...rest
}) => {
  const { pathname } = useLocation()
  const dest = (to || href) ?? ''

  return isUrl(dest) || target ? (
    <a href={dest} ref={ref} target={target ?? '_blank'} rel="nofollow noopener noreferrer" {...rest} />
  ) : isAnchor(dest) || rest.download ? (
    <a href={dest} ref={ref} {...rest} />
  ) : (
    <GatsbyLink to={path.isAbsolute(dest) ? path.normalize(dest) : path.join(pathname, dest)} {...rest} />
  )
}

interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  as?: string
}

export default Link
