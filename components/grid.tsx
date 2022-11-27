import clsx from 'clsx'
import * as React from 'react'

interface GridProps {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  nested?: boolean
  rowGap?: boolean
}

const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  {as: Tag = 'div', children, className, nested, rowGap},
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={clsx('relative', {
        'mx-10vw': !nested,
        'w-full': nested,
      })}
    >
      <div
        className={clsx(
          'relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6',
          {
            'mx-auto max-w-7xl': !nested,
            'gap-y-4 lg:gap-y-6': rowGap,
          },
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  )
})

export default Grid
