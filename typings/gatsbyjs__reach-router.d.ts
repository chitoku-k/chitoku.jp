import type { ComponentType, Context, PropsWithChildren } from 'react'

declare module '@gatsbyjs/reach-router' {
  interface BaseContextProps {
    baseuri: string
  }

  interface RouterContextProps {
    basepath: string
    component?: ComponentType<PropsWithChildren> | string
    primary?: boolean
  }

  export const BaseContext: Context<BaseContextProps | RouterContextProps>
}
