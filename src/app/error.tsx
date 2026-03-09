'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">500</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Something went wrong
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Link href="/" passHref>
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
