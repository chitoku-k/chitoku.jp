import type { ComponentPropsWithoutRef, FunctionComponent, MouseEvent } from 'react'
import { cloneElement, isValidElement, useCallback } from 'react'
import type { GatsbyLinkProps } from 'gatsby-link'
import { navigate } from 'gatsby-link'

const LinkContainer: FunctionComponent<GatsbyLinkProps<object>> = ({
  to,
  children,
  onClick,
  state,
  replace,
  ...props
}) => {
  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    navigate(to, { state, replace })
  }, [ to, onClick, state, replace ])

  if (!isValidElement<ComponentPropsWithoutRef<'a'> & GatsbyLinkProps<unknown>>(children)) {
    throw new Error('Invalid element')
  }

  return cloneElement(children, {
    ...props,
    href: to,
    onClick: handleClick,
  })
}

export default LinkContainer
