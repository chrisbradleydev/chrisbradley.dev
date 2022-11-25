import clsx from 'clsx'
import Link from 'next/link'

const tagClasses: {[key: string]: string} = {
  docker: 'bg-[#2497ed] text-white',
  go: 'bg-[#00add8] text-white',
  javascript: 'bg-[#f7df1e] text-black',
  node: 'bg-[#44883e] text-white',
  react: 'bg-[#222] text-[#00d8ff]',
  typescript: 'bg-[#3178c6] text-white',
}

function Tag({tag, count}: {tag: string; count?: number}) {
  return (
    <Link href={`/tags/${tag}`} key={tag}>
      <a className="text-g inline-block p-2">
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
