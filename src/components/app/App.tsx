import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Loader } from '@/components/loader/loader'
import { SuspenseWithBoundary } from '@/hoc/SuspenseWithBoundary'

import AppHeader from '../appHeader/AppHeader'

export const App = () => {
  const Page404 = lazy(() => import('@/pages/404'))
  const MainPage = lazy(() => import('@/pages/MainPage'))
  const SingleComicPageContainer = lazy(
    () => import('@/pages/comicOrCharPage/singleComicPageContainer')
  )
  const SingleCharPageContainer = lazy(
    () => import('@/pages/comicOrCharPage/singleCharPageContainer')
  )
  const ComicsPage = lazy(() => import('@/pages/ComicsPage'))

  return (
    <BrowserRouter>
      <div className={'app'}>
        <AppHeader />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                element={
                  <SuspenseWithBoundary>
                    <ComicsPage />
                  </SuspenseWithBoundary>
                }
                path={'/comics'}
              />
              <Route
                element={
                  <SuspenseWithBoundary>
                    <SingleComicPageContainer />
                  </SuspenseWithBoundary>
                }
                path={'/comics/:id'}
              />
              <Route
                element={
                  <SuspenseWithBoundary>
                    <SingleCharPageContainer />
                  </SuspenseWithBoundary>
                }
                path={'/character/:id'}
              />
              <Route
                element={
                  <SuspenseWithBoundary>
                    <MainPage />
                  </SuspenseWithBoundary>
                }
                path={'/'}
              />
              <Route
                element={
                  <SuspenseWithBoundary>
                    <Page404 />
                  </SuspenseWithBoundary>
                }
                path={'*'}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}
