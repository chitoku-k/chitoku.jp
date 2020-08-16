import { Node } from 'unist'
import { Test } from 'unist-util-is'

declare function remove<T extends Node>(
  tree: T,
  test?: Test<T>,
): Node | null

export = remove
