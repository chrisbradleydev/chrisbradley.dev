import fs from 'fs'
import matter from 'gray-matter'
import {bundleMDX} from 'mdx-bundler'
import path from 'path'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import type * as U from 'unified'
import getAllFilesRecursively from '~/utils/files'

const root = process.cwd()

export function getFiles(type: string): string[] {
  const prefixPaths = path.join(root, 'content', type)
  const files = getAllFilesRecursively(prefixPaths)
  // only want to return blog/path and ignore root, replace is needed to work on windows
  return files.map((file: string) => file.slice(prefixPaths.length + 1))
}

export function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type: string, slug: string) {
  const remarkPlugins: U.PluggableList = [remarkGfm]
  const rehypePlugins: U.PluggableList = []
  const mdxPath = path.join(root, 'content', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'content', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      'node_modules',
      'esbuild',
      'esbuild.exe',
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    )
  }

  try {
    const {code, frontmatter} = await bundleMDX({
      source,
      mdxOptions(options: {
        remarkPlugins?: unknown[]
        rehypePlugins?: unknown[]
      }) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ]
        return options
      },
      esbuildOptions: options => {
        options.loader = {
          ...options.loader,
          '.js': 'jsx',
        }
        return options
      },
    })

    return {
      mdxSource: code,
      frontmatter: {
        slug,
        fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
        readingTime: readingTime(code),
        ...frontmatter,
        date: frontmatter.date
          ? new Date(frontmatter.date as Date).toISOString()
          : '',
      },
    }
  } catch (error: unknown) {
    throw error
  }
}

export interface FrontmatterPost {
  date: string
  draft?: boolean
  slug: string
  summary?: string
  tags: string[]
  title?: string
}

export interface FrontmatterQuote {
  date?: string
  author: string
  slug: string
  quote: string
  comment?: string
  tags: string[]
}

export function getAllPosts() {
  const prefixPaths = path.join(root, 'content/posts')
  const files = getAllFilesRecursively(prefixPaths)
  const posts: FrontmatterPost[] = []

  files.forEach((file: string) => {
    // replace is needed to work on windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // remove unexpected file
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const {data: frontmatter} = matter(source)
    if (frontmatter.draft !== true) {
      posts.push({
        tags: [],
        ...frontmatter,
        slug: formatSlug(fileName),
        date: new Date(frontmatter.date as Date).toISOString(),
      })
    }
  })

  return posts.sort((a, b) => dateSortDesc(a.date, b.date))
}

export function getAllQuotes() {
  const prefixPaths = path.join(root, 'content/quotes')
  const files = getAllFilesRecursively(prefixPaths)
  const quotes: FrontmatterQuote[] = []

  files.forEach((file: string) => {
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const {data: frontmatter} = matter(source)
    if (frontmatter.draft !== true) {
      quotes.push({
        tags: [],
        ...frontmatter,
        author: (frontmatter.author as string) ?? 'Unknown',
        quote: (frontmatter.quote as string) ?? '',
        comment: (frontmatter?.comment as string) ?? '',
        slug: formatSlug(fileName),
      } as FrontmatterQuote)
    }
  })

  return quotes.sort((a, b) => dateSortDesc(b.author, a.author))
}
