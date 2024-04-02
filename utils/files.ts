import fs from 'fs'
import path from 'path'

const pipe =
  <T>(...fns: Function[]) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value)

const flattenArray = (arr: string[]): string[] => arr.flat()

const map =
  <T, R>(fn: (input: T) => R) =>
  (input: T[]): R[] =>
    input.map(fn)

const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath)

const getAllFilesRecursively = (folder: string): string[] =>
  pipe(
    fs.readdirSync,
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray,
  )(folder)

export default getAllFilesRecursively
