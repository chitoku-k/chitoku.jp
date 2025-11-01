import type { ComponentType, FunctionComponent } from 'react'
import { useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { unified } from 'unified'
import type { Root } from 'hast'
import type { Components, Options } from 'hast-util-to-jsx-runtime'
import rehypeReact from 'rehype-react'

import * as styles from './styles.module.scss'

const components: Record<string, ComponentType<unknown>> = {}

export const register = <T,>(key: string, component: ComponentType<T>) => {
  components[key] = component as ComponentType<unknown>
}

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
}) => {
  const processor = useMemo(
    () => unified()
      .use(rehypeReact, {
        ...jsxRuntime as Options,
        components: components as Components,
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
