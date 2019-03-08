import { css } from 'styled-components'

declare module 'styled-media-query' {
  interface Media<T extends Breakpoints> {
    lessThan(breakpoint: keyof T): css
    lessThan(size: string): css

    greaterThan(breakpoint: keyof T): css
    greaterThan(size: string): css

    between(from: keyof T, to: keyof T): css
    between(from: string, to: string): css
  }

  interface DefaultBreakpoints extends Breakpoints {
    huge: string
    large: string
    medium: string
    small: string
  }

  interface Breakpoints {
    [key: string]: string
  }

  export function generateMedia<T extends Breakpoints>(breakpoints: T): Media<T>
  export function pxToRem(breakpoints: Breakpoints): Breakpoints
  export function pxToEm(breakpoints: Breakpoints, ratio?: number): Breakpoints

  const media: Media<DefaultBreakpoints>
  export default media
}
