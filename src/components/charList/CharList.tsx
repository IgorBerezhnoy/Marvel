import { CSSProperties, Component } from 'react'

import { Loader } from '@/components/loader/loader'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { MarvelService } from '@/services/MarvelService'

import './charList.scss'

class CharList extends Component<any, StateType> {
  loadMore = () => {
    this.setLoading(true)

    this.marvelService.getAllCharacters().then(res => {
      this.setState({ chars: [...this.state.chars, ...res] })
      this.setLoading(false)
    })
  }
  marvelService = new MarvelService()

  setChars = () => {
    this.setLoading(true)

    this.marvelService.getAllCharacters().then(res => {
      this.setState({ chars: res })
      this.setLoading(false)
    })
  }
  setLoading = (loading: boolean) => this.setState({ loading })
  state: StateType = {
    chars: [],
    error: false,
    loading: true,
  }

  componentDidMount() {
    this.setChars()
  }

  render() {
    const { chars, loading } = this.state
    const haveImg = (thumbnail: string) =>
      thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ? ({ objectFit: 'fill' } as CSSProperties)
        : undefined

    const charItems = chars.map(el => (
      <li className={'char__item char__item_selected'} key={el.id}>
        <img alt={'abyss'} src={el.thumbnail ?? ''} style={haveImg(el.thumbnail!)} />
        <div className={'char__name'}>{el.name}</div>
      </li>
    ))

    if (loading) {
      return (
        <div className={'loader'}>
          <Loader />
        </div>
      )
    }

    return (
      <div className={'char__list'}>
        <ul className={'char__grid'}>{charItems}</ul>
        <button className={'button button__main button__long'} onClick={() => this.loadMore()}>
          <div className={'inner'}>load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
type StateType = {
  chars: RandomCharStateType[]
  error: boolean
  loading: boolean
}
