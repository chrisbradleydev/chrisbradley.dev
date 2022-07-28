import {Head, Html, Main, NextScript} from 'next/document'

const links = [
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/Fredoka-Regular.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/Fredoka-Medium.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
  {
    href: '/favicons/favicon-180x180.png',
    rel: 'apple-touch-icon',
    sizes: '180x180',
    type: 'image/png',
  },
  {rel: 'manifest', href: '/app.webmanifest'},
]

function Document() {
  return (
    <Html lang="en">
      <Head>
        {links.map(link => (
          <link
            key={link.href.toLowerCase()}
            as={link.as}
            crossOrigin={link.crossOrigin}
            href={link.href}
            rel={link.rel}
            sizes={link.sizes}
            type={link.type}
          />
        ))}
      </Head>
      <body className="max-w-8xl mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
