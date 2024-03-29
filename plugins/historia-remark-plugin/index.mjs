import { visit } from 'unist-util-visit'
import twemoji from '@twemoji/api'

const CUSTOM_ELEMENT_HTML_PATTERN = /<\/?[a-z]+-/u

export default ({
  markdownAST,
}) => {
  // Unwrap custom elements in an HTMLParagraphElement
  visit(markdownAST, [ 'paragraph' ], (node, index, parent) => {
    if (!parent || !node.children.some(child => CUSTOM_ELEMENT_HTML_PATTERN.test(child.value))) {
      return
    }
    parent.children.splice(index, 1, ...node.children)
  })

  // Replace all emoji with twemoji
  visit(markdownAST, [ 'text', 'html' ], node => {
    if (!node.value || !twemoji.test(node.value)) {
      return
    }
    node.type = 'html'
    node.value = twemoji.parse(node.value)
  })
}
