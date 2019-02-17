import React, { HTMLProps, FunctionComponent, ReactNode } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { injectIntl } from 'react-intl'

import messages from './messages'

const getVisibility = (className: string, visible: boolean) => [ className, visible ? 'visible' : 'hidden' ].join(' ')

const Pagination = injectIntl<PaginationProps>(function Pagination({
  page,
  intl: {
    formatMessage,
  },
}) {
  return (
    <Bootstrap.Pagination>
      <Bootstrap.Pagination.Item className={getVisibility('prev', hasPreviousPage(page))} href={getPreviousPagePath(page)}>
        {formatMessage(messages.prev_page)}
      </Bootstrap.Pagination.Item>
      {[...Array(page.total).keys()].map(i => (
        <Bootstrap.Pagination.Item key={i} href={getPagePath(i + 1)} active={i + 1 === page.current}>{i + 1}</Bootstrap.Pagination.Item>
      ))}
      <Bootstrap.Pagination.Item className={getVisibility('next', hasNextPage(page))} href={getNextPagePath(page)}>
        {formatMessage(messages.next_page)}
      </Bootstrap.Pagination.Item>
    </Bootstrap.Pagination>
  )
})

export const PaginationContainer: FunctionComponent = ({
  children,
}) => (
  <aside className="pagination-wrapper">
    {children}
  </aside>
)

export const SimplePagination = injectIntl<HTMLProps<Bootstrap.Pagination> & SimplePaginationProps>(function SimplePagination({
  prev,
  next,
  intl: {
    formatMessage,
  },
  ...rest
}) {
  return (
    <Bootstrap.Pagination {...rest}>
      <Bootstrap.Pagination.Item className={getVisibility('next', !!next)} href={next && next.to || '#'}>
        {next ? (
          <>
            <span className="icon">{formatMessage(messages.next)}</span>
            <span>{next.title}</span>
          </>
        ) : null}
      </Bootstrap.Pagination.Item>
      <Bootstrap.Pagination.Item className={getVisibility('prev', !!prev)} href={prev && prev.to || '#'}>
        {prev ? (
          <>
            <span>{prev.title}</span>
            <span className="icon">{formatMessage(messages.prev)}</span>
          </>
        ) : null}
      </Bootstrap.Pagination.Item>
    </Bootstrap.Pagination>
  )
})

export const isFirstPage = (page: Page) => page.current === 1
export const isLastPage = (page: Page) => page.current === page.total

export const hasPreviousPage = (page: Page) => page.current > 1
export const hasNextPage = (page: Page) => page.current < page.total

export const getPagePath = (num: number) => './' + (num === 1 ? '' : num)
export const getPreviousPagePath = (page: Page) => hasPreviousPage(page) ? getPagePath(page.current - 1) : '#'
export const getNextPagePath = (page: Page) => hasNextPage(page) ? getPagePath(page.current + 1) : '#'

export interface Page {
  current: number
  total: number
}

interface PaginationProps {
  page: Page
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
