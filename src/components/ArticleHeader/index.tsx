import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { Omit } from 'utility-types'
import styled from 'styled-components'

import { media } from 'components/Layout'

const MainContentHeader = styled.div`
  margin-bottom: 20px;
  + h2 {
    margin-top: 18px;
  }
`

const MainContentTitle = styled.h1`
  padding-left: 12px;
  padding-bottom: 8px;
  border-left: 14px solid #e11010;
  border-bottom: 1px solid #e11010;
  font-size: 200%;
  margin: 0;
  a {
    color: #111;
  }
  ${media.lessThan('tablet')`
    font-size: 130%;
    padding-top: 3px;
    padding-left: 7px;
    padding-bottom: 7px;
  `}
`

const ArticleHeader: FunctionComponent<ArticleHeaderProps & Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'title'>> = ({
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ref,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  title,
  ...rest
}) => (
  <MainContentHeader {...rest}>
    <MainContentTitle>{title}</MainContentTitle>
    {children}
  </MainContentHeader>
)

interface ArticleHeaderProps {
  title: ReactNode
}

export default ArticleHeader
