import { CSSProperties } from 'react'

export const haveImg = (thumbnail: string) =>
  thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ? ({ objectFit: 'fill' } as CSSProperties)
    : undefined
