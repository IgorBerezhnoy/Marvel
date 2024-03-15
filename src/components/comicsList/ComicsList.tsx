import { useEffect, useState } from 'react'

import { Loader } from '@/components/loader/loader'
import { ComicsType } from '@/services/MarvelServiceType'
import { useMarvelService } from '@/services/UseMarvelService'

import './comicsList.scss'

const ComicsList = () => {
  const [comics, setComics] = useState<ComicsType[]>([])
  const { getAllComics, loading } = useMarvelService()

  useEffect(() => {
    getAllComics().then(res => {
      console.log(res)
      setComics(res)
    })
  }, [])

  return (
    <>
      <img alt={'Banner'} src={'/Banner.png'} />
      <div className={'comics__list'}>
        <ul className={'comics__grid'}>
          {comics &&
            comics.map(el => (
              <li className={'comics__item'}>
                <a href={'#'}>
                  <img
                    alt={'comics ' + el.title}
                    className={'comics__item-img'}
                    src={el.thumbnail}
                  />
                  <div className={'comics__item-name'}>{el.title}</div>
                  <div className={'comics__item-price'}>{el.prices.price + '$'}</div>
                </a>
              </li>
            ))}
        </ul>
        {loading && (
          <div className={'comics__loading'}>
            <Loader />
          </div>
        )}
        <button className={'button button__main button__long'}>
          <div className={'inner'}>load more</div>
        </button>
      </div>
    </>
  )
}

export default ComicsList
