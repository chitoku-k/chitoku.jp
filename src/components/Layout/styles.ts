import { Orientation, Props, down, only, up } from 'styled-breakpoints'

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

export const sm = breakpoint('sm')
export const md = breakpoint('md')
export const lg = breakpoint('lg')
export const xl = breakpoint('xl')
export const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}
