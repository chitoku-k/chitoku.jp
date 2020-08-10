import * as path from 'path'

export interface File {
  children: string[]
  relativeDirectory: string
  name: string
}

const getDirectory = (file: File): string => file.relativeDirectory.replace(/^posts(?:\/|$)/u, '/')

export const getPath = (file: File, index = '/'): string => {
  const directory = getDirectory(file)
  if (!directory) {
    return ''
  }

  return path.join(directory, file.name === 'index' ? index : file.name)
}
