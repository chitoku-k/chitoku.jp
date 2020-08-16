import { ComponentType } from 'react'

interface RehypeReactOptions {
  components?: {
    [key: string]: ComponentType<unknown>
  }
  prefix?: string
  createElement?: unknown
}

export default class RehypeReact {
  public Compiler: (node: unknown) => ComponentType

  public constructor(options: RehypeReactOptions)
}
