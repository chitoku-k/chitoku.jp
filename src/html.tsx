import type { DetailedHTMLProps, FunctionComponent, ReactNode } from 'react'

const HTML: FunctionComponent<HTMLProps> = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body: __html,
  postBodyComponents,
}) => (
  <html {...htmlAttributes}>
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="viewport" content="initial-scale=1" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      {/* eslint-disable react/no-danger */}
      <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html }} />
      {/* eslint-enable react/no-danger */}
      {postBodyComponents}
    </body>
  </html>
)

interface HTMLProps {
  htmlAttributes: DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
  headComponents: ReactNode[]
  bodyAttributes: DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
  preBodyComponents: ReactNode[]
  body: string
  postBodyComponents: ReactNode[]
}

export default HTML
