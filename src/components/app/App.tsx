import { useMemo, useState } from 'react'

import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'

import decoration from '../../resources/img/Vision.png'
import AppHeader from '../appHeader/AppHeader'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import RandomChar from '../randomChar/RandomChar'

export const App = () => {
  const initialState = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
  const [charSelected, setCharSelected] = useState<null | number>(initialState)

  return (
    <div className={'app'}>
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className={'char__content'}>
          <ErrorBoundary>
            <CharList onCharSelected={setCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo selectedCharId={useMemo(() => charSelected, [charSelected])} />
          </ErrorBoundary>
        </div>
        <img alt={'vision'} className={'bg-decoration'} src={decoration} />
      </main>
    </div>
  )
}
