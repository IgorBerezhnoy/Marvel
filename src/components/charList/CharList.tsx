import { Component } from 'react'

import { Loader } from '@/components/loader/loader'
import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { MarvelService } from '@/services/MarvelService'
import { haveImg } from '@/utils/haveImg'

import './charList.scss'

class CharList extends Component<Props, StateType> {
  loadMore = () => {
    this.onRequest(this.state.offset)
  }
  marvelService = new MarvelService()

  onRequest = (offset: number | undefined) => {
    this.setLoading(true)

    this.marvelService.getAllCharacters(offset).then(res => {
      this.setState({
        chars: [...this.state.chars, ...res],
        loading: false,
        offset: this.state.offset + 9,
      })
      if (res.length <= 8) {
        this.setState({ charsEnd: true })
      }
    })
  }
  setLoading = (loading: boolean) => this.setState({ loading })
  state: StateType = {
    chars: [],
    charsEnd: false,
    error: false,
    loading: true,
    offset: 210,
  }

  componentDidMount() {
    this.onRequest(this.state.offset)
  }

  render() {
    const { onCharSelected } = this.props
    const { chars, charsEnd, loading } = this.state

    const charItems = chars.map(el => (
      <li
        className={'char__item char__item_selected'}
        key={el.id}
        onClick={() => onCharSelected(el.id)}
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
            onClick={() => this.loadMore()}
          >
            <div className={'inner'}>load more</div>
          </button>
        )}
      </div>
    )
  }
}

export default CharList
type StateType = {
  chars: RandomCharStateType[]
  charsEnd: boolean
  error: boolean
  loading: boolean
  offset: number
}
type Props = { onCharSelected: (id: null | number) => void }
