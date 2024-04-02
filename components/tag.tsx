import clsx from 'clsx'
import Link from 'next/link'

const tagClasses: Record<string, string> = {
  docker: 'bg-[#2497ed] text-white',
  go: 'bg-[#00add8] text-white',
  javascript: 'bg-[#f7df1e] text-black',
  node: 'bg-[#44883e] text-white',
  react: 'bg-[#222] text-[#00d8ff]',
  typescript: 'bg-[#3178c6] text-white',
}

function Tag({count, tag}: {count?: number; tag: string}) {
  return (
    <Link href={`/tags/${tag}`} key={tag} className="m-2">
      <span
        className={clsx(
          tagClasses[tag],
          'text-md inline-flex items-center rounded px-2.5 py-1 font-medium sm:px-2 sm:py-0.5 sm:text-sm',
        )}
      >
        #{tag}
        {count ? ` ${count}` : ''}
      </span>
    </Link>
  )
}

export default Tag
