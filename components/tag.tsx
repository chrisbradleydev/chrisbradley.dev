import clsx from 'clsx'
import Link from 'next/link'

const tagClasses: {[key: string]: string} = {
  javascript: 'bg-[#f7df1e] text-black',
}

function Tag({tag, count}: {tag: string; count?: number}) {
  return (
    <Link href={`/tags/${tag}`} key={tag}>
      <a className="inline-block p-2">
        <span
          className={clsx(
            tagClasses[tag],
            'inline-flex items-center rounded px-2 py-0.5 text-sm font-medium',
          )}
        >
          #{tag}
          {count ? ` ${count}` : ''}
        </span>
      </a>
    </Link>
  )
}

export default Tag
