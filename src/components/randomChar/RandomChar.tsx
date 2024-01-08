import { Component } from 'react'

import { ErrorMessage } from '@/components/errorMessage/errorMessage'
import { Loader } from '@/components/loader/loader'
import { MarvelService } from '@/services/MarvelService'

import './randomChar.scss'

import mjolnir from '../../resources/img/mjolnir.png'

class RandomChar extends Component<{}, StateType> {
  marvelService = new MarvelService()
  onChatLoaded = (char: RandomCharStateType) => this.setState({ char, loading: false })
  setError = () => this.setState({ error: true, loading: false })
  setLoading = () => this.setState({ loading: true })
  state: StateType = {
    char: {
      descr: null,
      homepage: null,
      id: 1,
      name: null,
      thumbnail: null,
      wiki: null,
    },
    error: false,
    loading: true,
  }

  updateChar = () => {
    this.setLoading()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    this.marvelService.getCharacterById(id).then(this.onChatLoaded).catch(this.setError)
  }

  componentDidMount() {
    this.updateChar()
  }

  render() {
    const { char, error, loading } = this.state

    return (
      <div className={'randomchar'}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading ? (
          <div className={'loader'}>
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage />
        ) : (
          <View char={char} />
        )}
        <div className={'randomchar__static'}>
          <p className={'randomchar__title'}>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className={'randomchar__title'}>Or choose another one</p>
          <button className={'button button__main'} onClick={() => this.updateChar()}>
            <div className={'inner'}>try it</div>
          </button>
          <img alt={'mjolnir'} className={'randomchar__decoration'} src={mjolnir} />
        </div>
      </div>
    )
  }
}

const View = ({ char }: { char: RandomCharStateType }) => {
  const { descr, homepage, name, thumbnail, wiki } = char
  const haveImg =
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

  return (
    <div className={'randomchar__block'}>
      <img
        alt={'Random character'}
        className={`randomchar__img ${haveImg ? 'contain' : ''}`}
        src={thumbnail ?? ''}
      />
      <div className={'randomchar__info'}>
        <p className={'randomchar__name'}>{name}</p>
        <p className={'randomchar__descr'}>
          {descr && descr.length > 160
            ? descr?.slice(0, 160) + '...'
            : descr || "Sorry, we don't have any information"}
        </p>
        <div className={'randomchar__btns'}>
          <a className={'button button__main'} href={homepage ?? ''}>
            <div className={'inner'}>homepage</div>
          </a>
          <a className={'button button__secondary'} href={wiki ?? ''}>
            <div className={'inner'}>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

type StateType = { char: RandomCharStateType; error: boolean; loading: boolean }

export default RandomChar
export type RandomCharStateType = {
  descr: null | string
  homepage: null | string
  id: number
  name: null | string
  thumbnail: null | string
  wiki: null | string
}
