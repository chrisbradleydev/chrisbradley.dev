import clsx from 'clsx'
import Link from 'next/link'

const tagClasses: Record<string, string> = {
  docker: 'bg-[#2497ed] text-white',
  go: 'bg-[#00add8] text-white',
  javascript: 'bg-[#f7df1e] text-black',
  node: 'bg-[#44883e] text-white',
  react: 'bg-[#222] text-[#00d8ff]',
  typescript: 'bg-[#3178c6] text-white',
  philosophy: 'bg-[#ffdfb6] text-black',
  politics: 'bg-[#ff7f50] text-white',
  programming: 'bg-[#ff3344] text-black',
  business: 'bg-[#fffff0] text-black',
  religion: 'bg-[#6a5acd] text-white',
  science: 'bg-[#f9a8d4] text-black',
}

function Tag({count, tag}: {count?: number; tag: string}) {
  return (
    <Link href={`/tags/${tag}`} key={tag} className="m-2">
      <span
        className={clsx(
          tagClasses[tag],
          'text-md sm:text-md inline-flex items-center rounded px-2.5 py-1 font-medium sm:px-2 sm:py-0.5',
        )}
      >
        #{tag}
        {count ? ` ${count}` : ''}
      </span>
    </Link>
  )
}

export default Tag
