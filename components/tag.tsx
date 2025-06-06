import clsx from 'clsx'
import Link from 'next/link'

const tagClasses: Record<string, string> = {
  business: 'bg-business text-[#1a1a1a]',
  docker: 'bg-docker text-[#fafafa]',
  go: 'bg-go text-[#fff]',
  javascript: 'bg-javascript text-[#000]',
  node: 'bg-node text-[#f0f0f0]',
  philosophy: 'bg-philosophy text-[#000]',
  politics: 'bg-politics text-[#fff]',
  programming: 'bg-programming text-[#171717]',
  react: 'bg-react text-[#00d8ff]',
  religion: 'bg-religion text=[#fafafa]',
  science: 'bg-science text-[#1a1a1a]',
  typescript: 'bg-typescript text-[#f5f5f5]',
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
