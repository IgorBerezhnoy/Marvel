import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'
import { Loader } from '@/components/loader/loader'

type Props = {
  children: React.ReactNode
}

export function SuspenseWithBoundary({ children }: Props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
