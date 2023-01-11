import type { ComponentPropsWithRef, FunctionComponent } from 'react'
import isUrl from 'is-url'
import type { GatsbyLinkProps } from 'gatsby-link'
import { Link as GatsbyLink } from 'gatsby-link'

const Link: FunctionComponent<GatsbyLinkProps<unknown> & LinkProps> = ({
  to,
  href,
  as,
  ref,
  target,
  ...rest
}) => {
  const dest = (to || href) ?? ''

  return isUrl(dest) || target ? (
    <a href={dest} ref={ref} target={target ?? '_blank'} rel="nofollow noopener noreferrer" {...rest} />
  ) : rest.download ? (
    <a href={dest} ref={ref} {...rest} />
  ) : dest === '#' ? (
    <a ref={ref} {...rest} />
  ) : (
    <GatsbyLink to={dest} {...rest} />
  )
}

interface LinkProps extends ComponentPropsWithRef<'a'> {
  as?: string
}

export default Link
