import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import type { PageItemProps } from 'react-bootstrap'
import { Pagination as BootstrapPagination } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import LinkContainer from 'components/LinkContainer'

import messages from './messages'
import * as styles from './styles.module.scss'

export const isFirstPage = (page: Page): boolean => page.current === 1
export const isLastPage = (page: Page): boolean => page.current === page.total

export const hasPreviousPage = (page: Page): boolean => page.current > 1
export const hasNextPage = (page: Page): boolean => page.current < page.total

export const getPagePath = (base: string, num: number): string => base + (num === 1 ? '' : base.endsWith('/') ? `${num}` : `/${num}`)
export const getPreviousPagePath = (page: Page): string => hasPreviousPage(page) ? getPagePath(page.base, page.current - 1) : '#'
export const getNextPagePath = (page: Page): string => hasNextPage(page) ? getPagePath(page.base, page.current + 1) : '#'

export const PaginationItem: FunctionComponent<Omit<ComponentPropsWithoutRef<'li'>, keyof PaginationItemProps> & PaginationItemProps> = ({
  href,
  visible,
  direction,
  className,
  ...rest
}) => {
  const item = (
    <BootstrapPagination.Item
      className={clsx(
        styles.paginationItem,
        !visible && styles.hidden,
        !direction && styles.numbers,
        direction === 'prev' && styles.prev,
        direction === 'next' && styles.next,
        className,
      )}
      {...rest}
    />
  )
  return href ? <LinkContainer to={href}>{item}</LinkContainer> : item
}

const Pagination: FunctionComponent<PaginationProps> = ({
  page,
}) => {
  const { formatMessage } = useIntl()

  return (
    <BootstrapPagination className={styles.pagination}>
      <PaginationItem direction="prev" visible={hasPreviousPage(page)} href={getPreviousPagePath(page)}>
        {formatMessage(messages.prev_page)}
      </PaginationItem>
      {[ ...Array(page.total).keys() ].map(i => (
        <PaginationItem
          key={i}
          visible
          active={i + 1 === page.current}
          href={i + 1 === page.current ? undefined : getPagePath(page.base, i + 1)}
        >
          {i + 1}
        </PaginationItem>
      ))}
      <PaginationItem direction="next" visible={hasNextPage(page)} href={getNextPagePath(page)}>
        {formatMessage(messages.next_page)}
      </PaginationItem>
    </BootstrapPagination>
  )
}

export const PaginationContainer: FunctionComponent<ComponentPropsWithoutRef<'aside'>> = ({
  className,
  ...rest
}) => (
  <aside className={clsx(styles.container, className)} {...rest} />
)

export interface Page {
  base: string
  current: number
  total: number
}

export interface PaginationProps {
  page: Page
}

interface PaginationItemProps extends PageItemProps {
  direction?: 'next' | 'prev'
  visible?: boolean
}

export * from './simple'
export default Pagination
