import { ComponentType } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface RehypeReactOptions {
  components?: {
    [key: string]: ComponentType<any>
  }
  prefix?: string
  createElement?: any
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default class RehypeReact {
  public Compiler: (node: unknown) => ComponentType

  public constructor(options: RehypeReactOptions)
}
