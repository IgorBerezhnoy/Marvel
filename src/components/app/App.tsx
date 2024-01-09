import { Component } from 'react'

import { ErrorBoundary } from '@/components/errorBoundary/errorBoundary'

import decoration from '../../resources/img/Vision.png'
import AppHeader from '../appHeader/AppHeader'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import RandomChar from '../randomChar/RandomChar'

export class App extends Component<any, StateType> {
  onCharSelected = (selectedCharId: null | number) => this.setState({ selectedCharId })

  state: StateType = {
    selectedCharId: Math.floor(Math.random() * (1011400 - 1011000) + 1011000),
  }

  render() {
    const { selectedCharId } = this.state

    return (
      <div className={'app'}>
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className={'char__content'}>
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo selectedCharId={selectedCharId} />
            </ErrorBoundary>
          </div>
          <img alt={'vision'} className={'bg-decoration'} src={decoration} />
        </main>
      </div>
    )
  }
}

type StateType = {
  selectedCharId: null | number
}
