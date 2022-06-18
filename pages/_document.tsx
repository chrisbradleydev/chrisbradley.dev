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
