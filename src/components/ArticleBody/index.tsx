import React, { ComponentType, FunctionComponent, useMemo } from 'react'
import RehypeReact from 'rehype-react'

import styles from './styles.module.scss'

import { ArticleAstNode, ArticleWrapper } from 'components/Article'

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
  components,
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const content = useMemo(() => {
    const { Compiler: compiler } = new RehypeReact({
      createElement: React.createElement,
      components,
    })

    return compiler(ast)
  }, [ ast ])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className={styles.body}>
      {content}
    </div>
  )
}

interface ArticleBodyProps {
  ast: ArticleAstNode
  components?: ArticleComponentCollection
}

export interface ArticleComponentCollection {
  [key: string]: ComponentType<ArticleWrapper>
}

export default ArticleBody
