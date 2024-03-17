import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ComicsPage, MainPage, SingleComicPage } from '@/pages'
import { Page404 } from '@/pages/404'

import AppHeader from '../appHeader/AppHeader'

export const App = () => {
  return (
    <BrowserRouter>
      <div className={'app'}>
        <AppHeader />
        <main>
          <Routes>
            <Route element={<ComicsPage />} path={'/comics'} />
            <Route element={<SingleComicPage />} path={'/comics/:id'} />
            <Route element={<MainPage />} path={'/'} />
            <Route element={<Page404 />} path={'*'} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
