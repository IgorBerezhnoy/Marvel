import s from './loader.module.scss'

export const Loader = ({ className }: { className?: string }) => {
  return <span className={`${s.loader} ${className}`}></span>
}
