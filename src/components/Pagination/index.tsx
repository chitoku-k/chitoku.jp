import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'
import { BsPrefixProps } from 'react-bootstrap/helpers'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'

import { media } from 'components/Layout'
import messages from './messages'

export const isFirstPage = (page: Page): boolean => page.current === 1
export const isLastPage = (page: Page): boolean => page.current === page.total

export const hasPreviousPage = (page: Page): boolean => page.current > 1
export const hasNextPage = (page: Page): boolean => page.current < page.total

export const getPagePath = (num: number): string => `./${num === 1 ? '' : num}`
export const getPreviousPagePath = (page: Page): string => hasPreviousPage(page) ? getPagePath(page.current - 1) : '#'
export const getNextPagePath = (page: Page): string => hasNextPage(page) ? getPagePath(page.current + 1) : '#'

const getVisibility = (className: string, visible: boolean): string => [ className, visible ? 'visible' : 'hidden' ].join(' ')

const PaginationCore = styled(BootstrapPagination)`
  margin: 0;
  justify-content: center;
`

const PaginationItem = styled(BootstrapPagination.Item)`
  .pagination > &,
  .pagination > &.prev,
  .pagination > &.next {
    display: inline-block;
    margin: 0 3px;
    > a,
    > span {
      display: inline-block;
      border: none;
      border-radius: 0;
      padding: 8px 16px;
      float: none;
    }
    > a {
      background-color: #efefef;
      color: #141414;
      margin: 0;
      transition: background-color 0.3s;
      &:hover {
        color: #141414;
        background-color: #cacaca;
      }
    }
    ${media.sm.down()} {
      display: none;
    }
  }
  .pagination > &.active > span {
    background-color: #e11010;
  }
  &.hidden {
    display: inline-block !important;
    visibility: hidden;
  }
  .pagination > &.prev,
  .pagination > &.next {
    margin: 0 9px;
    ${media.sm.down()} {
      display: inline-block;
    }
  }
`

const SimplePaginationCore = styled(BootstrapPagination)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  text-align: left;
  margin: 0;
  ${media.sm.down()} {
    flex-wrap: wrap;
  }
`

const SimplePaginationItem = styled(PaginationItem)`
  .pagination > &,
  .pagination > &.prev,
  .pagination > &.next {
    width: calc(50% - 10px);
    margin: 0;
    > a {
      display: flex;
      align-items: center;
      height: 100%;
      min-height: 4em;
    }
    ${media.sm.down()} {
      width: 100%;
      & + li {
        margin-top: 10px;
      }
      &.hidden {
        display: none !important;
        + li {
          margin-top: 0;
        }
      }
    }
  }
  .pagination > &.prev {
    > a {
      justify-content: flex-start;
      .icon {
        margin-right: 10px;
      }
    }
  }
  .pagination > &.next {
    > a {
      justify-content: flex-end;
      .icon {
        margin-left: 10px;
      }
    }
  }
`

const Pagination: FunctionComponent<PaginationProps> = ({
  page,
}) => {
  const { formatMessage } = useIntl()

  return (
    <PaginationCore>
      <PaginationItem className={getVisibility('prev', hasPreviousPage(page))} href={getPreviousPagePath(page)}>
        {formatMessage(messages.prev_page)}
      </PaginationItem>
      {[ ...Array(page.total).keys() ].map(i => (
        <PaginationItem key={i} href={getPagePath(i + 1)} active={i + 1 === page.current}>{i + 1}</PaginationItem>
      ))}
      <PaginationItem className={getVisibility('next', hasNextPage(page))} href={getNextPagePath(page)}>
        {formatMessage(messages.next_page)}
      </PaginationItem>
    </PaginationCore>
  )
}

export const PaginationContainer = styled.aside`
  text-align: center;
`

export const SimplePagination: FunctionComponent<HTMLAttributes<HTMLUListElement> & BsPrefixProps<'ul'> & SimplePaginationProps> = ({
  prev,
  next,
  ...rest
}) => {
  const { formatMessage } = useIntl()

  return (
    <SimplePaginationCore {...rest}>
      <SimplePaginationItem className={getVisibility('prev', Boolean(prev))} href={prev ? prev.to : '#'}>
        {prev ? (
          <>
            <span className="icon">{formatMessage(messages.prev)}</span>
            <span>{prev.title}</span>
          </>
        ) : null}
      </SimplePaginationItem>
      <SimplePaginationItem className={getVisibility('next', Boolean(next))} href={next ? next.to : '#'}>
        {next ? (
          <>
            <span>{next.title}</span>
            <span className="icon">{formatMessage(messages.next)}</span>
          </>
        ) : null}
      </SimplePaginationItem>
    </SimplePaginationCore>
  )
}

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
