import React, { ComponentType } from 'react'

declare module 'rehype-react' {
  interface RehypeReactOptions {
    components?: {
      [key: string]: ComponentType<any>
    }
    prefix?: string
    createElement?: any
  }

  class RehypeReact {
    Compiler: (node: {}) => ComponentType
    constructor(options: RehypeReactOptions)
  }

  export = RehypeReact
}
