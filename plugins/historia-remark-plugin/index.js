const cheerio = require('cheerio')
const visit = require('unist-util-visit-parents')
const definitions = require('mdast-util-definitions')
const attributesToProps = require('html-react-parser/lib/attributes-to-props')

module.exports = ({
  markdownAST,
}) => {
  const definition = definitions(markdownAST)
  const images = []

  // Traverse through HTML nodes
  visit(markdownAST, 'html', node => {
    const $ = cheerio.load(node.value)

    if ($('img').length) {
      images.push({
        $,
        node,
        children: $('img'),
      })
    }
  })

  // Replace <img /> with <historia-image />
  for (const { $, node, children } of images) {
    // Pass attributes as JSON property
    // HTML properties are converted to React properties
    children.each(function () {
      $(this).replaceWith(
        $('<historia-image />').attr({
          image: JSON.stringify(attributesToProps(this.attribs)),
        })
      )
    })

    node.type = 'html'
    node.value = $.html()
  }
}
