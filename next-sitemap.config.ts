import fs from 'fs'
import {bundleMDX} from 'mdx-bundler'
import type {IConfig} from 'next-sitemap'
import {dirname, join as pathJoin} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const indexPageRegex = /^\/$/
const blogPageRegex = /^\/blog$/
const quotesPageRegex = /^\/quotes$/
const tagsPageRegex = /^\/tags$/
const cautroPageRegex = /^\/cautro$/
const cincoPageRegex = /^\/cinco$/
const seisPageRegex = /^\/seis$/
const blogPostRegex = /^\/blog\/(?<slug>[a-z0-9-]+)$/
const quotePageRegex = /^\/quotes\/(?<slug>[a-z0-9-]+)$/
const tagPageRegex = /^\/tags\/(?<slug>[a-z0-9-]+)$/

const lastmodFromSlug = async (
  type: string,
  slug: string | undefined,
): Promise<string | undefined> => {
  if (slug !== undefined && slug !== '') {
    const mdxPath = pathJoin(__dirname, 'content', type, `${slug}.mdx`)
    if (!fs.existsSync(mdxPath)) {
      console.error('Error locating MDX', slug)
      return undefined
    }
    const source = fs.readFileSync(mdxPath, 'utf8')
    const {frontmatter} = await bundleMDX({source})
    const date = frontmatter?.dateModified as string
    return new Date(date).toISOString()
  }
  return undefined
}

const config: IConfig = {
  siteUrl: 'https://chrisbradley.dev',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: 'public',
  transform: async (config, path) => {
    let changefreq = config.changefreq
    let priority = (config.priority as number) ?? 0.7
    let lastmod: string | undefined = config.autoLastmod
      ? new Date().toISOString()
      : undefined

    if (indexPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (blogPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (quotesPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (tagsPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (cautroPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (cincoPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (seisPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    } else if (blogPostRegex.test(path)) {
      changefreq = 'weekly'
      priority = 0.6

      const match = blogPostRegex.exec(path)
      const slug = match?.groups?.slug
      lastmod = await lastmodFromSlug('posts', slug)
    } else if (quotePageRegex.test(path)) {
      changefreq = 'weekly'
      priority = 0.6

      const match = quotePageRegex.exec(path)
      const slug = match?.groups?.slug
      lastmod = await lastmodFromSlug('quotes', slug)
    } else if (tagPageRegex.test(path)) {
      changefreq = 'daily'
      priority = 0.7
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}

export default config
