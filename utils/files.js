import fs from 'fs'
import path from 'path'

const pipe =
  (...fns) =>
  value =>
    fns.reduce((acc, fn) => fn(acc), value)

const flattenArray = arr => arr.flat()

const map = fn => input => input.map(fn)

const walkDir = fullPath => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = prefix => extraPath => path.join(prefix, extraPath)

const getAllFilesRecursively = folder =>
  pipe(
    fs.readdirSync,
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray,
  )(folder)

export default getAllFilesRecursively
