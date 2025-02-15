import type {GetStaticProps} from 'next'
import Link from 'next/link'
import * as React from 'react'
import Grid from '~/components/grid'
import Layout from '~/components/layout'
import Tag from '~/components/tag'
import {FrontmatterQuote, getAllQuotes} from '~/utils/mdx'

function QuoteCard({quote}: {quote: FrontmatterQuote}) {
  return (
    <article
      className="col-span-4
      mb-10
      flex
      flex-col
      overflow-hidden
      rounded-b-lg
      shadow-md
      transition-transform
      duration-500
      ease-in-out
      hover:scale-105"
    >
      <Link
        href={`/quotes/${quote.slug}`}
        className="flex
        flex-1
        flex-col
        justify-between
        bg-gradient-to-b
        from-neutral-200
        dark:from-neutral-800
        dark:to-neutral-900"
      >
        <div className="h-28">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path
              className="fill-white dark:fill-neutral-900"
              d="M0,100
              C150,200
              350,0
              500,100
              L500,00
              L0,00
              Z"
            />
          </svg>
        </div>
        <div className="grow">
          <div className="mt-2 block px-6 py-8">
            <p className="text-xl font-semibold">{quote.author ?? 'Unknown'}</p>
            <p className="text-xl font-semibold">
              &quot;{quote.quote ?? ''}&quot;
            </p>
          </div>
        </div>
      </Link>
      <div className="px-2 pb-4 pt-2">
        {quote.tags?.map(tag => <Tag key={tag} tag={tag} />)}
      </div>
    </article>
  )
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

function Quotes({quotes}: {quotes: FrontmatterQuote[]}) {
  const [activeInitial, setActiveInitial] = React.useState<string | null>(null)

  React.useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && alphabet.includes(hash)) {
      setActiveInitial(hash)
    }
  }, [])

  React.useEffect(() => {
    if (activeInitial) {
      window.location.hash = activeInitial
    } else {
      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search,
      )
    }
  }, [activeInitial])

  const handleLetterClick = (letter: string) => {
    console.log(activeInitial, letter)
    setActiveInitial(activeInitial === letter ? null : letter)
  }

  return (
    <Layout pageName="Quotes" header={false}>
      <div className="relative px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-pink-300">Quotes</h1>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Words of Wisdom
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-xl text-neutral-500">
              A collection of inspiring and thought-provoking quotes.
            </p>
          </div>
          <div className="mt-12 text-wrap text-center text-xl lg:text-lg">
            {alphabet.split('').map((letter, index) => (
              <span key={letter}>
                <button
                  type="button"
                  className={`hover:text-pink-300 ${
                    activeInitial === letter ? 'text-pink-300' : ''
                  }`}
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter.toUpperCase()}
                </button>
                {index < alphabet.length - 1 && (
                  <span className="mx-4 text-neutral-500 lg:mx-2">|</span>
                )}
              </span>
            ))}
          </div>
          <Grid className="mt-12">
            {quotes.length
              ? quotes.map(
                  quote =>
                    quote.author.startsWith(
                      activeInitial?.toUpperCase() ?? '',
                    ) && <QuoteCard key={quote.slug} quote={quote} />,
                )
              : null}
          </Grid>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const quotes = getAllQuotes()
  return {props: {quotes}}
}

export default Quotes
