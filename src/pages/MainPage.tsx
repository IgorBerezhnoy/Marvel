import { useMemo, useState } from 'react'

import CharInfo from '@/components/charInfo/CharInfo'
import CharList from '@/components/charList/CharList'
import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'
import RandomChar from '@/components/randomChar/RandomChar'
import decoration from '@/resources/img/Vision.png'

export const MainPage = () => {
  const initialState = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
  const [charSelected, setCharSelected] = useState<null | number>(initialState)

  return (
    <>
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
    </>
  )
}
