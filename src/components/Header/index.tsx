import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo.svg'
import { media } from 'components/Layout'
import Link from 'components/Link'

const HeaderContainer = styled.header`
  margin: 0 auto;
  padding: 0;
  ${media.greaterThan('small-pc')`
    padding: 0 15px;
  `}
  ${media.lessThan('sp')`
    margin: 8px 10px 16px;
  `}
`

const HeaderTitle = styled.h1`
  height: 40px;
  margin: 20px 0;
  ${media.lessThan('sp')`
    text-align: center;
    margin: 6px auto 0;
    &, svg {
      width: auto;
      height: 32px;
      max-width: 100%;
    }
  `}
`

const HeaderLink = styled(Link)`
  display: inline-block;
`

const Header: FunctionComponent = () => (
  <HeaderContainer className="container">
    <HeaderTitle>
      <HeaderLink to="/">
        <Logo viewBox="0 0 330 33" width={400} height={40} />
      </HeaderLink>
    </HeaderTitle>
  </HeaderContainer>
)

export default Header
