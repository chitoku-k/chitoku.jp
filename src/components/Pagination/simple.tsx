import type { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'
import type { BsPrefixProps } from 'react-bootstrap/helpers'
import { useIntl } from 'react-intl'

import messages from './messages'
import * as styles from './styles.module.scss'

import { PaginationItem } from './'

export const SimplePagination: FunctionComponent<BsPrefixProps<'ul'> & ComponentPropsWithoutRef<'ul'> & SimplePaginationProps> = ({
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

export interface SimplePaginationItem {
  title: ReactNode
  to: string
}

export interface SimplePaginationProps {
  prev?: SimplePaginationItem | null
  next?: SimplePaginationItem | null
}
