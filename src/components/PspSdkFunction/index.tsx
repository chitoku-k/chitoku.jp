import React, { FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import styles from './styles.module.scss'
import { FunctionsYamlParameters } from 'graphql-types'

import { ArticleItem } from 'components/Article'

const indentationWidth = 4
const linebreakThreshold = 2
const buildParameters = ({ type, name, parameters }: PspSdkFunctionParameterItem, indentation: string): string => parameters
  ? `${indentation}${type ?? ''} (*${name})(${parameters.map(child => `${child.type ?? ''}${child.type?.endsWith('*') ? '' : ' '}${child.name}`).join(', ')})`
  : type
    ? `${indentation}${type}${type.endsWith('*') ? '' : ' '}${name}`
    : `${indentation}${name}`

const PspSdkFunction: FunctionComponent<PspSdkFunctionProps> = ({
  children,
  article,
  name: functionName,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [ ref ])

  const def = article.attributes.functions?.find(x => x?.name === functionName)
  if (!def) {
    return null
  }

  const separator = def.parameters?.length && def.parameters.length > linebreakThreshold ? '\n' : ''
  const indentation = separator ? ' '.repeat(indentationWidth) : ''

  return (
    <div className={styles.entry}>
      <code className={clsx(styles.prototype, 'language-c')} ref={ref}>
        {[
          `${def.return} ${def.name}(`,
          def.parameters
            ? def.parameters.map(x => buildParameters(x, indentation)).join(`, ${separator}`)
            : 'void',
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

type PspSdkFunctionParameterItem = FunctionsYamlParameters

interface PspSdkFunctionProps {
  article: ArticleItem
  name: string
}

export default PspSdkFunction
