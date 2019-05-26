import React, { useEffect, useRef, FunctionComponent } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
require('prismjs/components/prism-c')

import { ArticleItem } from 'components/Article'

const indentationWidth = 4
const linebreakThreshold = 2

const PspSdkMacroEntry = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
`

const PspSdkMacroPrototype = styled.code`
  &&& {
    display: block;
    padding: 4px 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    white-space: pre;
  }
`

const PspSdkMacroParameter = styled.code`
  &&& {
    padding: 2px 4px;
  }
`

const PspSdkMacroParameterSeparator = styled.span`
  margin: 0 8px;
`

const PspSdkMacroDescription = styled.p`
  margin-bottom: 2px;
  padding: 0 8px;
`

const PspSdkMacro: FunctionComponent<PspSdkMacroProps> = function PspSdkMacro({
  children,
  article,
  name: macroName,
}) {
  const def = article.attributes.macros && article.attributes.macros.find(x => x.name === macroName)
  if (!def) {
    return (
      <></>
    )
  }

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current && Prism.highlightElement(ref.current)
  }, [ ref ])

  const separator = def.parameters && def.parameters.length > linebreakThreshold ? '\n' : ''
  const indentation = separator ? ' '.repeat(indentationWidth) : ''

  return (
    <PspSdkMacroEntry>
      <PspSdkMacroPrototype ref={ref} className="language-c">
        {[
          def.name + '(',
          def.parameters && def.parameters.map(({ type, name }) => (
            type ? (
              `${indentation}${type} ${name}`
            ) : (
              `${indentation}${name}`
            )
          )).join(', ' + separator),
          `);`,
        ].join(separator)}
      </PspSdkMacroPrototype>
      <PspSdkMacroDescription>
        {def.description}
        {def.parameters ? (
          <ul>
            {def.parameters.filter(x => x.description).map(({ name, description }) => (
              <li key={name}>
                <PspSdkMacroParameter className="language-c">{name}</PspSdkMacroParameter>
                <PspSdkMacroParameterSeparator>-</PspSdkMacroParameterSeparator>
                {description}
              </li>
            ))}
          </ul>
        ) : null}
      </PspSdkMacroDescription>
      <PspSdkMacroDescription>
        {children}
      </PspSdkMacroDescription>
    </PspSdkMacroEntry>
  )
}

type PspSdkMacroArticleItem = ArticleItem & {
  attributes: {
    macros: PspSdkMacroItem[] | null
  }
}

interface PspSdkMacroItem {
  name: string
  description: string
  parameters: {
    name: string
    type: string
    description: string
  }[] | null
}

interface PspSdkMacroProps {
  article: PspSdkMacroArticleItem
  name: string
}

export default PspSdkMacro
