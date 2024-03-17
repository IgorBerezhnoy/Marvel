import AppBanner from '@/components/appBanner/AppBanner'
import ComicsList from '@/components/comicsList/ComicsList'
import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'

export const ComicsPage = () => {
  return (
    <>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}
