import type { ComponentType, PropsWithChildren, ReactNode } from 'react'

interface RehypeReactOptions {
  components?: Record<string, ComponentType<PropsWithChildren>>
  prefix?: string
  createElement?: unknown
}

export default class RehypeReact {
  public Compiler: (node: unknown) => ReactNode

  public constructor(options: RehypeReactOptions)
}
