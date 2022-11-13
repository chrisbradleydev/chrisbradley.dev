import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import {getFiles} from './mdx'

export type TagsCount = {
  [key: string]: number
}

const root = process.cwd()

export async function getAllTags(type: string) {
  const files = await getFiles(type)

  let tagsCount: TagsCount = {}

  files.forEach((file: string) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, file),
      'utf8',
    )
    const {data} = matter(source)
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag: string) => {
        if (tag in tagsCount) {
          tagsCount[tag] += 1
        } else {
          tagsCount[tag] = 1
        }
      })
    }
  })

  return tagsCount
}
