import {Head, Html, Main, NextScript} from 'next/document'

const links = [
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
    <Html className="h-full scroll-smooth antialiased" lang="en">
      <Head>
        {links.map(link => (
          <link
            key={link.href.toLowerCase()}
            href={link.href}
            rel={link.rel}
            sizes={link.sizes}
            type={link.type}
          />
        ))}
      </Head>
      <body className="flex h-full min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
