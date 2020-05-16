import React, { FunctionComponent } from 'react'
import { IntlProvider } from 'react-intl'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'

import '../../styles/styles.scss'
import * as styles from './styles'
import messages from 'translations/ja.yml'
import Search from 'components/Search'

export const media = styles

const Wrapper = styled.div`
  ${media.lg.up()} {
    position: relative;
    min-height: 100%;
  }
`

const Layout: FunctionComponent = ({
  children,
}) => (
  <IntlProvider locale="ja" messages={messages}>
    <ThemeProvider theme={media.theme}>
      <Search>
        <Wrapper>
          {children}
        </Wrapper>
      </Search>
    </ThemeProvider>
  </IntlProvider>
)

export default Layout
