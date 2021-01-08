import * as path from 'path'

export interface File<TDirectory extends string, TName extends string> {
  children: string[]
  relativeDirectory: TDirectory
  name: TName
}

type Directory<
  TDirectory extends string,
> = TDirectory extends `posts/${infer Subdirectory}`
  ? `/${Subdirectory}`
  : TDirectory extends 'posts'
    ? '/'
    : TDirectory

type Path<
  TDirectory extends string,
  TName extends string,
  TIndex extends string,
> = Directory<TDirectory> extends ''
  ? ''
  : Directory<TDirectory> extends '/'
    ? `/${TName}`
    : Directory<TDirectory> extends string
      ? string
      : TName extends 'index'
        ? `${Directory<TDirectory>}${TIndex}`
        : `${Directory<TDirectory>}/${TName}`

const getDirectory = <
  TDirectory extends string,
  TName extends string,
>(file: File<TDirectory, TName>): Directory<TDirectory> => file.relativeDirectory.replace(/^posts(?:\/|$)/u, '/') as Directory<TDirectory>

export const getPath = <
  TDirectory extends string,
  TName extends string,
  TIndex extends string,
>(file: File<TDirectory, TName>, index: TIndex = '/' as TIndex): Path<TDirectory, TName, TIndex> => {
  const directory = getDirectory(file)
  if (!directory) {
    return '' as Path<TDirectory, TName, TIndex>
  }

  return path.join(directory, file.name === 'index' ? index : file.name) as Path<TDirectory, TName, TIndex>
}
