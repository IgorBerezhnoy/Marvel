import s from './errorMessage.module.scss'

import img from './error.gif'

export const ErrorMessage = () => {
  return <img alt={'error message'} className={s.errorMessage} src={img} />
}
