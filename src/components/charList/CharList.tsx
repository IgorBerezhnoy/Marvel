import { useEffect, useState } from 'react'

import { Loader } from '@/components/loader/loader'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { MarvelService } from '@/services/MarvelService'
import { haveImg } from '@/utils/haveImg'

import './charList.scss'

const CharList = ({ onCharSelected }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [charsEnd, setCharsEnd] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(210)
  const [activeItem, setActiveItem] = useState<null | number>(null)
  const [chars, setChars] = useState<RandomCharStateType[]>([])

  const marvelService = new MarvelService()
  const loadMore = () => {
    onRequest(offset)
  }

  const onRequest = (offset: number | undefined) => {
    setLoading(true)
    marvelService.getAllCharacters(offset).then(res => {
      setChars(chars => [...chars, ...res])
      setLoading(false)
      setOffset(offset => offset + 9)
      if (res.length <= 8) {
        setCharsEnd(true)
      }
    })
  }

  useEffect(() => {
    onRequest(offset)
  }, [])
  const onSetActiveItem = (id: null | number) => {
    setActiveItem(id)
    onCharSelected(id)
  }

  const charItems = chars.map(el => (
    <li
      className={`char__item  ${activeItem === el.id ? 'char__item_selected' : ''}`}
      key={el.id}
      onClick={() => onSetActiveItem(el.id)}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          onSetActiveItem(el.id)
        }
      }}
      tabIndex={0}
    >
      <img alt={'abyss'} src={el.thumbnail ?? ''} style={haveImg(el.thumbnail!)} />
      <div className={'char__name'}>{el.name}</div>
    </li>
  ))

  return (
    <div className={'char__list'}>
      <ul className={'char__grid'}>{charItems}</ul>
      {loading && (
        <div className={'loader'}>
          <Loader />
        </div>
      )}
      {charsEnd ? (
        <div className={'chars-end'}>Sorry, the heroes are over</div>
      ) : (
        <button
          className={'button button__main button__long'}
          disabled={loading}
          onClick={() => loadMore()}
        >
          <div className={'inner'}>load more</div>
        </button>
      )}
    </div>
  )
}

export default CharList

type Props = { onCharSelected: (id: null | number) => void }
