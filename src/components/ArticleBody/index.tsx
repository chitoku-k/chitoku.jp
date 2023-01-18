import type { ComponentType, FunctionComponent } from 'react'
import { createElement, useMemo } from 'react'
import { unified } from 'unified'
import type { Root } from 'hast'
import rehypeReact from 'rehype-react'

import * as styles from './styles.module.scss'

const components: Record<string, ComponentType<unknown>> = {}

export const register = function register<T>(key: string, component: ComponentType<T>): void {
  components[key] = component as ComponentType<unknown>
}

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
}) => {
  const processor = useMemo(
    () => unified()
      .use(rehypeReact, {
        createElement,
        components,
      }),
    [],
  )
  const content = useMemo(
    () => processor.stringify(ast),
    [ ast, processor ],
  )
  return (
    <div className={styles.body}>
      {content}
    </div>
  )
}

export interface ArticleBodyProps {
  ast: Root
}

export default ArticleBody
