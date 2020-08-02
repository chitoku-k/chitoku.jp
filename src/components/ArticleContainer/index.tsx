import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react'
import styled from '@emotion/styled'

import { media } from 'components/Layout'

const MainContent = styled.article`
  background-color: var(--containers-background);
  color: var(--containers-color);
  padding: 20px;
  box-shadow: 0 2px 4px 0 var(--containers-shadow);
  border-radius: 3px;
  & + & {
    margin-top: 20px;
    ${media.md.down()} {
      margin-top: 15px;
    }
  }
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  ${media.md.down()} {
    padding: 15px;
  }
  ${media.sm.down()} {
    border-radius: 0;
  }
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
