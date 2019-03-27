import React, { FunctionComponent, ComponentType } from 'react'
import RehypeReact from 'rehype-react'
import styled from 'styled-components'

import { media } from 'components/Layout'

const ArticleContent = styled.div`
  h2 {
    font-size: 140%;
    margin: 56px 0 16px 0;
    padding: 9px 15px 7px;
    background: #efefef;
    color: #444;
    border: 1px solid #d4d4d4;
    &.no-border {
      margin: 0;
      padding: 0;
      background: none;
      border: none;
    }
    ${media.lessThan('tablet')`
      padding: 7px 12px;
    `}
    ${media.lessThan('sp')`
      font-size: 120%;
      margin-top: 20px;
      padding: 5px 0;
      background: none;
      border-width: 0 0 1px 0;
    `}
  }
  h3 {
    font-size: 120%;
    border-bottom: 1px solid #d4d4d4;
    margin: 50px 0 15px;
    padding: 0 16px 5px;
    ${media.lessThan('tablet')`
      font-size: 110%;
      padding-left: 13px;
      padding-right: 13px;
    `}
    ${media.lessThan('sp')`
      margin-top: 10px;
      padding: 6px 0;
    `}
  }
  p {
    font-size: 11pt;
    line-height: 1.8;
  }
  > div {
    > p {
      padding: 0 16px;
      ${media.lessThan('tablet')`
        padding: 0 13px;
        font-size: 14px;
      `}
      ${media.lessThan('sp')`
        padding: 0;
      `}
    }
    > p,
    > ul,
    > ol {
      margin-bottom: 1.8em;
    }
  }
  ul,
  ol {
    font-size: 11pt;
    font-variant-numeric: tabular-nums;
    line-height: 1.8;
    p {
      margin-bottom: 0;
    }
    pre {
      margin: 5px 0 0;
    }
  }
  blockquote {
    ${media.lessThan('sp')`
      margin-left: 10px;
      padding-left: 15px;
    `}
  }
  pre {
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 1.8em;
    ${media.lessThan('tablet')`
      margin-left: 13px;
      margin-right: 13px;
    `}
    ${media.lessThan('sp')`
      margin-left: 0;
      margin-right: 0;
    `}
  }
  img {
    margin-top: 0.4em;
    &:not(.gatsby-resp-image-image) {
      max-width: 100%;
    }
  }
  table:not(.highlight) {
    margin: 20px 0 10px;
    width: 100%;
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > td,
        > th {
          padding: 8px 16px;
          line-height: 1.42857;
          vertical-align: top;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          p {
            padding: 0;
            margin-bottom: 0;
          }
          ${media.lessThan('sp')`
            white-space: nowrap;
          `}
        }
        &:last-child {
          > td,
          > th {
            border-bottom: 1px solid #ddd;
          }
        }
      }
    }
    ${media.lessThan('sp')`
      display: block;
      overflow: auto;
      margin: 10px 0;
    `}
  }
  .footnote-ref {
    &::before {
      content: '[';
    }
    &::after {
      content: ']';
    }
  }
  .footnotes {
    p {
      display: inline;
    }
    hr {
      display: none;
    }
  }
  .wide-list {
    li {
      margin-bottom: 1.8em;
      &:first-child {
        margin-top: 1.4em;
      }
    }
  }
  .alert {
    & + h2 {
      margin-top: 0;
    }
    > p {
      padding: 0;
      margin-bottom: 0;
    }
    ${media.lessThan('sp')`
      text-align: left;
    `}
  }

  /* Images */
  .gatsby-resp-image-wrapper {
    width: 100%;
    li > & {
      margin-bottom: 1.8em;
    }
  }

  /* Prism.js */
  *:not(pre) > code[class*="language-"] {
    padding: 2px 4px;
  }
  pre[class*="language-"],
  code[class*="language-"] {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    .token.operator {
      background: none;
    }
  }
  .monospace {
    pre[class*="language-"],
    code[class*="language-"] {
      font-family: monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
  }
`

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
  components,
}) => {
  const { Compiler } = new RehypeReact({
    createElement: React.createElement,
    components,
  })

  return (
    <ArticleContent>
      {Compiler(ast)}
    </ArticleContent>
  )
}

interface ArticleBodyProps {
  ast: {}
  components?: ArticleComponentCollection
}

export interface ArticleComponentCollection {
  [key: string]: ComponentType<any>
}

export default ArticleBody
