import { Node } from 'unist'
import u from 'unist-builder'
import { selectAll } from 'unist-util-select'
import remove from 'unist-util-remove'
import visit from 'unist-util-visit'
import twemoji from 'twemoji'

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
  compiler: {
    generateHTML,
  },
}: RemarkPluginArgs): void => {
  markdownAST.children?.push(
    u('text', '\n'),
    u('html', generateHTML(u('root', selectAll('footnoteDefinition', markdownAST)))),
  )
  remove(markdownAST, 'footnoteDefinition')

  visit<RemarkNode>(markdownAST, [ 'text', 'html' ], node => {
    if (node.value && twemoji.test(node.value)) {
      node.type = 'html'
      node.value = twemoji.parse(node.value)
    }
  })
}
