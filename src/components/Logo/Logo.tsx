import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Kentville Marlins Swim Team logo."
      width={92.25}
      height={99}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[92.25px] w-full h-[99px]', className)}
      src="/kentville_marlins_logo.avif"
    />
  )
}
