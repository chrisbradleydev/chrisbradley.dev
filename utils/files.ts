import fs from 'fs'
import path from 'path'

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
const pipe =
  <T, R>(...fns: ((arg: any) => any)[]) =>
  (value: T): R =>
    fns.reduce((acc, fn) => fn(acc), value) as unknown as R
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

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
  pipe<string, string[]>(
    fs.readdirSync,
    map(pipe<string, string | string[]>(pathJoinPrefix(folder), walkDir)),
    flattenArray,
  )(folder)

export default getAllFilesRecursively
