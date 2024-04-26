import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Loader } from '@/components/loader/loader'

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
              <Route element={<ComicsPage />} path={'/comics'} />
              <Route element={<SingleComicPage />} path={'/comics/:id'} />
              <Route element={<MainPage />} path={'/'} />
              <Route element={<Page404 />} path={'*'} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}
