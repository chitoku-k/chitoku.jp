import type { ComponentType } from 'react'

interface RehypeReactOptions {
  components?: Record<string, ComponentType<unknown>>
  prefix?: string
  createElement?: unknown
}

export default class RehypeReact {
  public Compiler: (node: unknown) => ComponentType

  public constructor(options: RehypeReactOptions)
}
