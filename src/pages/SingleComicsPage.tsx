import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Loader } from '@/components/loader/loader'
import { Page404 } from '@/pages/404'
import { ComicsType } from '@/services/MarvelServiceType'
import { useMarvelService } from '@/services/UseMarvelService'

import './singleComic.scss'

export const SingleComicPage = () => {
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
  const { description, language, pageCount, prices, thumbnail, title } = comics

  return (
    <div className={'single-comic'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <img alt={'x-men'} className={'single-comic__img'} src={thumbnail} />
          <div className={'single-comic__info'}>
            <h2 className={'single-comic__name'}>{title}</h2>
            <p className={'single-comic__descr'}>
              {description ? description : "We don't have description"}
            </p>
            {pageCount > 1 && <p className={'single-comic__descr'}>{pageCount} pages</p>}
            <p className={'single-comic__descr'}>Language: {language}</p>
            <div className={'single-comic__price'}>{prices}$</div>
          </div>
        </>
      )}
      <Link className={'single-comic__back'} to={'/comics'}>
        Back to all
      </Link>
    </div>
  )
}
