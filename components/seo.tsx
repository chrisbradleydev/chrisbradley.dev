import Head from 'next/head'
import {
  defaultDescription,
  defaultOgImage,
  siteName,
  siteUrl,
  twitterHandle,
} from '~/content/metadata'

export interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
}

export default function SEO({
  title,
  description = defaultDescription,
  url,
  image = defaultOgImage,
  type = 'website',
  noindex = false,
  article,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${siteName}` : siteName
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title ?? siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Article-specific OG tags */}
      {type === 'article' && article?.publishedTime && (
        <meta
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {type === 'article' && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {type === 'article' && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {type === 'article' &&
        article?.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title ?? siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
