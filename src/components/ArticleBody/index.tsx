import type { ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import { createElement, useMemo } from 'react'
import unified from 'unified'
import type { Node } from 'unist'
import type { ComponentLike } from 'rehype-react'
import rehypeReact from 'rehype-react'

import * as styles from './styles.module.scss'

import type { ArticleAstNode } from 'components/Article'

const components: ArticleComponentCollection = {}

export const register = function register<T>(key: string, component: ComponentType<T>): void {
  components[key] = component as unknown as ComponentType<PropsWithChildren>
}

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
}) => {
  const processor = useMemo(
    () => unified()
      .use(rehypeReact, {
        createElement,
        components: components as Record<string, ReactComponentLike>,
      }),
    [],
  )
  const content = useMemo(
    () => processor.stringify(ast as Node),
    [ ast, processor ],
  )
  return (
    <div className={styles.body}>
      {content}
    </div>
  )
}

export interface ArticleBodyProps {
  ast: ArticleAstNode
}

export type ArticleComponentCollection = Record<string, ComponentType<PropsWithChildren>>
type ReactComponentLike = ComponentLike<ReturnType<typeof createElement>>

export default ArticleBody
