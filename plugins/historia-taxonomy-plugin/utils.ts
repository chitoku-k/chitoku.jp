import * as path from 'path'

export interface Paginatable {
  page: {
    base: string
    current: number
    total: number
  }
}

export interface File {
  children: string[]
  relativeDirectory: Directory
  name: string
}

type Directory = string
type Path = string

export const splitPages = <T>(items: T[], limit: number): T[][] => {
  const pages: T[][] = []

  while (pages.length * limit < items.length) {
    pages.push(items.slice(pages.length * limit, (pages.length + 1) * limit))
  }

  return pages
}

const getDirectory = (file: File): Directory => file.relativeDirectory.replace(/^posts(?:\/|$)/u, '/')

export const getPath = (file: File, index = '/'): Path => {
  const directory = getDirectory(file)
  if (!directory) {
    return ''
  }

  return path.join(directory, file.name === 'index' ? index : file.name)
}
