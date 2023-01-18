import type { Literal, Parent } from 'unist'
import * as visit from 'unist-util-visit'
import * as twemoji from 'twemoji'

const CUSTOM_ELEMENT_HTML_PATTERN = /<\/?[a-z]+-/u

interface RemarkPluginArgs {
  markdownAST: Parent
}

type ParagraphNode = Parent<Literal<string>>
type StringNode = Literal<string>

export default ({
  markdownAST,
}: RemarkPluginArgs): void => {
  // Unwrap custom elements in an HTMLParagraphElement
  visit<ParagraphNode>(markdownAST, [ 'paragraph' ], (node, index, parent) => {
    if (!parent || !node.children.some(child => CUSTOM_ELEMENT_HTML_PATTERN.test(child.value))) {
      return
    }
    parent.children.splice(index, 1, ...node.children)
  })

  // Replace all emoji with twemoji
  visit<StringNode>(markdownAST, [ 'text', 'html' ], node => {
    if (!node.value || !twemoji.test(node.value)) {
      return
    }
    node.type = 'html'
    node.value = twemoji.parse(node.value, {
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/',
    })
  })
}
