import decoration from '../../resources/img/Vision.png'
import AppHeader from '../appHeader/AppHeader'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import RandomChar from '../randomChar/RandomChar'

export const App = () => {
  return (
    <div className={'app'}>
      <AppHeader />
      <main>
        <RandomChar />
        <div className={'char__content'}>
          <CharList />
          <CharInfo />
        </div>
        <img alt={'vision'} className={'bg-decoration'} src={decoration} />
      </main>
    </div>
  )
}
