import { useEffect, useState } from 'react'

import { Loader } from '@/components/loader/loader'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { useMarvelService } from '@/services/UseMarvelService'
import { haveImg } from '@/utils/haveImg'

import './charList.scss'

const CharList = ({ onCharSelected }: Props) => {
  const [charsEnd, setCharsEnd] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(210)
  const [activeItem, setActiveItem] = useState<null | number>(null)
  const [chars, setChars] = useState<RandomCharStateType[]>([])

  const { getAllCharacters, process } = useMarvelService()
  const loadMore = () => {
    onRequest(offset)
  }

  const onRequest = (offset: number | undefined) => {
    getAllCharacters(offset).then(res => {
      setChars(chars => [...chars, ...res])
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

  const charItems = chars.map((el, index) => (
    <CharItem key={index} {...el} activeItem={activeItem} onSetActiveItem={onSetActiveItem} />
  ))

  const isLoading = process === 'loading' || process === 'waiting'

  return (
    <div className={'char__list'}>
      <ul className={'char__grid'}>{charItems}</ul>
      {isLoading && (
        <div className={'loader'}>
          <Loader />
        </div>
      )}
      {charsEnd ? (
        <div className={'chars-end'}>Sorry, the heroes are over</div>
      ) : (
        <button
          className={'button button__main button__long'}
          disabled={isLoading}
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
const CharItem = ({
  activeItem,
  id,
  name,
  onSetActiveItem,
  thumbnail,
}: RandomCharStateType & ActiveItemType) => {
  return (
    <li
      className={`char__item  ${activeItem === id ? 'char__item_selected' : ''}`}
      key={id}
      onClick={() => onSetActiveItem(id)}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          onSetActiveItem(id)
        }
      }}
      tabIndex={0}
    >
      <img alt={'abyss'} src={thumbnail ?? ''} style={haveImg(thumbnail!)} />
      <div className={'char__name'}>{name}</div>
    </li>
  )
}

type ActiveItemType = { activeItem: null | number; onSetActiveItem: (id: null | number) => void }
