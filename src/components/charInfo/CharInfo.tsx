import { Component } from 'react'

import { ErrorMessage } from '@/components/errorMessage/errorMessage'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import Skeleton from '@/components/skeleton/Skeleton'
import { MarvelService } from '@/services/MarvelService'
import { haveImg } from '@/utils/haveImg'

import './charInfo.scss'

class CharInfo extends Component<Props, StateType> {
  marvelService = new MarvelService()
  onChatLoaded = (char: RandomCharStateType) => this.setState({ char, loading: false })
  setError = () => this.setState({ error: true, loading: false })
  setLoading = (loading: boolean) => this.setState({ loading })
  state: StateType = {
    char: {
      comics: undefined,
      descr: null,
      homepage: null,
      id: null,
      name: null,
      thumbnail: null,
      wiki: null,
    },
    error: false,
    loading: false,
  }
  updateChar = () => {
    const { selectedCharId } = this.props

    if (!selectedCharId) {
      return
    }
    this.setLoading(true)
    this.marvelService.getCharacterById(selectedCharId).then(this.onChatLoaded).catch(this.setError)
  }

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.selectedCharId !== prevProps.selectedCharId) {
      this.updateChar()
    }
  }

  render() {
    const { char, error, loading } = this.state

    return (
      <div className={'char__info'}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading ? <Skeleton /> : error ? <ErrorMessage /> : <View char={char} />}
      </div>
    )
  }
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
      {comicsItems ?? (
        <>
          <div className={'char__comics'}>Comics:</div>
          <ul className={'char__comics-list'}>{comicsItems}</ul>
        </>
      )}
    </>
  )
}

type Props = { selectedCharId: null | number }

type StateType = { char: RandomCharStateType; error: boolean; loading: boolean }

export default CharInfo
