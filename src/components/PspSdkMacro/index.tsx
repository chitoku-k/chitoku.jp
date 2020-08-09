import React, { FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import styles from './styles.module.scss'
import { MacrosYamlParameters } from 'graphql-types'

import { ArticleItem } from 'components/Article'

const indentationWidth = 4
const linebreakThreshold = 2
const buildParameters = ({ type, name }: PspSdkMacroParameterItem, indentation: string): string => type
  ? `${indentation}${type} ${name}`
  : `${indentation}${name}`

const PspSdkMacro: FunctionComponent<PspSdkMacroProps> = ({
  children,
  article,
  name: macroName,
}) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [ ref ])

  const def = article.attributes.macros?.find(x => x?.name === macroName)
  if (!def) {
    return null
  }

  const separator = def.parameters?.length && def.parameters.length > linebreakThreshold ? '\n' : ''
  const indentation = separator ? ' '.repeat(indentationWidth) : ''

  return (
    <div className={styles.entry}>
      <code className={clsx(styles.prototype, 'language-c')} ref={ref}>
        {[
          `${def.name}(`,
          def.parameters?.map(x => buildParameters(x, indentation)).join(`, ${separator}`) ?? '',
          ');',
        ].join(separator)}
      </code>
      <div className={styles.description}>
        {def.description}
        {def.parameters ? (
          <ul>
            {def.parameters.filter(x => x.description).map(({ name, description }) => (
              <li key={name}>
                <code className={clsx(styles.parameter, 'language-c')}>{name}</code>
                <span className={styles.separator}>-</span>
                {description}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={styles.description}>
        {children}
      </div>
    </div>
  )
}

type PspSdkMacroParameterItem = MacrosYamlParameters

interface PspSdkMacroProps {
  article: ArticleItem
  name: string
}

export default PspSdkMacro
