import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { Pagination as BootstrapPagination, PageItemProps, SafeAnchorProps } from 'react-bootstrap'
import { BsPrefixProps } from 'react-bootstrap/helpers'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import messages from './messages'
import styles from './styles.module.scss'

export const isFirstPage = (page: Page): boolean => page.current === 1
export const isLastPage = (page: Page): boolean => page.current === page.total

export const hasPreviousPage = (page: Page): boolean => page.current > 1
export const hasNextPage = (page: Page): boolean => page.current < page.total

export const getPagePath = (num: number): string => `./${num === 1 ? '' : num}`
export const getPreviousPagePath = (page: Page): string => hasPreviousPage(page) ? getPagePath(page.current - 1) : '#'
export const getNextPagePath = (page: Page): string => hasNextPage(page) ? getPagePath(page.current + 1) : '#'

const PaginationItem: FunctionComponent<PaginationItemProps & Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, keyof PaginationItemProps>> = ({
  visible,
  direction,
  className,
  ...rest
}) => (
  <BootstrapPagination.Item className={clsx(
    styles.paginationItem,
    !visible && styles.hidden,
    !direction && styles.numbers,
    direction === 'prev' && styles.prev,
    direction === 'next' && styles.next,
    className,
  )} {...rest} />
)

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
        <PaginationItem key={i} visible active={i + 1 === page.current} href={getPagePath(i + 1)}>{i + 1}</PaginationItem>
      ))}
      <PaginationItem direction="next" visible={hasNextPage(page)} href={getNextPagePath(page)}>
        {formatMessage(messages.next_page)}
      </PaginationItem>
    </BootstrapPagination>
  )
}

export const SimplePagination: FunctionComponent<HTMLAttributes<HTMLUListElement> & BsPrefixProps<'ul'> & SimplePaginationProps> = ({
  prev,
  next,
  ...rest
}) => {
  const { formatMessage } = useIntl()

  return (
    <BootstrapPagination className={styles.simplePagination} {...rest}>
      <PaginationItem className={styles.simplePaginationItem} direction="prev" visible={Boolean(prev)} href={prev ? prev.to : '#'}>
        {prev ? (
          <>
            <span className={styles.icon}>{formatMessage(messages.prev)}</span>
            <span>{prev.title}</span>
          </>
        ) : null}
      </PaginationItem>
      <PaginationItem className={styles.simplePaginationItem} direction="next" visible={Boolean(next)} href={next ? next.to : '#'}>
        {next ? (
          <>
            <span>{next.title}</span>
            <span className={styles.icon}>{formatMessage(messages.next)}</span>
          </>
        ) : null}
      </PaginationItem>
    </BootstrapPagination>
  )
}

export const PaginationContainer: FunctionComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  ref,
  className,
  ...rest
}) => (
  <aside className={clsx(styles.container, className)} {...rest} />
)

export interface Page {
  current: number
  total: number
}

interface PaginationProps {
  page: Page
}

interface PaginationItemProps extends PageItemProps, SafeAnchorProps {
  direction?: 'prev' | 'next'
  visible?: boolean
}

interface SimplePaginationItem {
  title: ReactNode
  to: string
}

interface SimplePaginationProps {
  prev?: SimplePaginationItem | null
  next?: SimplePaginationItem | null
}

export default Pagination
