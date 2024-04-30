import { Helmet } from 'react-helmet'

import AppBanner from '@/components/appBanner/AppBanner'
import ComicsList from '@/components/comicsList/ComicsList'
import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta content={'Page with list of available comics'} name={'description'} />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage
