import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ComicsPage, MainPage } from '@/pages'

import AppHeader from '../appHeader/AppHeader'

export const App = () => {
  return (
    <BrowserRouter>
      <div className={'app'}>
        <AppHeader />
        <main>
          <Routes>
            <Route element={<ComicsPage />} path={'/comics'} />
            <Route element={<MainPage />} path={'/'} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
