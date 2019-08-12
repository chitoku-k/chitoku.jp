import React, { useEffect, useRef, FunctionComponent } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
require('prismjs/components/prism-c')

import { ArticleItem } from 'components/Article'
import { media } from 'components/Layout'

const indentationWidth = 4
const linebreakThreshold = 2

const PspSdkMacroEntry = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  ${media.lessThan('tablet')`
    padding: 0 13px;
  `}
  ${media.lessThan('sp')`
    padding: 0;
  `}
`

const PspSdkMacroPrototype = styled.code`
  &&& {
    display: block;
    padding: 4px 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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

const PspSdkMacroDescription = styled.div`
  font-size: 11pt;
  line-height: 1.8;
  margin-bottom: 2px;
  padding: 0 8px;
  ${media.lessThan('sp')`
    ul {
      padding-left: 20px;
    }
  `}
`

const PspSdkMacro: FunctionComponent<PspSdkMacroProps> = ({
  children,
  article,
  name: macroName,
}) => {
  const def = article.attributes.macros && article.attributes.macros.find(x => Boolean(x && x.name === macroName))
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
    macros: (PspSdkMacroItem | null)[] | null
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
