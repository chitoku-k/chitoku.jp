import React, { FunctionComponent, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import { MacrosYamlParameters } from 'graphql-types'
import { ArticleItem } from 'components/Article'
import { media } from 'components/Layout'

const indentationWidth = 4
const linebreakThreshold = 2

const PspSdkMacroEntry = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  ${media.md.down()} {
    padding: 0 13px;
  }
  ${media.sm.down()} {
    padding: 0;
  }
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
  ${media.sm.down()} {
    ul {
      padding-left: 20px;
    }
  }
`

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

  const buildParameters = ({ type, name }: PspSdkMacroParameterItem): string => type
    ? `${indentation}${type} ${name}`
    : `${indentation}${name}`

  return (
    <PspSdkMacroEntry>
      <PspSdkMacroPrototype ref={ref} className="language-c">
        {[
          `${def.name}(`,
          def.parameters?.map(buildParameters).join(`, ${separator}`) ?? '',
          ');',
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

type PspSdkMacroParameterItem = MacrosYamlParameters

interface PspSdkMacroProps {
  article: ArticleItem
  name: string
}

export default PspSdkMacro
