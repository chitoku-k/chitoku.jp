import React, { FunctionComponent } from 'react'
import { IntlProvider } from 'react-intl'
import styled from 'styled-components'

import '../../styles/styles.scss'
import styles from './styles'
import messages from 'translations/ja.yml'
import Search from 'components/Search'

export const media = styles

const Wrapper = styled.div`
  ${media.greaterThan('normal-pc')`
    position: relative;
    min-height: 100%;
  `}
`

const Layout: FunctionComponent = ({
  children,
}) => (
  <IntlProvider locale="ja" messages={messages}>
    <Search>
      <Wrapper>
        {children}
      </Wrapper>
    </Search>
  </IntlProvider>
)

export default Layout
