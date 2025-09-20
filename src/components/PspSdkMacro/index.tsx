import type { FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import * as styles from './styles.module.scss'

import { useArticle } from 'components/Article'

const indentationWidth = 4
const linebreakThreshold = 2
const buildParameters = ({ type, name }: PspSdkMacroParameterItem, indentation: string): string => type
  ? `${indentation}${type} ${name}`
  : `${indentation}${name}`

const PspSdkMacro: FunctionComponent<PspSdkMacroProps> = ({
  children,
  name: macroName,
}) => {
  const article = useArticle()
  const def = article.attributes.macros?.find(x => x.name === macroName)
  if (!def) {
    return null
  }

  if (!Prism.languages.c) {
    throw new Error('Invalid highlight')
  }

  const separator = def.parameters?.length && def.parameters.length > linebreakThreshold ? '\n' : ''
  const indentation = separator ? ' '.repeat(indentationWidth) : ''
  const highlighted = Prism.highlight([
    `${def.name}(`,
    def.parameters?.map(x => buildParameters(x, indentation)).join(`, ${separator}`) ?? '',
    ');',
  ].join(separator), Prism.languages.c, 'c')

  return (
    <div className={styles.entry}>
      <pre className={clsx(styles.prototype, 'language-c')}>
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

type PspSdkMacroParameterItem = Queries.MacrosYamlParameters

interface PspSdkMacroProps {
  children?: ReactNode
  name: string
}

export default PspSdkMacro
