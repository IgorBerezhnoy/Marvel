import { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { ComicOrCharPage } from '@/pages/comicOrCharPage/comicOrCharPage'
import { useMarvelService } from '@/services/UseMarvelService'

import './comicOrCharPage.scss'

const SingleCharPageContainer = () => {
  const Page404 = lazy(() => import('@/pages/404'))

  const [char, setChar] = useState<RandomCharStateType>({} as RandomCharStateType)
  const { error, getCharacterById, loading } = useMarvelService()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getCharacterById(+id).then(res => {
        setChar(res)
      })
    }
  }, [getCharacterById, id])
  if (error) {
    return <Page404 />
  }

  return (
    <ErrorBoundary>
      <ComicOrCharPage
        description={char.descr ?? 'no description'}
        loading={loading}
        name={char.name ?? 'no name'}
        thumbnail={char.thumbnail ?? 'no thumbnail'}
      />
    </ErrorBoundary>
  )
}

export default SingleCharPageContainer
