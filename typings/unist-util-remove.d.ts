import type { Node } from 'unist'
import type { Test } from 'unist-util-is'

declare function remove<T extends Node>(
  tree: T,
  test?: Test<T>,
): Node | null

export = remove
