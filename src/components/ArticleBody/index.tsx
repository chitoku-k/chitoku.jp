import type { ComponentType, FunctionComponent } from 'react'
import { createElement, useMemo } from 'react'
import RehypeReact from 'rehype-react'

import * as styles from './styles.module.scss'

import type { ArticleAstNode } from 'components/Article'

const components: ArticleComponentCollection = {}

export const register = function register<T>(key: string, component: ComponentType<T>): void {
  components[key] = component as unknown as ComponentType<unknown>
}

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
}) => {
  const content = useMemo(() => {
    const { Compiler: compiler } = new RehypeReact({
      createElement,
      components,
    })

    return compiler(ast)
  }, [ ast ])

  return (
    <div className={styles.body}>
      {content}
    </div>
  )
}

interface ArticleBodyProps {
  ast: ArticleAstNode
}

export type ArticleComponentCollection = Record<string, ComponentType<unknown>>

export default ArticleBody
