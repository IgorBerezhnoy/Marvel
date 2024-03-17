import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Loader } from '@/components/loader/loader'
import { ComicsType } from '@/services/MarvelServiceType'
import { useMarvelService } from '@/services/UseMarvelService'

import './comicsList.scss'

const ComicsList = () => {
  const [comics, setComics] = useState<ComicsType[]>([])
  const { getAllComics, loading } = useMarvelService()
  const [offset, setOffset] = useState<number>(16)
  const [comicsEnd, setComicsEnd] = useState<boolean>(false)

  useEffect(() => {
    getAllComics().then(res => {
      setComics(res)
    })
  }, [])

  const loadMore = () => {
    onRequest(offset)
  }

  const onRequest = (offset: number | undefined) => {
    getAllComics(offset).then(res => {
      setComics(comics => [...comics, ...res])
      setOffset(offset => offset + 8)
      if (res.length < 8) {
        setComicsEnd(true)
      }
    })
  }

  return (
    <>
      <div className={'comics__list'}>
        <ul className={'comics__grid'}>
          {comics && comics.map(el => <ComicsItem key={el.id + el.title} {...el} />)}
        </ul>
        {loading && (
          <div className={'comics__loading'}>
            <Loader />
          </div>
        )}
        {comicsEnd ? (
          <div className={'comics-end'}>Sorry, the heroes are over</div>
        ) : (
          <button className={'button button__main button__long'} onClick={loadMore}>
            <div className={'inner'}>load more</div>
          </button>
        )}
      </div>
    </>
  )
}

const ComicsItem = ({ id, prices, thumbnail, title }: ComicsType) => {
  return (
    <li className={'comics__item'}>
      <Link to={'/comics/' + id}>
        <img alt={'comics ' + title} className={'comics__item-img'} src={thumbnail} />
        <div className={'comics__item-name'}>{title}</div>
        <div className={'comics__item-price'}>{prices + '$'}</div>
      </Link>
    </li>
  )
}

export default ComicsList
