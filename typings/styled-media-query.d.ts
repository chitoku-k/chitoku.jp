import { css } from 'styled-components'

interface Media<T extends Breakpoints> {
  lessThan(breakpoint: keyof T): typeof css
  lessThan(size: string): typeof css

  greaterThan(breakpoint: keyof T): typeof css
  greaterThan(size: string): typeof css

  between(from: keyof T, to: keyof T): typeof css
  between(from: string, to: string): typeof css
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

declare const media: Media<DefaultBreakpoints>
export default media
