import { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'
import { ComicOrCharPage } from '@/pages/comicOrCharPage/comicOrCharPage'
import { ComicsType } from '@/services/MarvelServiceType'
import { useMarvelService } from '@/services/UseMarvelService'

import './comicOrCharPage.scss'

const SingleComicPageContainer = () => {
  const Page404 = lazy(() => import('@/pages/404'))

  const [comics, setComics] = useState<ComicsType>({} as ComicsType)
  const { error, getComicsById, loading } = useMarvelService()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getComicsById(+id).then(res => {
        setComics(res)
      })
    }
  }, [])
  if (error) {
    return <Page404 />
  }

  return (
    <ErrorBoundary>
      <ComicOrCharPage {...comics} loading={loading} />
    </ErrorBoundary>
  )
}

export default SingleComicPageContainer
