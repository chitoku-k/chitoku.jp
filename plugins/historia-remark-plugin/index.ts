import type { Node } from 'unist'
import * as visit from 'unist-util-visit'
import * as twemoji from 'twemoji'

const CUSTOM_ELEMENT_HTML_PATTERN = /<\/?[a-z]+-/u

interface RemarkPluginArgs {
  markdownAST: RemarkNode
  compiler: {
    generateHTML: (ast: RemarkNode) => string
  }
}

interface RemarkNode extends Node {
  children?: RemarkNode[]
  value?: string
}

export default ({
  markdownAST,
}: RemarkPluginArgs): void => {
  // Unwrap custom elements in an HTMLParagraphElement
  visit<RemarkNode>(markdownAST, [ 'paragraph' ], (node, index, parent) => {
    if (!parent || !node.children?.some(child => CUSTOM_ELEMENT_HTML_PATTERN.test(child.value ?? ''))) {
      return
    }
    parent.children.splice(index, 1, ...node.children)
  })

  // Replace all emoji with twemoji
  visit<RemarkNode>(markdownAST, [ 'text', 'html' ], node => {
    if (!node.value || !twemoji.test(node.value)) {
      return
    }
    node.type = 'html'
    node.value = twemoji.parse(node.value, {
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/',
    })
  })
}
