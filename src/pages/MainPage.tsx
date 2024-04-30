import { useMemo, useState } from 'react'

import CharInfo from '@/components/charInfo/CharInfo'
import CharList from '@/components/charList/CharList'
import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'
import RandomChar from '@/components/randomChar/RandomChar'
import { SearchChar } from '@/components/searchChar/searchChar'
import decoration from '@/resources/img/Vision.png'

const MainPage = () => {
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
          <div>
            <CharInfo selectedCharId={useMemo(() => charSelected, [charSelected])} />
            <SearchChar />
          </div>
        </ErrorBoundary>
      </div>
      <img alt={'vision'} className={'bg-decoration'} src={decoration} />
    </>
  )
}

export default MainPage
