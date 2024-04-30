import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import AppBanner from '@/components/appBanner/AppBanner'
import { Loader } from '@/components/loader/loader'
import { haveImg } from '@/utils/haveImg'

export const ComicOrCharPage = ({
  description,
  language,
  loading,
  name,
  pageCount,
  prices,
  thumbnail,
  title,
}: Props) => {
  return (
    <>
      <AppBanner />
      <div className={'single-comic'}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Helmet>
              <meta content={`Page about ${title ?? name}`} name={'description'} />
              <title>{title ?? name}</title>
            </Helmet>
            <img
              alt={title ?? name}
              className={'single-comic__img'}
              src={thumbnail}
              style={haveImg(thumbnail!)}
            />
            <div className={'single-comic__info'}>
              <h2 className={'single-comic__name'}>{title ?? name}</h2>
              <p className={'single-comic__descr'}>
                {description ? description : "We don't have description"}
              </p>
              {(pageCount || 0) > 1 && <p className={'single-comic__descr'}>{pageCount} pages</p>}
              {language && <p className={'single-comic__descr'}>Language: {language}</p>}
              {prices && <div className={'single-comic__price'}>{prices}$</div>}
            </div>
          </>
        )}
        <Link className={'single-comic__back'} to={'/comics'}>
          Back to all
        </Link>
      </div>
    </>
  )
}
type Props = {
  description: string
  language?: string
  loading: boolean
  name?: string
  pageCount?: number
  prices?: number
  thumbnail?: string
  title?: string
}
