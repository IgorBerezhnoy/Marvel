import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { ErrorMessage } from '@/components/errorMessage/errorMessage'
import { Loader } from '@/components/loader/loader'
import { CharacterType } from '@/services/MarvelServiceType'
import { useMarvelService } from '@/services/UseMarvelService'
import { Field, Form, Formik, ErrorMessage as FormikErrorMessage } from 'formik'
import * as Yup from 'yup'

import './searchChar.scss'

export const SearchChar = () => {
  const { clearError, error, getCharacterByName, loading } = useMarvelService()
  const [isFounded, setIsFounded] = useState<boolean | null>(null)
  const [char, setChar] = useState<CharacterType | null>(null)
  const onSubmit = async (values: SearchForm) => {
    setIsFounded(null)
    if (error) {
      clearError()
    }
    const res = await getCharacterByName(values.search)

    if (!res) {
      setIsFounded(false)
    }
    setChar(res)
  }

  const initialValues = { search: '' } as SearchForm
  const validationSchema = Yup.object({
    search: Yup.string().required('This field is required'),
  })

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <View char={char} error={error} isFounded={isFounded} loading={loading} />
    </Formik>
  )
}

const View = ({ char, error, isFounded, loading }: Props) => {
  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : (
        <Form className={'search__wrapper'}>
          <label className={'search__label'} htmlFor={'search'}>
            Or find a character by name:
          </label>
          <div className={'search__input-wrapper'}>
            <Field
              className={'search__input'}
              id={'search'}
              name={'search'}
              placeholder={'Enter name'}
            />
            <button className={'button button__main'}>
              <div className={'inner'}>Find</div>
            </button>
          </div>
          <div className={'search__error-wrapper'}>
            {!char && (
              <FormikErrorMessage className={'search__error'} component={'div'} name={'search'} />
            )}
            {isFounded === false && (
              <div className={'search__error'}>
                The character was not found. Check the name and try again
              </div>
            )}
            {char && (
              <>
                <div className={'search__error'}>{`There is! Visit ${char?.name} page?`}</div>
                <Link
                  className={'button button__secondary button-page'}
                  to={'/character/' + char.id}
                >
                  <div className={'inner'}>TO PAGE</div>
                </Link>
              </>
            )}
          </div>
          {loading && <Loader className={'search__loader'} />}
        </Form>
      )}
    </>
  )
}

type SearchForm = FormEvent<HTMLFormElement> & { search: string }
type Props = {
  char: CharacterType | null
  error: null | string
  isFounded: boolean | null
  loading: boolean
}
