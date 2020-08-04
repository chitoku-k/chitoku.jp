import React, { FunctionComponent } from 'react'
import { IntlProvider } from 'react-intl'
import styled, { ThemeProvider } from 'styled-components'
import { useMedia } from 'use-media'

import '../../styles/styles.scss'
import { colors, media, theme } from './styles'
import messages from 'translations/ja.yml'
import Search from 'components/Search'

const Wrapper = styled.div`
  ${media.lg.up()} {
    position: relative;
    min-height: 100%;
  }
`

const Layout: FunctionComponent = ({
  children,
}) => {
  const mode: Mode = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  return (
    <IntlProvider locale="ja" messages={messages}>
      <ThemeProvider theme={{ ...theme, mode }}>
        <Search>
          <Wrapper>
            {children}
          </Wrapper>
        </Search>
      </ThemeProvider>
    </IntlProvider>
  )
}

export type Mode = 'light' | 'dark'

export interface Theme {
  mode: Mode
  breakpoints: typeof theme.breakpoints
}

export default Layout
export {
  media,
  colors,
}
