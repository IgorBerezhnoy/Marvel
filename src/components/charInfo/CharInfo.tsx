import { useEffect, useState } from 'react'

import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { useMarvelService } from '@/services/UseMarvelService'
import { haveImg } from '@/utils/haveImg'
import { setContent } from '@/utils/setContent'

import './charInfo.scss'

const CharInfo = ({ selectedCharId }: Props) => {
  const { getCharacterById, process } = useMarvelService()

  const [char, setChar] = useState<RandomCharStateType | null>(null)

  const updateChar = () => {
    if (!selectedCharId) {
      return
    }

    getCharacterById(selectedCharId).then(setChar)
  }

  useEffect(() => updateChar(), [selectedCharId])

  const view = setContent(process, <>{char && <View char={char} />}</>)

  return <div className={'char__info'}>{view}</div>
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
