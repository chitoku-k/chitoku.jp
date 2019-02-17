const cheerio = require('cheerio')
const visit = require('unist-util-visit-parents')
const definitions = require('mdast-util-definitions')
const modifyChildren = require('unist-util-modify-children')
const attributesToProps = require('html-react-parser/lib/attributes-to-props')

module.exports = ({
  markdownAST,
}, pluginOptions) => {
  const definition = definitions(markdownAST)
  const images = []

  // Traverse through HTML nodes
  visit(markdownAST, 'html', (node, ancestors) => {
    const $ = cheerio.load(node.value)

    if ($('img').length) {
      images.push({
        $,
        node,
        children: $('img'),
      })
    }
  })

  // Traverse through Markdown links
  visit(markdownAST, ['link', 'linkReference'], (node, ancestors) => {
    const parent = ancestors[ancestors.length - 1]

    modifyChildren((node, index, parent) => {
      const ctx = node.type === 'link' ? node : definition(node.identifier)
      if (!ctx) {
        return
      }

      // Create <historia-link /> and split them to open and close tag
      const $ = cheerio.load('');
      const [ , open, close ] = $('body').append(
        $('<historia-link />').attr({
          to: ctx.url,
          ...(ctx.data && ctx.data.hProperties || {}),
        })
      ).html().match(/(.*)(<\/.*)/)

      // Replace a Markdown link with <historia-link />
      parent.children.splice(index, 1,
        {
          type: 'html',
          value: open,
        },
        ...(node.children || []),
        {
          type: 'html',
          value: close,
        },
      )
    })(parent)
  })

  // Replace <img /> with <image-zoom />
  for (const { $, node, children } of images) {
    // Pass attributes as JSON property
    // HTML properties are converted to React properties
    children.each(function () {
      $(this).replaceWith(
        $('<image-zoom />').attr({
          image: JSON.stringify(attributesToProps(this.attribs)),
        })
      )
    })

    node.type = 'html'
    node.value = $.html()
  }
}
