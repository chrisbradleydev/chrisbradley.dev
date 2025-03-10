import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import {getFiles} from './mdx'

export type TagsCount = Record<string, number>

const root = process.cwd()

interface FrontMatter {
  tags?: string[]
  draft?: boolean
}

export function getAllTags(type: string) {
  const files = getFiles(type)
  const tagsCount: TagsCount = {}

  files.forEach((file: string) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, file),
      'utf8',
    )
    const {data} = matter(source) as {data: FrontMatter}
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag: string) => {
        if (tag in tagsCount && tagsCount[tag] !== undefined) {
          tagsCount[tag] += 1
        } else {
          tagsCount[tag] = 1
        }
      })
    }
  })

  return tagsCount
}
