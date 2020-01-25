import React, { FunctionComponent, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'

import { FunctionsYamlParameters } from 'graphql-types'
import { ArticleItem } from 'components/Article'
import { media } from 'components/Layout'

const indentationWidth = 4
const linebreakThreshold = 2

const PspSdkFunctionEntry = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  ${media.lessThan('tablet')`
    padding: 0 13px;
  `}
  ${media.lessThan('sp')`
    padding: 0;
  `}
`

const PspSdkFunctionPrototype = styled.code`
  &&& {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 4px 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    white-space: pre;
  }
`

const PspSdkFunctionParameter = styled.code`
  &&& {
    padding: 2px 4px;
  }
`

const PspSdkFunctionParameterSeparator = styled.span`
  margin: 0 8px;
`

const PspSdkFunctionDescription = styled.div`
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

const PspSdkFunction: FunctionComponent<PspSdkFunctionProps> = ({
  children,
  article,
  name: functionName,
}) => {
  const ref = useRef<HTMLElement>(null)
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

  const buildParameters = ({ type, name, parameters }: PspSdkFunctionParameterItem): string => parameters
    ? `${indentation}${type ?? ''} (* ${name})(${parameters.map(child => `${child.type ?? ''} ${child.name}`).join(', ')})`
    : type
      ? `${indentation}${type} ${name}`
      : `${indentation}${name}`

  return (
    <PspSdkFunctionEntry>
      <PspSdkFunctionPrototype ref={ref} className="language-c">
        {[
          `${def.return} ${def.name}(`,
          def.parameters
            ? def.parameters.map(buildParameters).join(`, ${separator}`)
            : 'void',
          ');',
        ].join(separator)}
      </PspSdkFunctionPrototype>
      <PspSdkFunctionDescription>
        {def.description}
        {def.parameters ? (
          <ul>
            {def.parameters.filter(x => x.description).map(({ name, description }) => (
              <li key={name}>
                <PspSdkFunctionParameter className="language-c">{name}</PspSdkFunctionParameter>
                <PspSdkFunctionParameterSeparator>-</PspSdkFunctionParameterSeparator>
                {description}
              </li>
            ))}
          </ul>
        ) : null}
      </PspSdkFunctionDescription>
      <PspSdkFunctionDescription>
        {children}
      </PspSdkFunctionDescription>
    </PspSdkFunctionEntry>
  )
}

type PspSdkFunctionParameterItem = FunctionsYamlParameters

interface PspSdkFunctionProps {
  article: ArticleItem
  name: string
}

export default PspSdkFunction
