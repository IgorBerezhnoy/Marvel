import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/components/errorMessage/errorMessage'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import Skeleton from '@/components/skeleton/Skeleton'
import { MarvelService } from '@/services/MarvelService'
import { haveImg } from '@/utils/haveImg'

import './charInfo.scss'

const CharInfo = ({ selectedCharId }: Props) => {
  const marvelService = new MarvelService()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [char, setChar] = useState<RandomCharStateType | null>(null)
  const onChatLoaded = (char: RandomCharStateType) => {
    setLoading(false)
    setChar(char)
  }
  const onSetError = () => {
    setLoading(false)
    setError(true)
  }
  const updateChar = () => {
    if (!selectedCharId) {
      return
    }
    setLoading(true)
    marvelService.getCharacterById(selectedCharId).then(onChatLoaded).catch(onSetError)
  }

  useEffect(() => updateChar(), [selectedCharId])

  return (
    <div className={'char__info'}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? <Skeleton /> : error ? <ErrorMessage /> : <View char={char!} />}
    </div>
  )
}

const View = ({ char }: { char: RandomCharStateType }) => {
  const { comics, descr, homepage, name, thumbnail, wiki } = char

  const comicsItems = comics?.items.slice(10).map((el, i) => (
    <li className={'char__comics-item'} key={i}>
      {el.name}
    </li>
  ))

  return (
    <>
      <div className={'char__basics'}>
        <img alt={`abyss`} src={thumbnail ?? ''} style={haveImg(thumbnail!)} />
        <div>
          <div className={'char__info-name'}>{name}</div>
          <div className={'char__btns'}>
            <a className={'button button__main'} href={homepage ?? ''}>
              <div className={'inner'}>homepage</div>
            </a>
            <a className={'button button__secondary'} href={wiki ?? ''}>
              <div className={'inner'}>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className={'char__descr'}>{descr || "Sorry, we don't have any information"}</div>
      {comicsItems?.length ? (
        <>
          <div className={'char__comics'}>Comics:</div>
          <ul className={'char__comics-list'}>{comicsItems}</ul>
        </>
      ) : (
        ''
      )}
    </>
  )
}

type Props = { selectedCharId: null | number }

export default CharInfo
