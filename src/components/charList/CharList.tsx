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
  setActiveItem = (id: null | number) => {
    this.setState({ activeItem: id })
    this.props.onCharSelected(id)
  }
  setLoading = (loading: boolean) => this.setState({ loading })

  state: StateType = {
    activeItem: null,
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
    const { activeItem, chars, charsEnd, loading } = this.state

    const charItems = chars.map(el => (
      <li
        className={`char__item  ${activeItem === el.id ? 'char__item_selected' : ''}`}
        key={el.id}
        onClick={() => this.setActiveItem(el.id)}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') {
            this.setActiveItem(el.id)
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
  activeItem: null | number
  chars: RandomCharStateType[]
  charsEnd: boolean
  error: boolean
  loading: boolean
  offset: number
}
type Props = { onCharSelected: (id: null | number) => void }
