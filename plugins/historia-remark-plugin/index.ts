import type { Node } from 'unist'
import * as visit from 'unist-util-visit'
import * as twemoji from 'twemoji'
import * as unicode from 'unicode-properties'

// eslint-disable-next-line no-control-regex
const WHITE_SPACE_TRANSFORM_PATTERN = /(?<before>[^\x01-\x7E])\s*\n+\s*(?<after>[^\x01-\x7E])/gu

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

/**
 * This function is equivalent implementation to IsEastAsianWidthFHWexcludingEmoji in Firefox.
 *
 * See: https://searchfox.org/mozilla-central/rev/ca22dc04/intl/unicharutil/util/nsUnicodeProperties.h#141-154
 */
const isEastAsianWidthFHWexcludingEmoji = (ch: string): boolean => {
  const codePoint = ch.codePointAt(0)
  if (!codePoint) {
    return false
  }
  switch (unicode.getEastAsianWidth(codePoint)) {
    case 'F':
    case 'H':
      return true
    case 'W':
      // Here considers emoji fullwidth...
      return true
    case 'A':
    case 'Na':
    case 'N':
    default:
      return false
  }
}

/**
 * This function is equivalent implementation to IsSegmentBreakSkipChar in Firefox.
 *
 * See: https://searchfox.org/mozilla-central/rev/ca22dc04/intl/unicharutil/util/nsUnicharUtils.cpp#516-519
 */
const isSegmentBreakSkipChar = (ch: string): boolean => {
  const codePoint = ch.codePointAt(0)
  if (!codePoint) {
    return false
  }
  return isEastAsianWidthFHWexcludingEmoji(ch) && unicode.getScript(codePoint) !== 'Hangul'
}

/**
 * This function does the same as TransformWhiteSpaces in Firefox.
 *
 * See: https://searchfox.org/mozilla-central/rev/ca22dc04/layout/generic/nsTextFrameUtils.cpp#115-118
 */
const isSegmentBreakSkippable = (before: string, after: string): boolean => isSegmentBreakSkipChar(before) && isSegmentBreakSkipChar(after)

export default ({
  markdownAST,
}: RemarkPluginArgs): void => {
  visit<RemarkNode>(markdownAST, [ 'text', 'html' ], node => {
    if (!node.value || !twemoji.test(node.value)) {
      return
    }
    node.type = 'html'
    node.value = twemoji.parse(node.value)
  })

  visit<RemarkNode>(markdownAST, [ 'text' ], node => {
    if (!node.value || !WHITE_SPACE_TRANSFORM_PATTERN.test(node.value)) {
      return
    }
    node.value = node.value.replace(WHITE_SPACE_TRANSFORM_PATTERN, (match: string, before: string, after: string): string => {
      if (!isSegmentBreakSkippable(before, after)) {
        return match
      }
      return before + after
    })
  })
}
