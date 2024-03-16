import { useEffect, useState } from 'react'

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
      if (res.length <= 8) {
        setComicsEnd(true)
      }
    })
  }

  return (
    <>
      <img alt={'Banner'} src={'/Banner.png'} />
      <div className={'comics__list'}>
        <ul className={'comics__grid'}>
          {comics && comics.map(el => <ComicsItem key={el.id} {...el} />)}
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

const ComicsItem = ({ prices, thumbnail, title }: ComicsType) => {
  return (
    <li className={'comics__item'}>
      <a href={'#'}>
        <img alt={'comics ' + title} className={'comics__item-img'} src={thumbnail} />
        <div className={'comics__item-name'}>{title}</div>
        <div className={'comics__item-price'}>{prices.price + '$'}</div>
      </a>
    </li>
  )
}

export default ComicsList
