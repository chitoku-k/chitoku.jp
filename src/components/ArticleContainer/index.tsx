import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { media } from 'components/Layout'

const MainContent = styled.article`
  background: white;
  color: #111;
  padding: 20px;
  box-shadow: 0 2px 4px 0 #c1c1c1;
  border-radius: 3px;
  & + & {
    margin-top: 20px;
    ${media.lessThan('tablet')`
      margin-top: 15px;
    `}
  }
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  ${media.lessThan('tablet')`
    padding: 15px;
  `}
  ${media.lessThan('sp')`
    border-radius: 0;
  `}
`

const ArticleContainer: FunctionComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  children,
  ref,
  ...rest
}) => (
  <MainContent {...rest}>
    {children}
  </MainContent>
)

export default ArticleContainer
