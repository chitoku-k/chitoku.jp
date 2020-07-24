import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { Pagination as BootstrapPagination, PageItemProps, SafeAnchorProps } from 'react-bootstrap'
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

const PaginationCore = styled(BootstrapPagination)`
  margin: 0;
  justify-content: center;
`

const PaginationItemWrapper: FunctionComponent<PaginationItemProps> = ({
  visible,
  ...props
}) => (
  <BootstrapPagination.Item {...props} />
)

const PaginationItem = styled(PaginationItemWrapper)<PaginationItemProps>`
  display: inline-block;
  ${media.sm.down()} {
    display: ${({ direction }) => direction ? 'inline-block' : 'none'};
  }
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  margin: ${({ direction }) => direction ? '0 9px' : '0 3px'};
  &&& > a,
  &&& > span {
    display: inline-block;
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 8px 16px;
    float: none;
  }
  > a {
    margin: 0;
    transition: background-color 0.3s;
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

const SimplePaginationIcon = styled.span`
`

const SimplePaginationItem = styled(PaginationItem)<PaginationItemProps>`
  width: calc(50% - 10px);
  margin: 0;
  &&& > a {
    display: flex;
    justify-content: ${({ direction }) => direction === 'prev' ? 'flex-start' : direction === 'next' ? 'flex-end' : ''};
    align-items: center;
    height: 100%;
    min-height: 4em;
    ${SimplePaginationIcon} {
      margin-left: ${({ direction }) => direction === 'next' ? '10px' : '0'};
      margin-right: ${({ direction }) => direction === 'prev' ? '10px' : '0'};
    }
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
`

const Pagination: FunctionComponent<PaginationProps> = ({
  page,
}) => {
  const { formatMessage } = useIntl()

  return (
    <PaginationCore>
      <PaginationItem direction="prev" visible={hasPreviousPage(page)} href={getPreviousPagePath(page)}>
        {formatMessage(messages.prev_page)}
      </PaginationItem>
      {[ ...Array(page.total).keys() ].map(i => (
        <PaginationItem key={i} visible active={i + 1 === page.current} href={getPagePath(i + 1)}>{i + 1}</PaginationItem>
      ))}
      <PaginationItem direction="next" visible={hasNextPage(page)} href={getNextPagePath(page)}>
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
      <SimplePaginationItem direction="prev" visible={Boolean(prev)} href={prev ? prev.to : '#'}>
        {prev ? (
          <>
            <SimplePaginationIcon>{formatMessage(messages.prev)}</SimplePaginationIcon>
            <span>{prev.title}</span>
          </>
        ) : null}
      </SimplePaginationItem>
      <SimplePaginationItem direction="next" visible={Boolean(next)} href={next ? next.to : '#'}>
        {next ? (
          <>
            <span>{next.title}</span>
            <SimplePaginationIcon>{formatMessage(messages.next)}</SimplePaginationIcon>
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
