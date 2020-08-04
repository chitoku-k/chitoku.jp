import React, { ComponentType, FunctionComponent, useMemo } from 'react'
import RehypeReact from 'rehype-react'
import styled from 'styled-components'

import { ArticleAstNode, ArticleWrapper } from 'components/Article'
import { colors, media } from 'components/Layout'

const ArticleContent = styled.div`
  h2 {
    font-size: 140%;
    margin: 48px 0 16px 0;
    padding: 9px 15px 7px;
    background-color: ${colors.headings.secondary};
    color: ${colors.headings.color};
    border: 1px solid ${colors.headings.border};
    &.no-border {
      margin: 0;
      padding: 0;
      background: none;
      border: none;
    }
    ${media.md.down()} {
      padding: 7px 12px;
    }
    ${media.sm.down()} {
      font-size: 120%;
      margin: 30px -15px 15px;
      padding: 7px 15px;
      border-width: 1px 0;
    }
  }
  h3 {
    font-size: 120%;
    border-bottom: 1px solid ${colors.headings.border};
    margin: 50px 0 15px;
    padding: 0 16px 5px;
    ${media.md.down()} {
      font-size: 110%;
      padding-left: 13px;
      padding-right: 13px;
    }
    ${media.sm.down()} {
      margin: 10px -15px 15px;
      padding: 6px 15px;
    }
  }
  a.anchor {
    width: 55px;
    top: auto;
    ${media.sm.down()} {
      width: auto;
      left: auto;
      right: 8px;
      transform: none;
    }
  }
  p {
    font-size: 11pt;
    line-height: 1.8;
  }
  > div {
    > p {
      padding: 0 16px;
      ${media.md.down()} {
        padding: 0 13px;
        font-size: 14px;
      }
      ${media.sm.down()} {
        padding: 0;
      }
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
    border-left: 5px solid ${colors.blockquote.border};
    padding: 10px 20px;
    ${media.sm.down()} {
      margin-left: 10px;
      padding-left: 15px;
    }
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
          border: 1px solid ${colors.table.border};
          border-width: 1px 0;
          p {
            padding: 0;
            margin-bottom: 0;
          }
          ${media.sm.down()} {
            white-space: nowrap;
          }
        }
        &:last-of-type {
          > td,
          > th {
            border-bottom: 1px solid ${colors.table.border};
          }
        }
      }
    }
    ${media.sm.down()} {
      display: block;
      overflow: auto;
      margin: 10px -15px;
      width: calc(100% + 30px);
    }
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
      &:first-of-type {
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
    ${media.sm.down()} {
      text-align: left;
    }
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
    background-color: ${colors.code.background};
    border-radius: 0.3em;
    margin: 0.5em 16px 1.8em;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    pre[class*="language-"] {
      overflow: visible;
      display: inline-block;
      margin: 1em;
      padding: 0;
    }
    ${media.md.down()} {
      margin-left: 13px;
      margin-right: 13px;
    }
    ${media.sm.down()} {
      border-radius: 0;
      margin-left: -15px;
      margin-right: -15px;
    }
  }
  pre[class*="language-"],
  code[class*="language-"] {
    border-radius: 3px;
    margin: 0;
    text-shadow: none;
    .token.operator,
    .token.string {
      background: none;
    }
    .token.prompt {
      user-select: none;
      color: ${colors.code.prompt};
    }
    ${media.sm.down()} {
      border-radius: 0;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    &.line-numbers {
      padding-left: 3.6em;
      .line-numbers-rows {
        min-width: 3em;
        letter-spacing: 0;
        > span::before {
          padding-left: 0.8em;
        }
      }
    }
    ${media.sm.down()} {
      padding: 15px;
    }
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
  ast: ArticleAstNode
  components?: ArticleComponentCollection
}

export interface ArticleComponentCollection {
  [key: string]: ComponentType<ArticleWrapper>
}

export default ArticleBody
