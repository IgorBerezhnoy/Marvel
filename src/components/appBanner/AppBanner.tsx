import './appBanner.scss'

import avengers from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers_logo.png'

const AppBanner = () => {
  return (
    <div className={'app__banner'}>
      <img alt={'Avengers'} src={avengers} />
      <div className={'app__banner-text'}>
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img alt={'Avengers logo'} src={avengersLogo} />
    </div>
  )
}

export default AppBanner
