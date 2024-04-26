import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Loader } from '@/components/loader/loader'
import { SuspenseWithBoundary } from '@/hoc/SuspenseWithBoundary'

import AppHeader from '../appHeader/AppHeader'

export const App = () => {
  const Page404 = lazy(() => import('@/pages/404'))
  const MainPage = lazy(() => import('@/pages/MainPage'))
  const SingleComicPage = lazy(() => import('@/pages/SingleComicPage'))
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
                    <SingleComicPage />
                  </SuspenseWithBoundary>
                }
                path={'/comics/:id'}
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
