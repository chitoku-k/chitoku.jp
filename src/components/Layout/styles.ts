import { Orientation, Props, down, only, up } from 'styled-breakpoints'
import theming, { ThemeSet } from 'styled-theming'
import { themes } from '../../themes.json'
import { mapValues } from 'lodash'

interface Breakpoints {
  up: (orientation?: Orientation) => (props: Props) => string
  down: (orientation?: Orientation) => (props: Props) => string
  only: (orientation?: Orientation) => (props: Props) => string
}

const breakpoint = (name: string): Breakpoints => ({
  up: up.bind(null, name),
  down: down.bind(null, name),
  only: only.bind(null, name),
})

type ThemeColors = Colors<typeof themes>
type Colors<T> = {
  [TCategory in keyof T]: {
    [TProperty in keyof T[TCategory]]: ThemeSet
  }
}

export const colors =
  mapValues(themes, props => mapValues(props, values => theming('mode', values))) as ThemeColors

export const media = {
  sm: breakpoint('sm'),
  md: breakpoint('md'),
  lg: breakpoint('lg'),
  xl: breakpoint('xl'),
}

export const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}
