import React, { ComponentType, FunctionComponent, useMemo } from 'react'
import RehypeReact from 'rehype-react'
import styled from 'styled-components'

import { ArticleWrapper } from 'components/Article'
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
      margin: 30px -15px 15px;
      padding: 7px 15px;
      border-width: 1px 0;
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
      margin: 10px -15px 15px;
      padding: 6px 15px;
    `}
  }
  a.anchor {
    width: 55px;
    top: auto;
    ${media.lessThan('sp')`
      width: auto;
      left: auto;
      right: 8px;
      transform: none;
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
    border-left: 5px solid #eee;
    padding: 10px 20px;
    ${media.lessThan('sp')`
      margin-left: 10px;
      padding-left: 15px;
    `}
  }
  img {
    &:not(.gatsby-resp-image-image) {
      max-width: 100%;
    }
    &.emoji {
      width: 1.25em;
      height: auto;
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
      margin: 10px -15px;
      width: calc(100% + 30px);
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
  }
  li > .gatsby-resp-image-wrapper {
    margin: 0.9em 0 1.8em;
  }

  /* Prism.js */
  *:not(pre) > code[class*="language-"] {
    padding: 2px 4px;
    word-wrap: break-word;
  }
  .gatsby-highlight {
    background-color: #f4f2f0;
    border-radius: 0.3em;
    margin: 0.5em 16px 1.8em;
    ${media.lessThan('tablet')`
      margin-left: 13px;
      margin-right: 13px;
    `}
    ${media.lessThan('sp')`
      border-radius: 0;
      margin-left: -15px;
      margin-right: -15px;
    `}
  }
  pre[class*="language-"],
  code[class*="language-"] {
    border-radius: 3px;
    font-family: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
    .token.operator,
    .token.string {
      background: none;
    }
    ${media.lessThan('sp')`
      border-radius: 0;
    `}
  }
  pre[class*="language-"] {
    -webkit-overflow-scrolling: touch;
    padding: 1em;
    &.line-numbers {
      padding-left: 3.6em;
      .line-numbers-rows {
        top: 1em;
        min-width: 3em;
        letter-spacing: 0;
        > span::before {
          padding-left: 0.8em;
        }
      }
    }
    .command-line-prompt {
      letter-spacing: 0;
      border-right: none;
      margin-right: 0;
      > span::before {
        padding-right: 0;
      }
      > span[data-user]::before {
        content: "$";
        color: slategray;
        padding-right: 1ex;
      }
    }
    ${media.lessThan('sp')`
      padding: 15px;
    `}
  }
  .monospace {
    pre[class*="language-"],
    code[class*="language-"] {
      font-family: monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      img.emoji {
        width: 1em;
      }
    }
  }
`

const ArticleBody: FunctionComponent<ArticleBodyProps> = ({
  ast,
  components,
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const content = useMemo(() => {
    const { Compiler: compiler } = new RehypeReact({
      createElement: React.createElement,
      components,
    })

    return compiler(ast)
  }, [ ast ])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <ArticleContent>
      {content}
    </ArticleContent>
  )
}

interface ArticleBodyProps {
  ast: {}
  components?: ArticleComponentCollection
}

export interface ArticleComponentCollection {
  [key: string]: ComponentType<ArticleWrapper>
}

export default ArticleBody
