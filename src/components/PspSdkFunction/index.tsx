import type { FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import * as styles from './styles.module.scss'

import { useArticle } from 'components/Article'

const indentationWidth = 4
const linebreakThreshold = 2
const buildParameters = ({ type, name, parameters }: PspSdkFunctionParameterItem, indentation: string): string => parameters
  ? `${indentation}${type ?? ''} (*${name})(${parameters.map(child => `${child.type ?? ''}${child.type?.endsWith('*') ? '' : ' '}${child.name}`).join(', ')})`
  : type
    ? `${indentation}${type}${type.endsWith('*') ? '' : ' '}${name}`
    : `${indentation}${name}`

const PspSdkFunction: FunctionComponent<PspSdkFunctionProps> = ({
  children,
  name: functionName,
}) => {
  const article = useArticle()
  const def = article.attributes.functions?.find(x => x.name === functionName)
  if (!def) {
    return null
  }

  if (!Prism.languages.c) {
    throw new Error('Invalid highlight')
  }

  const separator = def.parameters?.length && def.parameters.length > linebreakThreshold ? '\n' : ''
  const indentation = separator ? ' '.repeat(indentationWidth) : ''
  const highlighted = Prism.highlight([
    `${def.return} ${def.name}(`,
    def.parameters
      ? def.parameters.map(x => buildParameters(x, indentation)).join(`, ${separator}`)
      : 'void',
    ');',
  ].join(separator), Prism.languages.c, 'c')

  return (
    <div className={styles.entry}>
      <pre className={clsx(styles.prototype, 'language-c')}>
        {/* eslint-disable-next-line react/no-danger */}
        <code className="language-c" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
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

type PspSdkFunctionParameterItem = Queries.FunctionsYamlParameters

interface PspSdkFunctionProps {
  children?: ReactNode
  name: string
}

export default PspSdkFunction
