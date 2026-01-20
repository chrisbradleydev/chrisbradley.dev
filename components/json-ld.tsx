import Head from 'next/head'
import {fullName, siteUrl} from '~/content/metadata'

interface ArticleJsonLdProps {
  title: string
  description?: string
  url: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = fullName,
  image,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}${url}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: siteUrl,
    },
    ...(image && {image}),
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </Head>
  )
}

interface WebSiteJsonLdProps {
  name: string
  url: string
  description?: string
}

export function WebSiteJsonLd({name, url, description}: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: fullName,
      url: siteUrl,
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </Head>
  )
}

interface BreadcrumbJsonLdProps {
  items: {name: string; url: string}[]
}

export function BreadcrumbJsonLd({items}: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </Head>
  )
}
