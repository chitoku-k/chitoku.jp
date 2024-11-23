import type { ComponentType, FunctionComponent } from 'react'
import { useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { unified } from 'unified'
import type { Root } from 'hast'
import type { Components, Production } from 'hast-util-to-jsx-runtime/lib'
import rehypeReact from 'rehype-react'

import * as styles from './styles.module.scss'

const components: Record<string, ComponentType<unknown>> = {}

export const register = function register<T>(key: string, component: ComponentType<T>): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  components[key] = component as ComponentType<unknown>
}

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
}) => {
  const processor = useMemo(
    () => unified()
      .use(rehypeReact, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        ...jsxRuntime as Production,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
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
